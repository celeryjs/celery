import { AxiosError } from "axios";
import type { CeleryResponse, InternalCeleryRequestConfig } from "./types";

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
