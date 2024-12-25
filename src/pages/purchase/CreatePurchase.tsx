import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePurchase(){

    const[products, setProducts]= useState<ItemType[]>([]);
    const[purchasedItems, setPurchasedItems] =useState<ItemType[]>([]);
    const[total, setTotal]=useState<number>(0);
    const navigate = useNavigate();

    useEffect(function(){
        loadItems();
    },[])

    useEffect(function(){
        purchasedItems.map(function(item){
            const totalPrice = total + item.price;
            setTotal(totalPrice);
        })
    },[purchasedItems])

    async function loadItems() {
        try {
            const response = await axios.get("http://localhost:8081/item");
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
        
    }

    function addProductToOrder(item :ItemType){
        const updatedpurchase =[...purchasedItems, item];
        setPurchasedItems(updatedpurchase);
    }

    async function saveOrder() {
        var purchased_items:any =[];

        purchasedItems.map(function (item){
            purchased_items.push(item.itemId);
        });
        try {
            await axios.post("http://localhost:8081/purchase",{ purchased_items : purchased_items});
            navigate("/purchase")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex ">
            <div className="w-[400px] border-r border-slae-100 ">
                <span className="text-xl font-semibold text-slate-500 block h-[50px] p-4"> Items</span>

                {products.map(function (product){
                    return (
                        <div onClick={()=>addProductToOrder(product)}className="border border-slate-200 rounded-lg ml-3 m-2 p-3 hover:bg-slate-200">
                            <div className="text-lg font-semibold pl-4"> {product.name}</div>
                            <div className="text-sm text-slate-500 pl-5"> {product.name}</div>
                            <div className="text-sm text-green-600 text-right"> Rs. {product.price} /=</div>
                        </div>
                    )
                })}
            </div>
            <div className="w-full">
            <span className="text-xl font-semibold text-slate-500 block p-4 -[50px]">New Purchase</span>
            <table className="table w-[350px] ">
                <thead className="bg-violet-100">
                    <td className="pt-2 pl-3">ID</td>
                    <td className="pt-2 pl-[40px]">Name</td>
                    <td className="pl-[150px] pt-2 ">Price</td>
                </thead>
                <tbody>
                    {purchasedItems.map(function(item){
                        return(
                            <tr>
                                <td className="pt-2 pl-3">{item.itemId}</td>
                                <td className="w-[40px] pt-2 pl-[40px]">{item.name}</td>
                                <td className="pl-[150px] pt-2 ">{item.price}</td>
                            </tr>
                        )
                    })}
                    <tr><td colSpan={2}>
                        <strong>Total:</strong> </td>    
                        <td className="border-t border-slate-500 p-3 pl-[120px] text-red-700">
                            <strong> Rs.{total}</strong>
                        </td>
                        </tr>
                </tbody>
            </table>
            <button type="button" onClick={saveOrder} className="py-3 px-4 bg-red-800 text-white rounded-lg hover:bg-amber-950 mb-2 ml-[250px] text-sm"> Confirm </button>
            </div>
        </div>
    )
}

export default CreatePurchase;