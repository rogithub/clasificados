import { DefaultColumn } from '../../../components/dataCell/defaultColumn';
import Constants from '../../../constants/dataTableConstants';

describe('DefaultColumn', () => {
    describe('constructor', () => {
        it("should build a cell", (done) => {
            let title = "Nombre";
            let m = new DefaultColumn(title);

            expect(m.celTemplate).toBe(Constants.DATA_CELL_DEFAULT_TEMPLATE);
            expect(m.headTemplate).toBe(Constants.DATA_CELL_DEFAULT_TEMPLATE);

            expect(m.header.title).toBe(title);
            expect(m.header.rowKey).toBe(title.toLowerCase());

            expect(m.getCellData({ nombre: "rodrigo" })).toBe("rodrigo");
            expect(m.getHeadData(m.header)).toBe(title);
            done();
        });
    });

    describe('constructor', () => {
        it("should change row key", (done) => {
            let title = "Nombre";
            let m = new DefaultColumn(title, "rock");
            expect(m.header.rowKey).toBe("rock");
            done();
        });
    });
});
