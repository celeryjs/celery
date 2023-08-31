import { CeleryInstance } from "./CeleryInstance";
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
}
