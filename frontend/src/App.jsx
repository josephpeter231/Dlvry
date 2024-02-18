import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import InventoryItems from './Components/InventoryTeam/InventoryItems'
import InventoryDashboard from './Components/InventoryTeam/InventoryDashboard'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
     
      <Route path='/inventorydashboard' element={<InventoryDashboard/>} />
      <Route path='/inventoryitems' element={<InventoryItems/>} />
    </Routes>
    <div>
      
    </div>
    </>
  )
}

export default App
