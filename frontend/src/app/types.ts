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