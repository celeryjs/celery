import { CeleryCredentialStore } from "./CeleryCredentialStore"

export type CeleryContextOrigin = URL | undefined

export interface CeleryContextOptions {
    origin?: CeleryContextOrigin
    controller?: AbortController
    credentialStore?: CeleryCredentialStore
}

export class CeleryContext {
    #origin: CeleryContextOrigin
    #controller: AbortController
    #credentialStore: CeleryCredentialStore

    constructor(options?: CeleryContextOptions) {
        options = (options || {}) as CeleryContextOptions
        this.#origin = options.origin
        this.#controller = options.controller || new AbortController()
        this.#credentialStore = options.credentialStore || new CeleryCredentialStore()
    }

    get origin(): CeleryContextOrigin {
        return this.#origin
    }

    get controller(): AbortController {
        return this.#controller
    }

    get credentialStore(): CeleryCredentialStore | undefined {
        return this.#credentialStore
    }
}
