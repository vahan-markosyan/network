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
}