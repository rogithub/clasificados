import Constants from '../../constants/dataTableConstants';
import { ColumnBase } from './columnBase';

export class ActionsColumn extends ColumnBase {
    constructor(title: string, rowKey?: string) {
        super(title, rowKey);
        this.celTemplate = Constants.DATA_CELL_ACTIONS_HEADER;
        this.setGetCellData(r => r);
    }
}
