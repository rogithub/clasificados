import { ObsExtension } from 'valiko';

export interface InputModelOptions<T> {
    id: string;
    label: string;
    maxLength: number;
    obs: ObsExtension<T>;
}

export class InputModel<T> {
    public id: string;
    public label: string;
    public maxLength: number;
    public obs: ObsExtension<T>;

    constructor(options: InputModelOptions<T>) {
        this.id = options.id;
        this.label = options.label;
        this.maxLength = options.maxLength;
        this.obs = options.obs;

    }

}