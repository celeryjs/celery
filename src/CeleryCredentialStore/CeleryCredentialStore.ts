import { BasicCredential } from "./Credentials/BasicCredential"
import type { CredentialAbstract } from "./Credentials/CredentialAbstract"
import type { CeleryCredentialStoreTypeMap, Constructor } from "./types"

const CredentialMap: Record<keyof CeleryCredentialStoreTypeMap, Constructor<CredentialAbstract>> = {
    Basic: BasicCredential
} 

export class CeleryCredentialStore {
    private credential: CredentialAbstract | undefined

    /**
     * Store the credential in the credential store
     * @param type 
     * @param credential 
     */
    store<T extends keyof CeleryCredentialStoreTypeMap>(type: T, credential: CeleryCredentialStoreTypeMap[T]) {
        const Cred = CredentialMap[type]
        if (!Cred) { return false }

        this.credential = new Cred(credential)
        return true
    }

    /**
     * Retrieve the credential from the credential store
     * @return {CredentialAbstract}
     */
    retrieve() {
        return this.credential
    }

    /**
     * Erase the credential from the credential store
     */
    erase() {
        this.credential = undefined
    }
}
