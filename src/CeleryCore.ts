import axios from "axios"
import { version } from "../package.json"
import { AggregatedAbortController } from "aggregated-abortcontroller"
import { CeleryDefault } from "./CeleryDefault"
import { CeleryContext } from "./CeleryContext"
import { CeleryCredentialStore } from "./CeleryCredentialStore"
import { withFirstFound } from "./utils"
import type { Axios } from "axios"
import type { CeleryContextOrigin } from "./CeleryContext"
import type { CeleryDefaultConfig, CeleryPromise, CeleryRequestConfig, CeleryResponse } from "./types"

export interface CeleryCoreOptions {
    origin?: CeleryContextOrigin
    context?: CeleryContext
    credentialStore?: CeleryCredentialStore
    configuration?: CeleryDefaultConfig
}

/**
 * The Core implementation for Celery
 */
export class CeleryCore {
    public default: CeleryDefault
    public context: CeleryContext
    public headers = new Headers()
    public origin: CeleryContextOrigin
    public credentialStore: CeleryCredentialStore

    public readonly version = version

    protected $client: Axios = axios.create()

    constructor(options: CeleryCoreOptions = {}) {
        this.origin = options.origin
        this.context = options.context || new CeleryContext()
        this.credentialStore = options.credentialStore || new CeleryCredentialStore()
        
        // Initialize the default configuration
        this.default = new CeleryDefault(this.$client, options.configuration)
    }

    /**
     * Build request with provided config
     */
    protected $request<Response = any, Payload = any>(config: CeleryRequestConfig): CeleryPromise<CeleryResponse<Response, Payload>> {
        const instance = this
        const context = this.context

        // Resolve the base URL
        config.baseURL = withFirstFound(
            config.baseURL,
            context.origin?.toString(),
            instance.origin?.toString(),
        )
        
        // Aggregate the abort signals
        const aggregatedController = new AggregatedAbortController([context.controller])
        if (config.signal) { aggregatedController.attach(config.signal) }
        config.signal = aggregatedController.signal

        // Prepare the request headers
        config.headers = config.headers || {}

        // Retrieve the credential
        // If the credential is not provided in the config, use the credential store
        if (!("Authorization" in config.headers)) {
            const credentialStore = this.getCredentialInterface()
            config.headers["Authorization"] = credentialStore?.getAuthorizationHeader()

            // Remove the credentials from the request if the withCredentials is set to false
            if (config.withCredentials === false) {
                delete config.headers["Authorization"]
            }
        }


        // Append headers
        for (const [key, value] of Object.entries(this.headers)) {
            config.headers[key] = value
        }

        return new Promise(async (resolve, reject) => {
            try {
                // Send the request
                const response = this.$client.request<Response, CeleryResponse<Response, Payload>, Payload>(config)

                // Resolve the response
                resolve(response)

                // Detach signals when request is finished
                aggregatedController.detachAll()
            } catch (error) {
                // @ts-ignore
                reject(new CeleryError(error.message, error.config, error.code, error.request, error.response))
            }
        })
    }

    /**
     * Get the credential store
     * 
     * If the context has a credential store, use that one  
     * Otherwise, use the credential store of the instance
     * @returns 
     */
    private getCredentialInterface() {
        const credential = withFirstFound(
            this.context.credentialStore?.retrieve(),
            this.credentialStore?.retrieve()
        )
        return credential
    }
}
