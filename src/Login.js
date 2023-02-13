import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3001/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) //backend body aan ith
        })
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("enter valid credentials")
        }
        if (json.success) {
            localStorage.setItem("authToken",json.authToken)
            localStorage.setItem("userEmail",credentials.email)
            navigate("/")
        }
    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className='container border mt-5 w-50  '>
                <h1 className='fst-italic text-center'>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className=" m-3 btn btn-primary">Login</button>
                    <Link to='/createuser' className='m-3 btn btn-danger'>New User</Link>
                </form>
            </div>

        </>
    )
}

export default Login