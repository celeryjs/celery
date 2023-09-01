import { withFirstFound } from "./utils";
import { InternalCeleryInstance } from "./InternalCeleryInstance";
import type { CeleryCoreOptions } from "./CeleryCore";

/**
 * Child Celery Instance
 */
export class ChildCeleryInstance extends InternalCeleryInstance {
    constructor(public parent: InternalCeleryInstance, options?: CeleryCoreOptions) {
        super({
            url: withFirstFound(
                options?.url,
                parent.url,
            ),
            context: withFirstFound(
                options?.context,
                parent.context,
            ),
            credentialStore: withFirstFound(
                options?.credentialStore,
                parent.context.credentialStore,
                parent.credentialStore,
            ),
        })
    }
}
