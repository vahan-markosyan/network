import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ILogin, IPassword } from "../../../lib/types"
import { handleChangePassword, handleChangeLogin, handlePrivate } from "../../../lib/api"

export const Settings = () => {
    const [error, setError] = useState<string>("")
    const [isPrivate, setIsPrivate] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IPassword>()
    const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin }, reset: resetLogin } = useForm<ILogin>()  //es pahy ???
    const navigate = useNavigate()

    const ChangePassword = (data: IPassword) => {
        handleChangePassword(data)
            .then(response => {
                if (response.status === "error" && response.message) {
                    setError(response.message)
                } else {
                    console.log("Password changed successfully")
                    reset()
                    navigate("/profile")
                }
            })
            .catch(error => {
                console.error("Error while changing password", error)
                setError("Error during password change")
            })
    }

    const ChangeLogin = (data: ILogin) => {
        handleChangeLogin(data)
            .then(response => {
                if (response.status === "error" && response.message) {
                    setError(response.message)
                } else {
                    console.log("Login changed successfully")
                    resetLogin()
                    navigate("/profile")
                }
            })
            .catch(error => {
                console.error("Error while changing login", error)
                setError("Error during login change")
            })
    }

    const Status = () => {
        const formData = new FormData()
        formData.append("status", isPrivate ? "public" : "private")

        handlePrivate(formData)
            .then(response => {
                if (response.status === "error") {
                    setError(response.message as any)
                } else {
                    setIsPrivate(!isPrivate)
                }
            })
            .catch(error => {
                console.error("Error while changing account status", error)
                setError("Error during account status change")
            })
    }

    return (
        <>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol lg='8'>
                        <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />
                            <MDBCardBody className='px-5'>
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Change Your Password</h3>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <form onSubmit={handleSubmit(ChangePassword)}>
                                <MDBInput
                                        wrapperClass='mb-4'
                                        label='New Password'
                                        type='password'
                                        {...register("newpwd", { required: "Please fill your new password" })}
                                    />
                                    {errors.newpwd && <p style={{ color: "red" }}>{errors.newpwd.message}</p>}
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Old Password'
                                        type='password'
                                        {...register("old", { required: "Please fill your old password" })}
                                    />
                                    {errors.old && <p style={{ color: "red" }}>{errors.old.message}</p>}
                                    
                                    <button type='submit' className='btn btn-outline-info'>Change Password</button>
                                </form>

                                <h3 className="mt-5 mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Change Your Login</h3>
                                <form onSubmit={handleSubmitLogin(ChangeLogin)}>
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Current Password'
                                        type='password'
                                        {...registerLogin("password", { required: "Please fill your password" })}
                                    />
                                    {errorsLogin.password && <p style={{ color: "red" }}>{errorsLogin.password.message}</p>}
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='New Login'
                                        type='text'
                                        {...registerLogin("login", { required: "Please fill your new login" })}
                                    />
                                    {errorsLogin.login && <p style={{ color: "red" }}>{errorsLogin.login.message}</p>}
                                    <button type='submit' className='btn btn-outline-info'>Change Login</button>
                                </form>
                                <h3 className="mt-5 mb-4">Change Account Status</h3>
                                <div onClick={Status} style={{ cursor: 'pointer' }}>
                                <img
                                    src={isPrivate ? "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/lock-64.png" : "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/lock-open-64.png"}
                                    alt={isPrivate ? "Private Account" : "Public Account"}
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <p>{isPrivate ? "Private Account" : "Public Account"}</p>
                            </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}
