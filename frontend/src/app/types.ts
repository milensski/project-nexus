export interface User {
    username: string,
    email: string,
    password: string,
    firstName: string | null,
    lastName: string | null,
    createdAt: Date,
    updatedAt: Date,
    ownedListings: any,
    participatedListings: any;


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