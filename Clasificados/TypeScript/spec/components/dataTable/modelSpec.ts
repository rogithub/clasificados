import { Model } from '../../../components/dataTable/model';
import { DefaultColumn } from '../../../components/dataCell/defaultColumn';
import { SortableColumn } from '../../../components/dataCell/sortableColumn';
import ko from '../../specHelpers/koMock';
import { ApiMock } from '../../specHelpers/apiMock';
import { ObjectLiteral } from '../../../shared/objectLiteral';
import { SortableHeaderCell } from '../../../models/sortableHeaderCell';
import { SortOrder } from '../../../constants/sortOrder';

interface Persona {
    nombre: string,
    edad: number
}

describe('Model', () => {

    let searchUrl = "/search"
    let api: ApiMock;
    let response = {
        json: () => [{
            nombre: "Rodrigo",
            edad: 37
        }]
    }

    beforeEach(() => {
        api = new ApiMock();
        api.post = jasmine.createSpy("post").and.resolveTo(response);
    });

    describe('constructor', () => {

        it("should init table", (done) => {

            let m = new Model<Persona>(ko, api, searchUrl, [
                new DefaultColumn("Nombre"),
                new DefaultColumn("Edad")
            ]);

            expect(m.searchUrl).toBe(searchUrl);
            expect(m.searchModel.searchText()).toBe("");

            done();
        });
    });

    describe('sorting', () => {

        it("should sort asc", (done) => {

            let m = new Model<Persona>(ko, api, searchUrl, [
                new DefaultColumn("Nombre"),
                new SortableColumn(ko, "Edad")
            ]);

            let sort = (m.sorting as ObjectLiteral)["calculate"]();

            expect(sort).toEqual([]);

            let sortable = m.cols()[1].model as SortableHeaderCell;
            sortable.order(SortOrder.Asc);

            sort = (m.sorting as ObjectLiteral)["calculate"]();
            expect(sort).toEqual([{ col: "edad", order: 0 }]);

            done();
        });
    });

    describe('sorting', () => {

        it("should sort desc", (done) => {

            let m = new Model<Persona>(ko, api, searchUrl, [
                new DefaultColumn("Nombre"),
                new SortableColumn(ko, "Edad")
            ]);

            let sort = (m.sorting as ObjectLiteral)["calculate"]();

            expect(sort).toEqual([]);

            let sortable = m.cols()[1].model as SortableHeaderCell;
            sortable.order(SortOrder.Desc);

            sort = (m.sorting as ObjectLiteral)["calculate"]();
            expect(sort).toEqual([{ col: "edad", order: 1 }]);

            done();
        });
    });
});
