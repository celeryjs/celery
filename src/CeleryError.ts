import { AxiosError } from "axios";
import type { CeleryRequestConfig, CeleryResponse } from "./types";

/**
 * Celery Error Constructor
 */
export class CeleryError<Response = any, Payload = any> extends AxiosError {
    constructor(
        message?: string,
        code?: string,
        config?: CeleryRequestConfig<Payload>,
        request?: any,
        response?: CeleryResponse<Response, Payload>
    ) {
        // @ts-ignore
        super(message, config, code, request, response)
    }
}
