export interface IUSER {
    id:string
    name:string
    surname:string
    login:string
    password:string
    isPrivate:string
    cover:string
    picture:string

}

export type InputUser = Omit<IUSER, "id"|"isPrivate"|"cover"|"picture">  //omity hanuma
export type LoginUser = Omit<InputUser, "name" | "surname">

export interface IResponse {
    status:string
    message?:string
    payload?:unknown
    user?:IWideUser
}

export interface IWideUser extends IUSER{
    followers:IUSER[]
    followings:IUSER[]
}

export interface IContextType {
    account:IWideUser
    setAccount: (user:IWideUser) => void
}

export interface NewPassword {
    oldpwd:string,
    newpwd:string
}

export interface NewLogin {
    password:string
    newlogin:string
}