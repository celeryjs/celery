s/**
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
