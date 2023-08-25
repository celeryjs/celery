import { CredentialAbstract } from "../Credentials/CredentialAbstract"

export class CeleryCredentialStore {
    private credential: CredentialAbstract | undefined

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
