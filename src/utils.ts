/**
 * @returns Get the default origin
 */
export const getDefaultOrigin = () => (typeof window !== 'undefined' && window.location) ? new URL(window.location.origin) : undefined
