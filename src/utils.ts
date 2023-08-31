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

// create a function to merge deep objects
export function mergeDeepObject<T extends Record<string, any>>(target: T, source: T): T {
    // @ts-ignore
    for (const key of Object.keys(source)) {
        // @ts-ignore
        if (source[key] instanceof Object) Object.assign(source[key], mergeDeepObject(target[key], source[key]))
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
}
