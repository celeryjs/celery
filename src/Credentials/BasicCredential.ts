import { CredentialAbstract } from "./CredentialAbstract";
import { StringBase64 } from "../Base64";

/**
 * Basic credential
 * 
 * The credentials, encoded according to the specified scheme.
 * 
 * [Basic Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic)
 */
export class BasicCredential extends CredentialAbstract {
    public type = "Basic";
    public username: string;
    public password: string;

    private base64 = new StringBase64();

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }

    getTokenType(): string {
        return this.type;
    }

    getTokenValue(): string {
        return `${this.username}:${this.password}`
    }

    getAuthorizationHeader() {
        return `Basic ${this.base64.encode(this.getTokenValue())}`
    }
}
