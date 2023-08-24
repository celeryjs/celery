import { CeleryCore } from "./CeleryCore";
import type{ CeleryContext } from "./CeleryContext";
import type { CeleryPayloadRequest, CeleryRequest } from "./types";

/**
 * Celery HTTP Client
 */
export class Celery extends CeleryCore {
    /**
     * Create a new Celery instance
     */
    static create(context?: CeleryContext) {
        return new this(context)
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
