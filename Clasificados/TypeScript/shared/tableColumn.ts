import { ObjectLiteral } from './objectLiteral';

export interface TableColumn {
    header: ObjectLiteral;
    celTemplate: string;
    headTemplate: string;
    getCellData: <T>(row: ObjectLiteral) => T;
    getHeadData: <T>(header: ObjectLiteral) => T;
}