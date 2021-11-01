export interface Staff {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    confirmPassword: string;
}

export enum Role {
    Admin,
    User
}