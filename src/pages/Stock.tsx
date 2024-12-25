import axios from "axios";
import { useEffect, useState } from "react";
import StockType from "../types/StockType";


function Stock(){

    const [stocks, setStocks] =useState<StockType[]>([]);

    const[stockName,setStockName]=useState<string>("");
    const[stockDescription, setStockDescription]= useState<string>("");

    function handleStockName(event:any){
        setStockName(event.target.value)
    }

    function handleStockDescription(event:any){
        setStockDescription(event.target.value)
    }

    async function handleSubmit() {

        const data={
            stockName:stockName,
            description:stockDescription
        }
        try {
            await axios.post("http://localhost:8081/stock",data);
            loadStock();
        } catch (error) {
            console.log(error);
        }
    }
    async function deletStock(stockId :number) {
        try {
            console.log(stockId)
            await axios.delete(`http://localhost:8081/stock/${stockId}`);
            loadStock();
        } catch (error) {
            console.log(error);
        }
    }

    async function loadStock(){
        const response = await axios.get("http://localhost:8081/stock");
        setStocks(response.data);
    }

    const [editing,setEditing]=useState<StockType|null>();

    function editStock(stock : StockType){
        setEditing(stock);
        setStockName(stock.stockName);
        setStockDescription(stock.description);
    }

    async function updateStock(){
        
        const data={
            stockName:stockName,
            description:stockDescription
        }

        try {
            await axios.put(`http://localhost:8081/stock/${editing?.stockId}`,data);
            setEditing(null);
            setStockName("");
            setStockDescription("");
            loadStock();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        loadStock();
    },[])


    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Stocks</h1>
            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Stock ID</th>
                        <th className="w-[200px]">Stock Name</th>
                        <th className="w-[200px]">Stock Description</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map(function (stock) {
                        return (
                            <tr>
                                <td>{stock.stockId}</td>
                                <td>{stock.stockName}</td>
                                <td>{stock.description}</td>
                                <td>
                                    <button onClick={() =>editStock(stock)} className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-300">Edit</button>
                                    <button onClick={() => deletStock(stock.stockId)} className="bg-red-400 text-white rounded-lg px-2 py-1 hover:bg-red-500">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="border border-slate-200 py-3 px-4 rounded-lg mt-3 max-w-[350px]">
                <form>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Stock Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={stockName} onChange={handleStockName} required />
                    </div>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Description</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={stockDescription} onChange={handleStockDescription} required />
                    </div>
                        {editing ?(
                            <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={updateStock}>Update Stock</button>
                            </>
                        ) :(
                            <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handleSubmit} >Create Stock</button>
                            </>
                        )}
                    </form>
                </div>
            </div>    
    )
}


export default Stock;