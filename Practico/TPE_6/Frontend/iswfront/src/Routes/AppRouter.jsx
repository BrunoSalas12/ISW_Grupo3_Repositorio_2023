import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Principal from './Principal';
import Pedidos from './Pedidos'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Principal/>}/>
        <Route path='/pedidos' element={<Pedidos/>}></Route>
      </Routes>
    </Router>
  )
}

export default AppRouter;