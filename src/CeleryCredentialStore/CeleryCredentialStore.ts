import { Credential } from "./Credential"

export class CeleryCredentialStore {
    private credential: Credential | undefined

    store() {
        // TODO: Implement
    }

    retrieve() {
        return this.credential
    }

    clear() {
        this.credential = undefined
    }
}
