import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategotyType";

function Category(){

    const [categories, setCategories] = useState<CategoryType[]>([]);

    const [categoryName, setCategoryName] = useState<string>("");

    function handleCategoryName(event:any){
        setCategoryName(event.target.value);    
    }

    const [editing,setEditing]=useState<CategoryType>();
    
    function editCategory(categorty:CategoryType){
        setEditing(categorty);
        setCategoryName(categorty.categoryName)
    }

    async function updateCategory() {
        const data={
            categoryName:categoryName
        }
        
        try {
            await axios.put(`http://localhost:8081/category/${editing?.categoryId}`,data);
            loadCategories();
        } catch (error) {
            console.log(error);
        }
    }

    async function loadCategories() {
        const response = await axios.get("http://localhost:8081/category"); 
        setCategories(response.data);
    }

    async function handleSubmit(){
        const data ={categoryName:categoryName}
        const response = await axios.post("http://localhost:8081/category",data);
        console.log(response);
        loadCategories();
    }

    async function deleteCategory(categoryId : number) {
        try {
            await axios.delete(`http://localhost:8081/category/${categoryId}`);
            loadCategories();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
            loadCategories(); 
    }, [])

    return(
        
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Category</h1>
            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Category ID</th>
                        <th className="w-[200px]">Category Name</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(function (categorty) {
                        return (
                            <tr>
                                <td>{categorty.categoryId}</td>
                                <td>{categorty.categoryName}</td>
                                <td>
                                    <button className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-300" onClick={()=>editCategory(categorty)}>Edit</button>
                                    <button  className="bg-red-400 text-white rounded-lg px-2 py-1 hover:bg-red-500"onClick={() => deleteCategory(categorty.categoryId)} >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="border border-slate-200 py-3 px-4 rounded-lg mt-3 max-w-[350px]">
                <form>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Category Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={categoryName} onChange={handleCategoryName} required />
                    </div>
                        {editing ?(
                            <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm"onClick={updateCategory} >Update Category</button>
                            </>
                        ) :(
                            <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handleSubmit}>Create Category</button>
                            </>
                        )}

                    </form>
                    </div>
        </div>
    )
}
export default Category;