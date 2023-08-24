import axios, { type Axios } from "axios"
import { AggregatedAbortController } from "aggregated-abortcontroller"
import type { CeleryPromise, CeleryRequestConfig, CeleryResponse } from "./types"

/**
 * @returns The default origin
 */
const defaultOrigin = () => (typeof window !== 'undefined' && window.location) ? new URL(window.location.origin) : undefined

/**
 * The Core implementation for Celery
 */
export class CeleryCore {
    public origin: URL | undefined = defaultOrigin()
    public headers = new Headers()

    protected $client: Axios = axios.create()

    constructor(
        protected $controller: AbortController = new AbortController()
    ) { }

    /**
     * Build request with provided config
     */
    protected $request<Response = any, Payload = any>(config: CeleryRequestConfig): CeleryPromise<CeleryResponse<Response, Payload>> {
        const aggregatedController = new AggregatedAbortController([this.$controller])

        // Configure essential options
        if (config.signal) { aggregatedController.attach(config.signal) }
        config.signal = aggregatedController.signal
        config.baseURL = config.baseURL || this.origin?.toString()

        // Append headers
        for (const [key, value] of Object.entries(this.headers)) {
            config.headers = config.headers || {}
            config.headers[key] = value
        }

        // TODO: Append credentials

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
