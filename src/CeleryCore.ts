import type { CeleryPromise, CeleryRequestConfig, CeleryResponse } from "./types"
import axios, { type Axios } from "axios"
import { AggregatedAbortController } from "aggregated-abortcontroller"
import { CeleryContext, type CeleryContextOrigin } from "./CeleryContext"
import { withFirstFound } from "./utils"

export interface CeleryCoreOptions {
    origin?: CeleryContextOrigin
    context?: CeleryContext
}

/**
 * The Core implementation for Celery
 */
export class CeleryCore {
    public origin: CeleryContextOrigin
    public headers = new Headers()

    protected $client: Axios = axios.create()
    protected $context: CeleryContext

    constructor(options: CeleryCoreOptions = {}) {
        this.origin = options.origin
        this.$context = options.context || new CeleryContext()
    }

    /**
     * Build request with provided config
     */
    protected $request<Response = any, Payload = any>(config: CeleryRequestConfig): CeleryPromise<CeleryResponse<Response, Payload>> {
        const instance = this
        const context = this.$context

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
        const credential = context.credentialStore.retrieve()
        if (credential) {
            config.headers.Authorization = credential.get()
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
}
