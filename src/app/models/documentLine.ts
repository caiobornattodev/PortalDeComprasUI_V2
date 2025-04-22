import { BoObjectTypes } from "../enums/boObjetctTypes";
import { BoStatus } from "../enums/boStatus";
import { BatchNumber } from "./batchNumber";
import { SerialNumber } from "./serialNumber";

export interface DocumentLine {
    lineNum: number;
    itemCode: string | null;
    itemName: string | null;
    quantity: number;
    price: number;
    reqDate: Date;
    lineTotal: number;
    targetType: BoObjectTypes;
    batchNumbers: BatchNumber[] | null;
    serialNumbers: SerialNumber[] | null;
    trgetEntry: number;
    baseRef: string | null;
    baseType: BoObjectTypes;
    baseEntry: number;
    baseLine: number;
    whsCode: string | null;
    lineStatus: BoStatus;
    lineVendor: string | null;
    ocrCode: string;
    ocrDescription: string | null;
    uomEntry: number;
    usageID: number | null;
    prjCode: string | null;
    prjDescription: string | null;
}