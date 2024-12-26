import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { logout } = useAuth()

  return (
    <div className="w-full bg-gray-100 p-2 rounded-lg mt-12 ml-12">
      <div className="w-full bg-gray-100 p-2 rounded-lg">
        <Link to="/item" className="bg-gray-800 text-white px-5 py-2 me-3">Items</Link>
        <Link to="/category" className="bg-gray-800 text-white px-5 py-2 me-3">Category</Link>
        <Link to="/stock" className="bg-gray-800 text-white px-5 py-2 me-3">Stocks</Link>
        <Link to="/purchase" className="bg-gray-800 text-white px-5 py-2 me-3">Purchase</Link>
        <button className="bg-gray-800 text-white px-5 py-2 me-3" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Home;