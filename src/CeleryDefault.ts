import { Axios } from "axios";
import type { AxiosDefaults } from "axios";
import type { CeleryConfiguration } from "./types";

export class CeleryDefault {
    public config: CeleryConfiguration

    constructor(
        private axios: Axios,
        config?: CeleryConfiguration
    ) {
        this.config = this.axios.defaults
        if (config) this.merge(config)
    }

    /**
     * Get configuration by key
     * @param key 
     * @returns 
     */
    get<Key extends keyof CeleryConfiguration>(key: Key): CeleryConfiguration[Key] {
        return this.config[key]
    }

    /**
     * Set configuration by key
     * @param key 
     * @param value 
     */
    set<Key extends keyof CeleryConfiguration>(key: Key, value: CeleryConfiguration[Key]) {
        this.config[key] = value
    }

    /**
     * Merge the provided configuration with the current configuration
     * @param config 
     * @returns 
     */
    merge(config: Record<string, any>){
        const newConfig = Object.assign({}, this.config, config)
        this.config = newConfig
        this.axios.defaults = newConfig
        return newConfig
    }

    /**
     * Update the current configuration with the provided configuration
     * @param config 
     * @returns 
     */
    update(config: Record<string, any>) {
        this.config = config as AxiosDefaults
        this.axios.defaults = config as AxiosDefaults
        return config
    }
}
