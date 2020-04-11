import { SortableHeaderCell } from '../../models/sortableHeaderCell';
import { SortOrder } from '../../constants/sortOrder';
import ko from '../specHelpers/koMock';

describe('SortableHeaderCell', () => {

    let title = "Title";

    describe('constructor', () => {

        it("should initialize object", (done) => {
            let cell = new SortableHeaderCell(ko, title);

            expect(cell.order()).toBe(SortOrder.None);
            expect(cell.title()).toBe(title);

            cell = new SortableHeaderCell(ko);

            expect(cell.title()).toBe("");
            expect(cell.order()).toBe(SortOrder.None);

            done();
        });
    });

    describe('changeOrder', () => {

        it("should change order incrementally", (done) => {
            let cell = new SortableHeaderCell(ko, title);

            expect(cell.order()).toBe(SortOrder.None);
            cell.changeOrder();
            expect(cell.order()).toBe(SortOrder.Asc);
            cell.changeOrder();
            expect(cell.order()).toBe(SortOrder.Desc);
            cell.changeOrder();
            expect(cell.order()).toBe(SortOrder.None);

            done();
        });
    });
});
