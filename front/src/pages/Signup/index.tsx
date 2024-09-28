import { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { InputUser } from '../../lib/types';
import { handleSigneUp } from '../../lib/api';
import { useForm } from 'react-hook-form';


export function Signup() {

    
    const [error, setError] = useState<string>("")
    const {register, handleSubmit, formState:{errors}, reset} = useForm<InputUser>()
    const navigate = useNavigate()
    

    // const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     if(!user.name.trim() || !user.surname.trim()) {
    //         setError("please fill your name")
    //     } else if(user.password.length < 6) {
    //         setError("please choose a long password")
    //     } else {
    //         setError("")
    //         handleSigneUp(user)
    //         .then(response => {
    //             if(response.status == "error" && response.message)
    //             setError(response.message)
    //         })
            
    //     }
    //     console.log(user)
    // }

    const handleAdd = (data: InputUser) => {
        handleSigneUp(data)
            .then(response => {
                if (response.status === 'error' && response.message) {
                    setError(response.message)
                } else {
                    console.log(data)
                    reset()
                    navigate("/login")
                    
                }
            })
            .catch(error => {
                console.log("Error while submitting", error)
                setError("An error during signe up.")
            })
    }
    


    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p> 

                            <form onSubmit={handleSubmit(handleAdd)}>
                                {error && <p className='text-danger'>{error}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    type='text'
                                    // value={user.name}
                                    // onChange={e => setUser({...user, name:e.target.value})}
                                    {...register("name", {required:"Please fill your name"})}
                                    
                                />
                                {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Surname'
                                    type='text'
                                    // value={user.surname}
                                    // onChange={e => setUser({...user, surname:e.target.value})}
                                    {...register("surname", {required:"Please fill your surname"})}
                                    
                                />
                                {errors.surname && <p style={{color:"red"}}>{errors.surname.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    // value={user.login}
                                    // onChange={e => setUser({...user, login:e.target.value})}
                                    {...register("login", {required:"Please fill your login"})}
                                    
                                />
                                {errors.login && <p style={{color:"red"}}>{errors.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
                                    // value={user.password}
                                    // onChange={e => setUser({...user, password:e.target.value})}
                                    {...register("password", {required:"Please fill your password"})}
                                    
                                />
                                {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}
