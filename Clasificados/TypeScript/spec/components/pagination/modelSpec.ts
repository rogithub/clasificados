import { Model } from '../../../components/pagination/model';
import ko from '../../specHelpers/koMock';

describe('Model', () => {
    describe('constructor', () => {

        it("should paginate rows", (done) => {

            let m = new Model(ko);

            expect(m.page()).toBe(1);
            expect(m.pageSize()).toBe(20);
            expect(m.totalRows()).toBe(0);
            expect(m.list()).toEqual([]);

            m.totalRows(21);
            expect(m.list()).toEqual([1, 2]);

            m.totalRows(20);
            expect(m.list()).toEqual([1]);

            done();
        });
    });
});
