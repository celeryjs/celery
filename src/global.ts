import { Celery } from "./Celery"
import type { CeleryConfig } from "./types"

export interface GlobalCeleryInstance extends Celery {
    create(config?: CeleryConfig): Celery
}

/**
 * Global Celery instance
 */
const celery = (() => {
    const instance = new Celery() as GlobalCeleryInstance
    instance.create = Celery.create
    return instance
})()

export default celery
