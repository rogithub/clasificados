import { ColumnBase } from './columnBase';

export class DefaultColumn extends ColumnBase {
    constructor(title: string, rowKey?: string) {
        super(title, rowKey);
    }
}