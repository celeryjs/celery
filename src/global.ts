import { Celery } from "./Celery"
import { CeleryContext } from "./CeleryContext"

export interface GlobalCeleryInstance extends Celery {
    create(context?: CeleryContext): Celery
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
