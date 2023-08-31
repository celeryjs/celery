import type { AxiosDefaults, AxiosRequestConfig, AxiosResponse } from "axios";
import type { CeleryError } from "./CeleryError";

type ExtractType<T = Object> = { [K in keyof T]: T[K] }

/**
 * Extract `AxiosDefaults` type
 */
type ExtractedAxiosDefaults<Payload = any> = ExtractType<AxiosDefaults<Payload>>;

/**
 * Extract `AxiosRequestConfig` type
 */
type ExtractedAxiosRequestConfig<Payload = any> = ExtractType<AxiosRequestConfig<Payload>>

/**
 * Extract `AxiosResponse` type
 */
type ExtractedAxiosResponse<Response = any, Payload = any> = ExtractType<AxiosResponse<Response, Payload>>

interface InternalCeleryRequestConfig<Payload = any> extends Omit<ExtractedAxiosRequestConfig<Payload>, 'signal'> {
    signal?: AbortSignal
}

interface InternalCeleryRequest<Payload = any, Params = any> extends Omit<InternalCeleryRequestConfig<Payload>, 'method' | 'url' | 'params'> {
    params?: Params
}

interface InternalCeleryResponse<Response = any, Payload = any> extends Omit<ExtractedAxiosResponse<Response, Payload>, 'config'> {
    config: InternalCeleryRequestConfig<Payload>
}

export interface CeleryDefaultConfigs<Payload = any> extends ExtractedAxiosDefaults<Payload> {}
export interface CeleryRequestConfig<Payload = any> extends InternalCeleryRequestConfig<Payload> {}
export interface CeleryRequest<Params = any> extends InternalCeleryRequest<any, Params> {}
export interface CeleryPayloadRequest<Payload = any, Params = any> extends InternalCeleryRequest<Payload, Params> {}
export interface CeleryResponse<Response = any, Payload = any> extends InternalCeleryResponse<Response, Payload> {}

/**
 * Celery Promise Interface
 */
export interface CeleryPromise<T> {
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

    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): CeleryPromise<T>
}
