import axios from "axios";
import { IResponse, InputUser, LoginUser, NewLogin, NewPassword } from "./types";

const Axios = axios.create({
    baseURL:"http://localhost:4002",
    withCredentials:true
})

export const handleSigneUp = async(user:InputUser): Promise<IResponse> => {
    const response = await Axios.post("/signup", user)
    return response.data
}

export const handleLogin = async (user:LoginUser): Promise<IResponse> => {
    const response = await Axios.post("/login", user)
    return response.data
}

export const handleVerifiy = async():Promise<IResponse> => {
    const response = await Axios.get("/verify")
    return response.data
}

export const handleLogOut = async():Promise<IResponse> => {
    const response = await Axios.post("/logout")
    return response.data
}

export const changePassword = async(data: NewPassword): Promise<IResponse> => {
    const response = await Axios.patch("/update/password", data)
    return response.data
}

export const changeLogin = async(data: NewLogin): Promise<IResponse> => {
    const response = await Axios.patch("/update/login", data)
    return response.data
}




