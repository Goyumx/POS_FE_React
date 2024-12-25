import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PurchaseType from "../../types/PurchaseType";

function Purchase() {

    const [purchases, setPurchases] = useState<PurchaseType[]>([]);

    async function loadPurchase() {
        try {
            const response = await axios.get("http://localhost:8081/purchase");
            setPurchases(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(function() {
        loadPurchase();
    },[])
    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Purchases</h1>
            <Link to="/purchase/createPurchase" className="text-blue-500 mb-5 block">New Purchase</Link>
            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Purchase ID</th>
                        <th className="w-[200px]">Purchase Date and Time</th>
                        <th className="w-[200px]">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map(function (purchase) {
                        return (
                            <tr>
                                <td>{purchase.id}</td>
                                <td>{purchase.orderDateTime}</td>
                                <td>{purchase.totalPrice}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Purchase;