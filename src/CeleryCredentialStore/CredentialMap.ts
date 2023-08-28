import { BasicCredential } from "./Credentials/BasicCredential";
import { DigestCredential } from "./Credentials/DigestCredential";
import { BearerCredential } from "./Credentials/BearerCredential";
import type { CredentialAbstract } from "./Credentials/CredentialAbstract";
import type { CeleryCredentialStoreTypeMap, Constructor } from "./types";

export const CredentialMap: Record<keyof CeleryCredentialStoreTypeMap, Constructor<CredentialAbstract>> = {
    Basic: BasicCredential,
    Bearer: BearerCredential,
    Digest: DigestCredential
} as const
