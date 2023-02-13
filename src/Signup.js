import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3001/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }) //backend body aan ith
        })
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("enter valid credentials")

        }

    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }




    return (
        <>
            <div className='container border mt-5 w-50  '>
                <h1 className='fst-italic text-center'>SIGN-UP</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className=" m-3 btn btn-primary">Sign-Up</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}

export default Signup