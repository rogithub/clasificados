import { RuleBase, RuleResult } from 'valiko';

export class RequiredString extends RuleBase<string> {
    constructor(msg: string = "Requerido") {
        super(msg);
    }

    public check(value?: string): Promise<RuleResult> {
        const self = this;
        if (value === null || value === undefined || value.length === 0) {
            return self.toNotValid();
        }

        return self.toValid();
    }
}