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

/**
 * Merge a list of objects into a single object
 * @param objects 
 * @returns 
 */
export function mergeObjects<T = Record<string, any>>(...objects: any[]): T {
    const merged = {} as T
    for (const object of objects) {
        mergeObject(merged, object)
    }
    return merged
}

/**
 * Merge target and source objects
 * @param target 
 * @param source 
 * @returns 
 */
export function mergeObject<T = Record<string, any>>(target: any, source: any): T {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object) Object.assign(source[key], mergeObject(target[key], source[key]))
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
}

/**
 * Convert a header to a record
 * @param headers 
 * @returns 
 */
export function headerToRecords(headers: Headers) {
    const records: Record<string, string> = {}
    for (const [key, value] of headers) {
        records[key] = value
    }
    return records
}
