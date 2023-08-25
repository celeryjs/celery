import { getDefaultOrigin } from "./utils"

export interface CeleryContextOptions {
    controller: AbortController
}

export class CeleryContext {
    public origin: URL | undefined = getDefaultOrigin()
    public controller: AbortController

    constructor(options?: CeleryContextOptions) {
        options = (options || {}) as CeleryContextOptions
        this.controller = options.controller || new AbortController()
    }
}
