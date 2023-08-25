import { CeleryCore, CeleryCoreOptions } from "./CeleryCore";
import { ChildCeleryInstance } from "./ChildCeleryInstance";
import type { CeleryPayloadRequest, CeleryRequest } from "./types";

/**
 * Celery HTTP Client
 */
export class Celery extends CeleryCore {
    /**
     * Create a new Celery instance
     */
    static create(options?: CeleryCoreOptions) {
        return new this(options)
    }
    
    /**
     * Create a new Celery instance
     */
    public create(options?: CeleryCoreOptions) {
        return new Celery(options)
    }

    /**
     * Extend the current Celery instance
     * @param options 
     * @returns 
     */
    public extends(options?: CeleryCoreOptions) {
        return new ChildCeleryInstance(this, options)
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
    public options<Response = any, Params = any>(url: string, config?: CeleryRequest<Params>) {
        return this.$request<Response>(Object.assign({}, config, { method: 'OPTIONS', url: url }));
    }

    /**
     * Send a GET request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
     */
    public get<Response = any, Params = any>(url: string, config?: CeleryRequest<Params>) {
        return this.$request<Response>(Object.assign({}, config, { method: 'GET', url: url }));
    }

    /**
     * Send a POST request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
     */
    public post<Response = any, Payload = any, Params = any>(url: string, config: CeleryPayloadRequest<Payload, Params>) {
        return this.$request<Response, Payload>(Object.assign({}, config, { method: 'POST', url: url }));
    }

    /**
     * Send a PUT request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)
     */
    public put<Response = any, Payload = any, Params = any>(url: string, config: CeleryPayloadRequest<Payload, Params>) {
        return this.$request<Response, Payload>(Object.assign({}, config, { method: 'PUT', url: url }));
    }

    /**
     * Send a PATCH request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)
     */
    public patch<Response = any, Payload = any, Params = any>(url: string, config: CeleryPayloadRequest<Payload, Params>) {
        return this.$request<Response, Payload>(Object.assign({}, config, { method: 'PATCH', url: url }));
    }

    /**
     * Send a DELETE request to the given URL
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)
     */
    public delete<Response = any, Payload = any, Params = any>(url: string, config: CeleryPayloadRequest<Payload, Params>) {
        return this.$request<Response, Payload>(Object.assign({}, config, { method: 'DELETE', url: url }));
    }
}
