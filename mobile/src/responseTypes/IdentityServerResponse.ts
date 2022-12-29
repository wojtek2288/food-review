export default interface IdentityServerResponse {
    token: string;
    expires_in: number;
    refresh_token: string;
}