import { BasicCredential } from "./Credentials/BasicCredential";
import type { CredentialAbstract } from "./Credentials/CredentialAbstract";
import type { CeleryCredentialStoreTypeMap, Constructor } from "./types";

export const CredentialMap: Record<keyof CeleryCredentialStoreTypeMap, Constructor<CredentialAbstract>> = {
    Basic: BasicCredential
} as const
