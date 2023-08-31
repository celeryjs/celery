import { CeleryCredentialStore } from "./CeleryCredentialStore"

export type CeleryContextURL = URL | undefined

export interface CeleryContextOptions {
    url?: CeleryContextURL
    controller?: AbortController
    credentialStore?: CeleryCredentialStore
}

export class CeleryContext {
    #url: CeleryContextURL
    #controller: AbortController
    #credentialStore: CeleryCredentialStore

    constructor(options?: CeleryContextOptions) {
        options = (options || {}) as CeleryContextOptions
        this.#url = options.url
        this.#controller = options.controller || new AbortController()
        this.#credentialStore = options.credentialStore || new CeleryCredentialStore()
    }

    get url(): CeleryContextURL {
        return this.#url
    }

    get controller(): AbortController {
        return this.#controller
    }

    get credentialStore(): CeleryCredentialStore | undefined {
        return this.#credentialStore
    }
}
