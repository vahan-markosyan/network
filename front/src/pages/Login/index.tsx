import  { useState } from 'react';

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
import { handleLogin } from '../../lib/api';
import { LoginUser } from '../../lib/types';
import { useForm } from 'react-hook-form';

export function Login() {

    const [error, setError] = useState<string>("")
    const {register, handleSubmit, formState:{errors}, reset} = useForm<LoginUser>()
    const navigate = useNavigate()

    const handleCheck = (data:LoginUser) => {
        handleLogin(data)
        .then(response => {
            if(response.status == "error" && response.message) {
                setError(response.message)
            } else {
                console.log(data)
                reset()
                navigate("/profile")  
            }
        })
        .catch(error => {
            console.log("error while submitting", error)
            setError("error during logging in")

        })

    }


    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Info</h3>
                            <p>Don't you have an account? <Link to={'/'}>Signup Now</Link></p>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <form onSubmit={handleSubmit(handleCheck)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    {...register("login", {required:"Please fill your login"})}

                                />
                                {errors.login && <p style={{color:"red"}}>{errors.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
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
    );
}
