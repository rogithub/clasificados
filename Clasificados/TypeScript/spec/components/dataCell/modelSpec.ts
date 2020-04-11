import { Model } from '../../../components/dataCell/model';
import ko from '../../specHelpers/koMock';

describe('Model', () => {
    describe('constructor', () => {

        it("should build a cell", (done) => {
            let template = "my-crazy-template";
            let data = { active: true };
            let m = new Model(ko, template, data);

            expect(m.data()).toEqual(data);
            expect(m.template()).toBe(template);

            done();
        });
    });
});
