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
        private scheme: BearerHttpAuthenticationScheme
    ) { super(); }

    getTokenType(): string {
        return this.type;
    }

    getTokenValue(): string {
        return this.scheme.token
    }

    getAuthorizationHeader() {
        return `Bearer ${this.getTokenValue()}`
    }
}
