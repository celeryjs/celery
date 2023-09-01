import type { AxiosDefaults, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";

type ExtractType<T = Object> = { [K in keyof T]: T[K] }

/**
 * Extract `AxiosDefaults` type
 */
export type ExtractedAxiosDefaults<Payload = any> = ExtractType<AxiosDefaults<Payload>>;

/**
 * Extract `RawAxiosRequestHeaders` type
 */
export type ExtractedHeaders = ExtractType<RawAxiosRequestHeaders>

/**
 * Extract `AxiosRequestConfig` type
 */
export type ExtractedAxiosRequestConfig<Payload = any> = ExtractType<AxiosRequestConfig<Payload>>

/**
 * Extract `AxiosResponse` type
 */
export type ExtractedAxiosResponse<Response = any, Payload = any> = ExtractType<AxiosResponse<Response, Payload>>
