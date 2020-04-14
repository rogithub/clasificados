import { RuleBase, RuleResult } from 'valiko';

export class PositiveNumber extends RuleBase<number> {
    constructor(msg: string = "Requerido") {
        super(msg);
    }

    public check(value?: number): Promise<RuleResult> {
        const self = this;
        if (value === null || value === undefined || value < 0) {
            return self.toNotValid();
        }

        return self.toValid();
    }
}