import { ChildCeleryInstance } from "./ChildCeleryInstance";
import { InternalCeleryInstance } from "./InternalCeleryInstance";
import type { CeleryCoreOptions } from "./CeleryCore";

/**
 * Celery HTTP Client
 */
export class CeleryInstance extends InternalCeleryInstance {
    /**
     * Create a new Child Celery instance
     * @param options 
     * @returns 
     */
    public createChildInstance(options?: CeleryCoreOptions) {
        return new ChildCeleryInstance(this, options)
    }
}
