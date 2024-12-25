import CategoryType from "./CategotyType";
import StockType from "./StockType";


interface ItemType {
    itemId: number,
    name: string,
    price: number,
    qty:number,
    description: string,
    itemCategory?: CategoryType,
    stock?:StockType

}

export default ItemType;