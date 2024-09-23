import axios from "axios";
import { IResponse, InputUser, LoginUser } from "./types";

const Axios = axios.create({
    baseURL:"http://localhost:4002"
})

export const handleSigneUp = async(user:InputUser): Promise<IResponse> => {
    const response = await Axios.post("/signup", user)
    return response.data
}

export const handleLogin = async (user:LoginUser): Promise<IResponse> => {
    const response = await Axios.post("/login", user)
    return response.data
}


