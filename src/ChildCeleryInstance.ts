import { Celery } from "./Celery";
import { CeleryCoreOptions } from "./CeleryCore";
import { withFirstFound } from "./utils";

/**
 * Child Celery Instance
 */
export class ChildCeleryInstance extends Celery {
    constructor(public parent: Celery, options?: CeleryCoreOptions) {
        super({
            origin: withFirstFound(options?.origin, parent.origin),
            context: withFirstFound(options?.context, parent.context),
            credentialStore: withFirstFound(options?.credentialStore, parent.context.credentialStore, parent.credentialStore),
        })
    }
}
