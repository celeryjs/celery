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

    constructor(private scheme: DigestHttpAuthenticationScheme) {
        super();
    }

    getTokenType(): string {
        return this.type;
    }

    getTokenValue(): string {
        return [
            this.scheme.username    ? `username=${this.scheme.username}` : '',
            this.scheme.realm       ? `realm=${this.scheme.realm}` : '',
            this.scheme.nonce       ? `nonce=${this.scheme.nonce}` : '',
            this.scheme.algorithm   ? `algorithm=${this.scheme.algorithm}` : '',
            this.scheme.cnonce      ? `cnonce=${this.scheme.cnonce}` : '',
            this.scheme.nc          ? `nc=${this.scheme.nc}` : '',
            this.scheme.qop         ? `qop=${this.scheme.qop}` : '',
            this.scheme.response    ? `response=${this.scheme.response}` : '',
            this.scheme.opaque      ? `opaque=${this.scheme.opaque}` : '',
            this.scheme.userhash    ? `userhash=${this.scheme.userhash}` : '',
            this.scheme.uri         ? `uri=${this.scheme.uri}` : '',
        ].join(',');
    } 

    getAuthorizationHeader() {
        return `Digest ${this.getTokenValue()}`
    }
}
