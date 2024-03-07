export interface UserWithoutPassword {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean
}