import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '.'
import Signup from './Signup';
import { CartProvider } from './ContextReducer';
import MyOrder from './MyOrder';


function App() {
  return (
    <CartProvider>

    <Router>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createuser' element={<Signup/>}/>
        <Route path='/myOrder' element={<MyOrder/>}/>
        
        

      </Routes>


    </Router>
    </CartProvider>
  );
}

export default App;
