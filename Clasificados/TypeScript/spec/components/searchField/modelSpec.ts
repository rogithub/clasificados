import { Model } from '../../../components/searchField/model';
import ko from '../../specHelpers/koMock';

describe('Model', () => {
    describe('constructor', () => {

        it("should build a cell", (done) => {

            let m = new Model(ko);

            expect(m.searchText()).toBe("");

            done();
        });
    });
});
