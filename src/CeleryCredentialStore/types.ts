export type Constructor<T> = new (...args: any[]) => T

export interface BasicHttpAuthenticationScheme {
    username: string;
    password: string;
}

export interface BearerHttpAuthenticationScheme {
    token: string;
}

export interface DigestHttpAuthenticationScheme {
    username: string;
    realm: string;
    uri: string;
    algorithm: string;
    nonce: string;
    nc: string;
    cnonce: string;
    qop: string;
    response: string;
    opaque: string;
    userhash: "true" | "false";
}

export interface CeleryCredentialStoreTypeMap {
    Basic: BasicHttpAuthenticationScheme;
    // Bearer: BearerHttpAuthenticationScheme;
    // Digest: DigestHttpAuthenticationScheme;
}

export type CeleryCredentialStoreTypes = keyof CeleryCredentialStoreTypeMap;
