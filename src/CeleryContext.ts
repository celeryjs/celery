interface CeleryContextOptions {
    controller: AbortController
}

export class CeleryContext {
    public credentials: any = {}
    public controller: AbortController

    constructor(options?: CeleryContextOptions) {
        options = (options || {}) as CeleryContextOptions
        this.controller = options.controller || new AbortController()
    }
}
