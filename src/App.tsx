import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Category from './pages/Category'
import Item from './pages/Item'
import Stock from './pages/Stock'
import Purchase from './pages/purchase/Purchases'
import CreatePurchase from './pages/purchase/CreatePurchase'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/auth/Login'
import Home from './pages/Home'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path='/category' element={<Category/>}/>
      <Route path='/item' element={<Item/>}/>
      <Route path='/stock' element={<Stock/>}/>
      <Route path='/purchase' element={<Purchase/>}/>
      <Route path='/purchase/createPurchase' element={<CreatePurchase/>}/>
      <Route path="/" element={<Home />} />
    </Route> 
      <Route path="/auth/login" element={<Login />} /> 
    </Routes>
    </BrowserRouter>
    </AuthProvider>

  )
}

export default App
