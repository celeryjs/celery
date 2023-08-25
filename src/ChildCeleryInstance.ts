import { CeleryCoreOptions } from "./CeleryCore";
import { CeleryInstance } from "./CeleryInstance";
import { withFirstFound } from "./utils";

/**
 * Child Celery Instance
 */
export class ChildCeleryInstance extends CeleryInstance {
    constructor(public parent: CeleryInstance, options?: CeleryCoreOptions) {
        super({
            origin: withFirstFound(options?.origin, parent.origin),
            context: withFirstFound(options?.context, parent.context),
            credentialStore: withFirstFound(options?.credentialStore, parent.context.credentialStore, parent.credentialStore),
        })
    }
}
