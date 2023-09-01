import axios from "axios"
import { version } from "../package.json"
import { AggregatedAbortController } from "aggregated-abortcontroller"
import { CeleryDefaults } from "./CeleryDefaults"
import { CeleryContext } from "./CeleryContext"
import { CeleryCredentialStore } from "./CeleryCredentialStore"
import { headerToRecords, withFirstFound } from "./utils"
import type { Axios } from "axios"
import type { CeleryContextURL } from "./CeleryContext"
import type { CeleryDefaultConfigs, CeleryPromise, CeleryRequestConfig, CeleryResponse } from "./types"

export interface CeleryCoreOptions {
    url?: CeleryContextURL
    context?: CeleryContext
    credentialStore?: CeleryCredentialStore
    configuration?: CeleryDefaultConfigs
}

/**
 * The Core implementation for Celery
 */
export class CeleryCore {
    public url: CeleryContextURL
    public context: CeleryContext
    public defaults: CeleryDefaults
    public headers = new Headers()
    public credentialStore: CeleryCredentialStore

    public readonly version = version

    protected $client: Axios

    constructor(options: CeleryCoreOptions = {}) {
        // Create client interface
        this.$client = axios.create()

        // Set up the base URL
        this.url = options.url

        // Set up dependencies
        this.context = options.context || new CeleryContext()
        this.credentialStore = options.credentialStore || new CeleryCredentialStore()
        
        // Initialize the default configuration
        this.defaults = new CeleryDefaults(this.$client, options.configuration)
    }

    /**
     * Build request with provided config
     */
    protected $request<Response = any, Payload = any>(config: CeleryRequestConfig): CeleryPromise<CeleryResponse<Response, Payload>> {
        const instance = this
        const context = this.context

        // Re-wrap headers
        const headers = new Headers(config.headers as Record<string, string>)
        const requestHeaders = new Headers([...this.headers, ...headers])

        // Resolve the base URL
        config.baseURL = withFirstFound(
            config.baseURL,
            context.url?.toString(),
            instance.url?.toString(),
        )
        
        // Aggregate the abort signals
        const aggregatedController = new AggregatedAbortController([context.controller])
        if (config.signal) {
            aggregatedController.attach(config.signal) 
        }
        config.signal = aggregatedController.signal

        // Retrieve the credential
        // If the credential is not provided in the config, use the credential store
        if (!requestHeaders.has("Authorization")) {
            const credentialStore = this.getCredentialInterface()

            if (credentialStore) {
                requestHeaders.set("Authorization", credentialStore?.getAuthorizationHeader())
            }
        }

        // Remove the credentials from the request if the withCredentials is set to false
        if (config.withCredentials === false) {
            if (requestHeaders.has("Authorization")) {
                requestHeaders.delete("Authorization")
            }
        }

        // Override the headers
        config.headers = headerToRecords(requestHeaders)

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
