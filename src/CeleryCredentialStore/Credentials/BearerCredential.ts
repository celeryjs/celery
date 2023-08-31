import { CredentialAbstract } from "./CredentialAbstract";
import type { BearerHttpAuthenticationScheme } from "../types";

/**
 * Bearer credential
 * 
 * The credentials, encoded according to the specified scheme.
 * 
 * [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
 */
export class BearerCredential extends CredentialAbstract {
    public type = "Bearer";

    constructor(
        public credential: BearerHttpAuthenticationScheme
    ) { super(); }

    getTokenType(): string {
        return this.type;
    }

    getTokenValue(): string {
        return this.credential.token
    }

    getAuthorizationHeader() {
        return `Bearer ${this.getTokenValue()}`
    }
}
