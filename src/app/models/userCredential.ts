export interface UserCredential {
    sapUser: string | null;
    sapPassword: string | null;
    schema: string | null;
    isUserValidation: boolean;
}