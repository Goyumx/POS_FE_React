import ItemType from "./ItemType";

interface PurchaseType{
    id:number,
    orderDateTime: Date,
    totalPrice:number,
    purchasedItems:ItemType[]
}

export default PurchaseType;