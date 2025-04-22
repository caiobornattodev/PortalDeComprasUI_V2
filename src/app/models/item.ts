import { PriceList } from "./priceList"
import { WarehouseInfo } from "./wareHouseInfo"

export interface Item {
    itemCode: string
    itemName: string
    itemType: string
    inventoryItem: number
    salesItem: number
    purchaseItem: number
    quantityOnHand: number
    quantityOnOrder: number
    quantityCommitted: number
    lineVendor: string
    barCode: string
    priceLists: PriceList[]
    warehouseInfo: WarehouseInfo[]
}