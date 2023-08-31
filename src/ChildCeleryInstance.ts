import { withFirstFound } from "./utils";
import { CeleryInstance } from "./CeleryInstance";
import type { CeleryCoreOptions } from "./CeleryCore";

/**
 * Child Celery Instance
 */
export class ChildCeleryInstance extends CeleryInstance {
    constructor(public parent: CeleryInstance, options?: CeleryCoreOptions) {
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
