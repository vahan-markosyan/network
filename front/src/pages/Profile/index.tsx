import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { handleLogOut, handleVerifiy } from "../../lib/api"
import { IWideUser } from "../../lib/types"

export const Profile = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState<IWideUser|null>(null)

    const handleQuit = () => {
        handleLogOut()
        .then(response => {
            console.log(response.message)
            navigate("/")
        })
        .catch(error => {
            console.log("error while logging out", error)
        })
        
    }


    useEffect(() => {
        handleVerifiy()
        .then(response => {
            if(!response.user) {
                navigate("/login")
            } else {
                setAccount(response.user)
            }
        })
    },[])

    return account && <>
    <nav>
        <NavLink to = "" end>Profile</NavLink>
        <NavLink to = "settings">Settings</NavLink> 
        <NavLink to = "search">Search</NavLink> 
        <NavLink to = "posts">Posts</NavLink> 
        <NavLink to = "followers">Followers</NavLink> 
        <NavLink to = "followings">Followings</NavLink> 
        <button onClick={handleQuit}>Logout</button>
    </nav>

    <Outlet
    context={{account, setAccount}}
    />


    </>
}