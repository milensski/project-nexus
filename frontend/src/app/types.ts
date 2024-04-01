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
    "title": string | null | undefined,
    "description": string | null | undefined,
    "category": string | null | undefined,
    "techStack": Techology | null | undefined,
    "createdAt": string | null | undefined,
    "updatedAt": string | null | undefined, 
    "owner": User,
    "participants": User[]
}

export interface CreateProject {
    "title": string | null | undefined,
    "description": string | null | undefined,
    "category": string | null | undefined,
    "techStackNames": Techology[],
    "ownerId": string | null | undefined,
    "participantIds": string[] | null | undefined
}

export interface Techology {
    "id": string,
    "technologyName": string | null | undefined
}