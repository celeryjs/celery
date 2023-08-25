/**
 * Abstract class for credentials interface
 */
export abstract class CredentialAbstract {
    /**
     * Get the type of the token
     */
    abstract getTokenType(): string

    /**
     * Get the processed value of the token
     */
    abstract getTokenValue(): string

    /**
     * Get the authorization header
     */
    abstract getAuthorizationHeader(): string
}
