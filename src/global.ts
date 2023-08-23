import { Celery } from "./Celery"

export interface GlobalCeleryInstance extends Celery {
    create(controller?: AbortController): Celery
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
