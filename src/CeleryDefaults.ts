import { mergeObject } from "./utils";
import type { Axios } from "axios";
import type { CeleryDefaultConfigs } from "./types";

export class CeleryDefaults {
    public config: CeleryDefaultConfigs

    /**
     * @internal
     */
    private axios: Axios

    constructor(axios: Axios, config?: CeleryDefaultConfigs, strategy?: 'merge' | 'update') {
        this.axios = axios
        this.config = this.axios.defaults

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
    merge(config: CeleryDefaultConfigs){
        const merged = mergeObject<CeleryDefaultConfigs>(this.config, config)
        this.config = merged
        this.axios.defaults = merged
        return this.config
    }

    /**
     * Update the current configuration with the provided configuration
     * @param config 
     * @returns 
     */
    update(config: CeleryDefaultConfigs) {
        this.config = config
        this.axios.defaults = config 
        return this.config
    }
}
