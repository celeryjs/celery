export type Constructor<T> = new (...args: any[]) => T

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
