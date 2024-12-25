import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Category from './pages/Category'
import Item from './pages/Item'
import Stock from './pages/Stock'
import Purchase from './pages/purchase/Purchases'
import CreatePurchase from './pages/purchase/CreatePurchase'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/category' element={<Category/>}/>
      <Route path='/item' element={<Item/>}/>
      <Route path='/stock' element={<Stock/>}/>
      <Route path='purchase' element={<Purchase/>}/>
      <Route path='purchase/createPurchase' element={<CreatePurchase/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
