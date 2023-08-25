export type CeleryContextOrigin = URL | undefined

export interface CeleryContextOptions {
    origin: CeleryContextOrigin
    controller: AbortController
}

export class CeleryContext {
    public origin: CeleryContextOrigin
    public controller: AbortController

    constructor(options?: CeleryContextOptions) {
        options = (options || {}) as CeleryContextOptions
        this.controller = options.controller || new AbortController()
    }
}
