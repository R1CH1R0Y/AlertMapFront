import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSignIn = () => {
    const navigate=useNavigate()
    const [input,setInput]=new useState(
        {"username":"","password":""}
    )
    const inputHandler=(event)=>{
        setInput({...input,[event.target.name]:event.target.value})
    }
    const readValue=()=>{
        axios.post("http://localhost:3030/AdminSignIn",input).then(
            (response)=>{
                console.log(response.data)
                if (response.data.status=="incorrect password") {
                    alert("Incorrect Password!!!")
                } else if (response.data.status=="invalid username"){
                    alert("Invalid Username!!!")
                } else {
                    let token=response.data.token
                    let userId=response.data.userId
                    sessionStorage.setItem("userId",userId)
                    sessionStorage.setItem("token",token)
                    navigate("/addalerts")
                }
            }
        ).catch(
            (error)=>{
                console.log(error)
            }
        )
    }
    return (
        <div>
            <div class="card text-center mb-3">
                <div class="card-body">
                    <h5 class="card-title">Sign In</h5>
                    <p></p><p></p>
                    <div className="container">
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <div className="row g-3">
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="" className="form-label">Username :</label>
                                        <input type="text" className="form-control" name='username' value={input.username} onChange={inputHandler}/>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="" className="form-label">Password :</label>
                                        <input type="password" className="form-control" name='password' value={input.password} onChange={inputHandler}/>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <button className="btn btn-success" onClick={readValue}>Sign In</button>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <a href="/AdminSignUp" className="btn btn-primary">Sign Up</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSignIn