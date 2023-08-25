import axios from "axios"
import { AggregatedAbortController } from "aggregated-abortcontroller"
import { CeleryContext } from "./CeleryContext"
import { CeleryCredentialStore } from "./CeleryCredentialStore"
import { withFirstFound } from "./utils"
import type { Axios } from "axios"
import type { CeleryContextOrigin } from "./CeleryContext"
import type { CeleryPromise, CeleryRequestConfig, CeleryResponse } from "./types"

export interface CeleryCoreOptions {
    origin?: CeleryContextOrigin
    context?: CeleryContext
    credentialStore?: CeleryCredentialStore
}

/**
 * The Core implementation for Celery
 */
export class CeleryCore {
    public headers = new Headers()
    public origin: CeleryContextOrigin
    public context: CeleryContext
    public credentialStore: CeleryCredentialStore

    protected $client: Axios = axios.create()

    constructor(options: CeleryCoreOptions = {}) {
        this.origin = options.origin
        this.context = options.context || new CeleryContext()
        this.credentialStore = options.credentialStore || new CeleryCredentialStore()
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
        const credentialStore = this.getCredentialStore()
        config.headers["Authorization"] = credentialStore.retrieve()?.get()

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
    private getCredentialStore() {
        return this.context.credentialStore || this.credentialStore
    }
}
