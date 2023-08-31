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

    constructor(
        public credential: DigestHttpAuthenticationScheme
    ) { super(); }

    getTokenType(): string {
        return this.type;
    }

    getTokenValue(): string {
        return [
            this.credential.username    ? `username=${this.credential.username}` : '',
            this.credential.realm       ? `realm=${this.credential.realm}` : '',
            this.credential.nonce       ? `nonce=${this.credential.nonce}` : '',
            this.credential.algorithm   ? `algorithm=${this.credential.algorithm}` : '',
            this.credential.cnonce      ? `cnonce=${this.credential.cnonce}` : '',
            this.credential.nc          ? `nc=${this.credential.nc}` : '',
            this.credential.qop         ? `qop=${this.credential.qop}` : '',
            this.credential.response    ? `response=${this.credential.response}` : '',
            this.credential.opaque      ? `opaque=${this.credential.opaque}` : '',
            this.credential.userhash    ? `userhash=${this.credential.userhash}` : '',
            this.credential.uri         ? `uri=${this.credential.uri}` : '',
        ].join(',');
    } 

    getAuthorizationHeader() {
        return `Digest ${this.getTokenValue()}`
    }
}
