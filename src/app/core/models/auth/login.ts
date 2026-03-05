import { User } from "../user/user";

export interface LoginResponse {
    success: boolean;
    data: {
        token: string;
        user: User;
    };
    error: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}