import axios, { type Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { AggregatedAbortController } from 'aggregated-abortcontroller'

type ExtractType<T = Object> = { [K in keyof T]: T[K] }

/**
 * Extract `AxiosRequestConfig` type
 */
type ExtractedAxiosRequestConfig<Payload = any> = ExtractType<AxiosRequestConfig<Payload>>

/**
 * Extract `AxiosResponse` type
 */
type ExtractedAxiosResponse<Response = any, Payload = any> = ExtractType<AxiosResponse<Response, Payload>>


export interface InternalCeleryRequestConfig<Payload = any> extends Omit<ExtractedAxiosRequestConfig<Payload>, 'signal'> {
    signal?: AbortSignal
}

export interface InternalCeleryRequest<Payload = any, Params = any> extends Omit<InternalCeleryRequestConfig<Payload>, 'method' | 'url' | 'params'> {
    params?: Params
}

export interface InternalCeleryResponse<Response = any, Payload = any> extends Omit<ExtractedAxiosResponse<Response, Payload>, 'config'> {
    config: InternalCeleryRequestConfig<Payload>
}

export interface CeleryRequestConfig<Payload = any> extends InternalCeleryRequestConfig<Payload> {}
export interface CeleryRequest<Payload = any, Params = any> extends InternalCeleryRequest<Payload, Params> {}
export interface CeleryResponse<Response = any, Payload = any> extends InternalCeleryResponse<Response, Payload> {}

/**
 * The Core implementation for Celery
 */
export class CeleryCore {
    public origin: URL = new URL(window.location.origin)
    public headers = new Headers()

    protected $client: Axios = axios.create()

    constructor(
        protected $controller: AbortController = new AbortController()
    ) {}

    /**
     * Build request with provided config
     */
    protected $request<Response = any, Payload = any>(config: CeleryRequestConfig) {
        const aggregatedController = new AggregatedAbortController([this.$controller])

        // Configure essential options
        if (config.signal) { aggregatedController.attach(config.signal) }
        config.signal = aggregatedController.signal
        config.baseURL = config.baseURL || this.origin.toString()

        // Append headers
        for (const [key, value] of Object.entries(this.headers)) {
            config.headers = config.headers || {}
            config.headers[key] = value
        }

        // TODO: Append credentials

        // Send the request
        const response = this.$client.request<Response, CeleryResponse<Response, Payload>, Payload>(config)

        // Detach signals when request is finished
        response.finally(() => aggregatedController.detachAll())

        return response
    }
}

export class Celery extends CeleryCore {
    /**
     * Create a new Celery instance
     */
    static create(controller?: AbortController) {
        return new this(controller)
    }

    /**
     * Send a HEAD request to the given URL
     */
    public head<Resonse = any, Payload = any, Params = any>(url: string, config?: CeleryRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'HEAD', url: url }));
    }

    /**
     * Send a OPTIONS request to the given URL
     */
    public options<Resonse = any, Payload = any, Params = any>(url: string, config?: CeleryRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'OPTIONS', url: url }));
    }

    /**
     * Send a GET request to the given URL
     */
    public get<Resonse = any, Payload = any, Params = any>(url: string, config?: CeleryRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'GET', url: url }));
    }

    /**
     * Send a POST request to the given URL
     */
    public post<Resonse = any, Payload = any, Params = any>(url: string, config: CeleryRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'POST', url: url }));
    }

    /**
     * Send a PUT request to the given URL
     */
    public put<Resonse = any, Payload = any, Params = any>(url: string, config: CeleryRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'PUT', url: url }));
    }

    /**
     * Send a PATCH request to the given URL
     */
    public patch<Resonse = any, Payload = any, Params = any>(url: string, config: CeleryRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'PATCH', url: url }));
    }

    /**
     * Send a DELETE request to the given URL
     */
    public delete<Resonse = any, Payload = any, Params = any>(url: string, config: CeleryRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'DELETE', url: url }));
    }
}

export interface GlobalCeleryInstance extends Celery {
    create(controller?: AbortController): Celery
}

/**
 * Global Celery instance
 */
const globalCelery = (function wrap() {
    const celery = new Celery() as GlobalCeleryInstance

    celery.create = function (controller?: AbortController) {
        return new Celery(controller)
    }

    return celery
})()

export default globalCelery
