import { getDefaultOrigin } from "./utils"

interface CeleryContextOptions {
    controller: AbortController
}

export class CeleryContext {
    public origin: URL | undefined = getDefaultOrigin()
    public credentials: any = {}
    public controller: AbortController

    constructor(options?: CeleryContextOptions) {
        options = (options || {}) as CeleryContextOptions
        this.controller = options.controller || new AbortController()
    }
}
