import Constants from '../../constants/dataTableConstants';
import { SortableHeaderCell } from '../../models/sortableHeaderCell';

import { ColumnBase } from './columnBase';

export class SortableColumn extends ColumnBase {
    constructor(ko: KnockoutStatic, title: string, rowKey?: string) {
        super(title, rowKey);
        this.headTemplate = Constants.DATA_CELL_SORTABLE_HEADER;

        this.setGetHeadData((head) => new SortableHeaderCell(ko, head.title));
    }
}
