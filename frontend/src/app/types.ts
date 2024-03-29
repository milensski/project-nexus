export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
    firstName: string | null,
    lastName: string | null,
    createdAt: string,
    updatedAt: string,

}

export interface UserReg {
    username: string | null | undefined,
    email: string | null | undefined,
    password: string | null | undefined,
    rePassword: string | null | undefined,
}

export interface UserToken {
    id: string,
    username: string,
    email: string,
    iat: number,
    exp: number
}

export interface Project {
    "id": string,
    "title": string,
    "description": string,
    "category": string,
    "createdAt": string,
    "updatedAt": string,
    "owner": User,
    "participants": User[]
}