import { CeleryInstance } from "./CeleryInstance";
import { ChildCeleryInstance } from "./ChildCeleryInstance";
import type { CeleryCoreOptions } from "./CeleryCore";

/**
 * Celery HTTP Client
 */
export class Celery extends CeleryInstance {
    /**
     * Create a new Celery instance
     */
    public create(options?: CeleryCoreOptions) {
        return new CeleryInstance(options)
    }

    /**
     * Create a new Child Celery instance
     * @param options 
     * @returns 
     */
    public createChildInstance(options?: CeleryCoreOptions) {
        return new ChildCeleryInstance(this, options)
    }
}
