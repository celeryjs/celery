import { Axios } from "axios";
import type { AxiosDefaults } from "axios";
import type { CeleryDefaultConfig } from "./types";
import { mergeDeepObject } from "./utils";

export class CeleryDefault {
    public config: CeleryDefaultConfig

    constructor(
        private axios: Axios,
        config?: CeleryDefaultConfig
    ) {
        this.config = this.axios.defaults
        if (config) this.merge(config)
    }

    /**
     * Get configuration by key
     * @param key 
     * @returns 
     */
    get<Key extends keyof CeleryDefaultConfig>(key: Key): CeleryDefaultConfig[Key] {
        return this.config[key]
    }

    /**
     * Set configuration by key
     * @param key 
     * @param value 
     */
    set<Key extends keyof CeleryDefaultConfig>(key: Key, value: CeleryDefaultConfig[Key]) {
        this.config[key] = value
    }

    /**
     * Merge the provided configuration with the current configuration
     * @param config 
     * @returns 
     */
    merge(config: CeleryDefaultConfig){
        const newConfig = mergeDeepObject(this.config, config)
        this.config = newConfig
        this.axios.defaults = newConfig
        return newConfig
    }

    /**
     * Update the current configuration with the provided configuration
     * @param config 
     * @returns 
     */
    update(config: CeleryDefaultConfig) {
        this.config = config as AxiosDefaults
        this.axios.defaults = config as AxiosDefaults
        return config
    }
}
