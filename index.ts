import axios, { AxiosError } from "axios";
import { AggregatedAbortController } from 'aggregated-abortcontroller'
import type {  Axios, AxiosRequestConfig, AxiosResponse } from "axios";

type ExtractType<T = Object> = { [K in keyof T]: T[K] }

/**
 * Extract `AxiosRequestConfig` type
 */
type ExtractedAxiosRequestConfig<Payload = any> = ExtractType<AxiosRequestConfig<Payload>>

/**
 * Extract `AxiosResponse` type
 */
type ExtractedAxiosResponse<Response = any, Payload = any> = ExtractType<AxiosResponse<Response, Payload>>

interface CeleryPromise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: CeleryError) => TResult2 | PromiseLike<TResult2>) | undefined | null): CeleryPromise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: CeleryError) => TResult | PromiseLike<TResult>) | undefined | null): CeleryPromise<T | TResult>;
}

/**
 * Celery Error Constructor
 */
export class CeleryError<Response = any, Payload = any> extends AxiosError {
    constructor(
        message?: string,
        code?: string,
        config?: InternalCeleryRequestConfig<Payload>,
        request?: any,
        response?: CeleryResponse<Response, Payload>
    ) {
        // @ts-ignore
        super(message, config, code, request, response)
    }
}

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
export interface CeleryRequest<Params = any> extends InternalCeleryRequest<any, Params> {}
export interface CeleryPayloadRequest<Payload = any, Params = any> extends InternalCeleryRequest<Payload, Params> {}
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
    protected $request<Response = any, Payload = any>(config: CeleryRequestConfig): CeleryPromise<CeleryResponse<Response, Payload>> {
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

/**
 * Celery HTTP Client
 */
export class Celery extends CeleryCore {
    /**
     * Create a new Celery instance
     */
    static create(controller?: AbortController) {
        return new this(controller)
    }

    /**
     * Send a HEAD request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)
     */
    public head<Params = any>(url: string, config?: CeleryRequest<Params>) {
        return this.$request(Object.assign({}, config, { method: 'HEAD', url: url }));
    }

    /**
     * Send a OPTIONS request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS)
     */
    public options<Resonse = any, Params = any>(url: string, config?: CeleryRequest<Params>) {
        return this.$request<Resonse>(Object.assign({}, config, { method: 'OPTIONS', url: url }));
    }

    /**
     * Send a GET request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
     */
    public get<Resonse = any, Params = any>(url: string, config?: CeleryRequest<Params>) {
        return this.$request<Resonse>(Object.assign({}, config, { method: 'GET', url: url }));
    }

    /**
     * Send a POST request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
     */
    public post<Resonse = any, Payload = any, Params = any>(url: string, config: CeleryPayloadRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'POST', url: url }));
    }

    /**
     * Send a PUT request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)
     */
    public put<Resonse = any, Payload = any, Params = any>(url: string, config: CeleryPayloadRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'PUT', url: url }));
    }

    /**
     * Send a PATCH request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)
     */
    public patch<Resonse = any, Payload = any, Params = any>(url: string, config: CeleryPayloadRequest<Payload, Params>) {
        return this.$request<Resonse, Payload>(Object.assign({}, config, { method: 'PATCH', url: url }));
    }

    /**
     * Send a DELETE request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)
     */
    public delete<Resonse = any, Payload = any, Params = any>(url: string, config: CeleryPayloadRequest<Payload, Params>) {
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
    celery.create = Celery.create
    return celery
})()

export default globalCelery
