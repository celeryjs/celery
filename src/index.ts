import { Celery } from './Celery'

export * from './types'
export * from './Celery'
export * from './CeleryCore'
export * from './CeleryContext'
export * from './CeleryCredentialStore'
export * from './CeleryError'

/**
 * Global Celery instance
 */
export const celery = new Celery()

/**
 * Default global Celery instance
 */
export default celery
