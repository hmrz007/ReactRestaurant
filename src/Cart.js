import React from 'react'
import Table from 'react-bootstrap/Table';
import { useCart, useDispatchCart } from './ContextReducer';


function Cart() {
    let data = useCart()
    let dispatch = useDispatchCart()
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The cart is Empty!</div>
            </div>
        )
    }
    const handleCheckout=async()=>{
        let userEmail=localStorage.getItem("userEmail")
        let response=await fetch("http://localhost:3001/api/orderData",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
        }
        )
        if(response.status===200){
            dispatch({type:"DROP"})
        }
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md '>
                <Table >
                    <thead className='text-success'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Option</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr className='text-white'>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><button type='button' className="btn p-0"><i className="fa-solid fa-trash-can"  onClick={() => { dispatch({ type: "REMOVE", index: index }) }}></i></button></td>
                            </tr>

                        ))}

                    </tbody>
                </Table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckout}> Check Out </button>
                </div>
            </div>

        </>
    )
}

export default Cart