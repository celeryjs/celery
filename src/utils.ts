/**
 * @returns Get the default origin
 */
export const getDefaultOrigin = () => (typeof window !== 'undefined' && window.location) ? new URL(window.location.origin) : undefined

/**
 * Get the first found value
 * @param args 
 * @returns 
 */
export function withFirstFound<T>(...args: T[]) {
    for (const arg of args) {
        if (arg !== undefined) {
            return arg
        }
    }
}
