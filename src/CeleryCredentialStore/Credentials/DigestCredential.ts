import { CredentialAbstract } from "./CredentialAbstract";
import type { DigestHttpAuthenticationScheme } from "../types";

/**
 * Digest credential
 * 
 * The credentials, encoded according to the specified scheme.
 * 
 * [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
 * | [Digest Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#digest)
 */
export class DigestCredential extends CredentialAbstract {
    public type = "Digest";
    public username: string;
    public realm: string;
    public uri: string;
    public algorithm: string;
    public nonce: string;
    public nc: string;
    public cnonce: string;
    public qop: string;
    public response: string;
    public opaque: string;
    public userhash: "true" | "false";

    constructor(options: DigestHttpAuthenticationScheme) {
        super();
        this.username = options.username;
        this.realm = options.realm;
        this.uri = options.uri;
        this.algorithm = options.algorithm;
        this.nonce = options.nonce;
        this.nc = options.nc;
        this.cnonce = options.cnonce;
        this.qop = options.qop;
        this.response = options.response;
        this.opaque = options.opaque;
        this.userhash = options.userhash;
    }

    getTokenType(): string {
        return this.type;
    }

    getTokenValue(): string {
        return `${ this.username ? `username=${this.username},` : '' }
                ${ this.realm ? `realm=${this.realm},` : '' }
                ${ this.nonce ? `nonce=${this.nonce},` : '' }
                ${ this.algorithm ? `algorithm=${this.algorithm},` : '' }
                ${ this.cnonce ? `cnonce=${this.cnonce},` : '' }
                ${ this.nc ? `nc=${this.nc},` : '' }
                ${ this.qop ? `qop=${this.qop},` : '' }
                ${ this.response ? `response=${this.response},` : '' }
                ${ this.opaque ? `opaque=${this.opaque},` : '' }
                ${ this.userhash ? `userhash=${this.userhash},` : '' }
                ${ this.uri ? `uri=${this.uri},` : '' }`
    } 

    getAuthorizationHeader() {
        return `Digest ${this.getTokenValue()}`
    }
}
