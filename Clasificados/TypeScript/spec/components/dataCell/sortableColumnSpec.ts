import { SortableColumn } from '../../../components/dataCell/sortableColumn';
import Constants from '../../../constants/dataTableConstants';
import { SortOrder } from '../../../constants/sortOrder';
import ko from '../../specHelpers/koMock';


describe('SortableColumn', () => {
    describe('constructor', () => {
        it("should build a cell", (done) => {
            let title = "Nombre";
            let m = new SortableColumn(ko, title);

            expect(m.celTemplate).toBe(Constants.DATA_CELL_DEFAULT_TEMPLATE);
            expect(m.headTemplate).toBe(Constants.DATA_CELL_SORTABLE_HEADER);

            expect(m.header.title).toBe(title);
            expect(m.header.rowKey).toBe(title.toLowerCase());

            expect(m.getCellData({ nombre: "rodrigo" })).toBe("rodrigo");

            let sortableHeader = m.getHeadData(m.header);
            expect(sortableHeader.order()).toBe(SortOrder.None);
            expect(sortableHeader.title()).toBe(title);
            done();
        });
    });

    describe('constructor', () => {
        it("should change row key", (done) => {
            let title = "Nombre";
            let m = new SortableColumn(ko, title, "rock");
            expect(m.header.rowKey).toBe("rock");
            done();
        });
    });
});
