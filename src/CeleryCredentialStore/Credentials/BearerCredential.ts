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
    public token: string;

    constructor(options: BearerHttpAuthenticationScheme) {
        super();
        this.token = options.token;
    }

    getTokenType(): string {
        return this.type;
    }

    getTokenValue(): string {
        return this.token
    }

    getAuthorizationHeader() {
        return `Bearer ${this.getTokenValue()}`
    }
}
