import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import Modal from './Modal'
import Cart from './Cart'
import { useCart, useDispatchCart } from './ContextReducer'


function Navbar() {
    let data = useCart()
    const [cartView,setCartView]=useState(false)
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("authToken")
        navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">YourRest</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active " aria-current="page" to="/">HOME</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active  " aria-current="page" to="/myOrder">MY ORDERS</Link>
                                </li>
                                : ""}
                        </ul>
                        {!(localStorage.getItem("authToken")) ?

                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">LOGIN</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">SIGNUP</Link>

                            </div>
                            : <div>
                                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                                    MyCart{" "}
                                    <Badge pill bg="danger">{data.length}</Badge>
                                </div>
                                {cartView?<Modal onClose={()=>setCartView(false)} ><Cart/></Modal>:null}

                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        }


                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar