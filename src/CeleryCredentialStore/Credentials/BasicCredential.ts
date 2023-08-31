import { CredentialAbstract } from "./CredentialAbstract";
import { StringBase64 } from "../../Base64";
import type { BasicHttpAuthenticationScheme } from "../types";

/**
 * Basic credential
 * 
 * The credentials, encoded according to the specified scheme.
 * 
 * [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
 * | [Basic Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic)
 */
export class BasicCredential extends CredentialAbstract {
    public type = "Basic";
    private base64 = new StringBase64();

    constructor(
        public credential: BasicHttpAuthenticationScheme
    ) { super(); }

    getTokenType(): string {
        return this.type;
    }

    getTokenValue(): string {
        return `${this.credential.username}:${this.credential.password}`
    }

    getAuthorizationHeader() {
        return `Basic ${this.base64.encode(this.getTokenValue())}`
    }
}
