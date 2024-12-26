import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import axios from "axios";
import StockType from "../types/StockType";
import CategoryType from "../types/CategotyType";
import { useAuth } from "../context/AuthContext";



function Item(){

    const { isAuthenticated, jwtToken } = useAuth();
    
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }
        
    const[items,setItems]=useState<ItemType[]>([]);

    const[itemName,setItemName]=useState<string>("");
    const[itemPrice,setItemPrice]=useState<number>(0.0);
    const[itemQty,setItemQty]=useState<number>(0);
    const[itemDescription,setItemDescription]=useState<string>("");
    const [categoryId, setCategoryId] = useState<number>();
    const [stockId, setStockId] = useState<number[]>([]);

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [stocks, setStocks] = useState<StockType[]>([]);

    const addStockId = (newId: number) => {
        setStockId((prevStockId) => [...prevStockId, newId]);
    };

    function handleItemName(event: any) {
        setItemName(event.target.value);
    }

    function handleItemPrice(event: any) {
        setItemPrice(event.target.value);
    }

    function handleItemQty(event: any) {
        setItemQty(event.target.value);
    }

    function handleItemDescription(event: any) {
        setItemDescription(event.target.value);
    }

    function handleItemCategoryId(event: any) {
        setCategoryId(event.target.value);
    }

    function handleItemStockId(event: any) {
        addStockId(event.target.value)
    }

    const [editing,setEditing]=useState<ItemType | null>(null);

    function editItem(Item:ItemType){
        setEditing(Item);
        setItemName(Item.name);
        setItemPrice(Item.price);
        setItemQty(Item.qty);
        setItemDescription(Item.description);
        setCategoryId(Item.itemCategory?.categoryId);
        console.log(stocks)
        
    }

    async function loadItems() {
        const response = await axios.get("http://localhost:8081/item", config);
        setItems(response.data);
    }
    
    async function loadCategories() {
        const response = await axios.get("http://localhost:8081/category", config); 
        setCategories(response.data);
    }

    async function loadStock(){
        const response = await axios.get("http://localhost:8081/stock", config);
        setStocks(response.data);
    }

    async function handleSubmit() {
        const data = {
            name: itemName,
            price: itemPrice,
            qty:itemQty,
            description: itemDescription,
            categoryId: categoryId,
            stockIds:stockId
        }
        try {
            await axios.post("http://localhost:8081/item", data, config);
            loadItems();
            setItemName("");
            setItemPrice(0);
            setItemQty(0);
            setItemDescription("");
            setStockId([]);
            setCategoryId(0);
        } catch (error: any) {
            console.log(error);
        }
    }

    async function updateItem() {
        const data={
            name: itemName,
            price: itemPrice,
            qty:itemQty,
            description: itemDescription,
            categoryId: categoryId,
            stockIds:stockId
        }
        try {
            await axios.put(`http://localhost:8081/item/${editing?.itemId}`, data, config);
            setEditing(null);
            loadItems();
            setEditing(null);
            setItemName("");
            setItemPrice(0);
            setItemQty(0);
            setItemDescription("");
            setStockId([]);
            setCategoryId(0);
        } catch (error: any) {
            console.log(error);
        }
    }

    async function deleteItem(ItemId: number) {
        try {
            await axios.delete(`http://localhost:8081/item/${ItemId}`, config);
            loadItems();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        if(isAuthenticated){
            loadItems();
            loadCategories();
            loadStock();
            console.log(config)
        }  
    },[isAuthenticated])

    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Items</h1>
            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Item ID</th>
                        <th className="w-[200px]">Item Name</th>
                        <th className="w-[200px]">Item Price</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(function (item) {
                        return (
                            <tr>
                                <td>{item.itemId}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button onClick={() =>editItem(item)} className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-300">Edit</button>
                                    <button onClick={() => deleteItem(item.itemId)} className="bg-red-400 text-white rounded-lg px-2 py-1 hover:bg-red-500">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="border border-slate-200 py-3 px-4 rounded-lg mt-3 max-w-[350px]">
                <form>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Product Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemName} onChange={handleItemName} required />
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Price</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemPrice} onChange={handleItemPrice} required />
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Quantity</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemQty} onChange={handleItemQty} required />
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Description</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemDescription} onChange={handleItemDescription} required />
                    </div>
                    
                    <label className="text-slate-600 font-sm block mb-2">Category</label>

                        <select className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={categoryId} onChange={handleItemCategoryId} required>
                            <option value="">Please select category</option>
                            {categories.map(function (category) {
                                return (
                                    <option value={category.categoryId}>{category.categoryName}</option>
                                )
                            })}
                        </select>

                        <label className="text-slate-600 font-sm block mb-2">Stock</label>                  
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Stock Id</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg"  onChange={handleItemStockId} required />
                    </div>
                        {editing ?(
                            <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm"onClick={updateItem} >Update Product</button>
                            </>
                        ) :(
                            <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handleSubmit}>Create Product</button>
                            </>
                        )}

                    </form>
                    </div>
        </div>
    )
}

export default Item;