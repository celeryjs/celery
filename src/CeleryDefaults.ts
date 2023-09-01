import { mergeObject } from "./utils";
import type { Axios } from "axios";
import type { CeleryDefaultConfigs } from "./types";

class CeleryDefaultsInterface {
    protected axios: Axios
    protected config: CeleryDefaultConfigs

    constructor(axios: Axios, config?: CeleryDefaultConfigs) {
        this.axios = axios
        this.config = mergeObject({}, this.axios.defaults)

        // Link the axios defaults to the celery defaults
        Object.defineProperty(this.axios, 'defaults', {
            get: () => this.config,
            set: (value) => { this.config = value },
            enumerable: true,
            configurable: true
        })

        // Merge the provided configuration
        if (config) this.merge(config)
    }

    /**
     * Get configuration by key
     * @param key 
     * @returns 
     */
    get<Key extends keyof CeleryDefaultConfigs>(key: Key): CeleryDefaultConfigs[Key] {
        return this.config[key]
    }

    /**
     * Set configuration by key
     * @param key 
     * @param value 
     */
    set<Key extends keyof CeleryDefaultConfigs>(key: Key, value: CeleryDefaultConfigs[Key]) {
        this.config[key] = value
    }

    /**
     * Merge the provided configuration with the current configuration
     * @param config 
     * @returns 
     */
    merge(config: CeleryDefaultConfigs) {
        const merged = mergeObject<CeleryDefaultConfigs>(this.config, config)
        this.config = merged
        return this.config
    }

    /**
     * Update the current configuration with the provided configuration
     * @param config 
     * @returns 
     */
    update(config: CeleryDefaultConfigs) {
        this.config = config
        return this.config
    }
}

export class CeleryDefaults extends CeleryDefaultsInterface {
    // #region properties
    get timeout() {
        return this.config.timeout
    }

    get timeoutErrorMessage() {
        return this.config.timeoutErrorMessage
    }

    get headers (){
        return this.config.headers
    }
    // #endregion

    // #region methods
    get transformRequest() {
        return this.config.transformRequest
    }

    get transformResponse() {
        return this.config.transformResponse
    }

    get paramsSerializer(){
        return this.config.paramsSerializer
    }
    // #endregion
}
