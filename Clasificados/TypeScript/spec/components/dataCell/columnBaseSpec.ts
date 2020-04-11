import { ColumnBase } from '../../../components/dataCell/columnBase';
import Constants from '../../../constants/dataTableConstants';

describe('ColumnBase', () => {
    describe('constructor', () => {
        it("should build a cell", (done) => {
            let title = "Nombre";
            let m = new ColumnBase(title);

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
            let m = new ColumnBase(title, "rock");
            expect(m.header.rowKey).toBe("rock");
            done();
        });
    });

    describe('setGetCellData', () => {
        it("should replace function", (done) => {
            let title = "Nombre";
            let m = new ColumnBase(title);
            m.setGetCellData(r => "hola");
            expect(m.getCellData({ nombre: "rodrigo" })).toBe("hola");
            done();
        });
    });

    describe('setGetHeadData', () => {
        it("should replace function", (done) => {
            let title = "Nombre";
            let m = new ColumnBase(title);
            m.setGetHeadData(h => "hola");
            expect(m.getHeadData(m.header)).toBe("hola");
            done();
        });
    });
});
