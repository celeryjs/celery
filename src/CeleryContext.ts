import { CeleryCredentialStore } from "./CeleryCredentialStore"

export type CeleryContextOrigin = URL | undefined

export interface CeleryContextOptions {
    origin?: CeleryContextOrigin
    controller?: AbortController
    credentialStore?: CeleryCredentialStore
}

export class CeleryContext {
    public origin: CeleryContextOrigin
    public controller: AbortController
    public credentialStore: CeleryCredentialStore

    constructor(options?: CeleryContextOptions) {
        options = (options || {}) as CeleryContextOptions
        this.controller = options.controller || new AbortController()
        this.credentialStore = options.credentialStore || new CeleryCredentialStore()
    }
}
