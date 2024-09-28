import axios from "axios";
import { ILogin, IPassword, IResponse, InputUser, LoginUser } from "./types";

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

export const handleChangePassword = async(data: IPassword): Promise<IResponse> => {
    const response = await Axios.patch("/update/password", data)
    return response.data
}

export const handleChangeLogin = async(data: ILogin): Promise<IResponse> => {
    const response = await Axios.patch("/update/login", data)
    return response.data
}

export const handlePictureUpload = async(data:FormData): Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload", data)
    return response.data
}

export const handleCoverUpload = async(data:FormData): Promise<IResponse> => {
    const response = await Axios.patch("/cover/upload", data)
    return response.data
}




