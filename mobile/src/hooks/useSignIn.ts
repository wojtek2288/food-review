import axios from "axios";
import { useState } from "react";
import { authUrl } from "../api/urlProvider";
import IdentityServerRequest from "../requestTypes.ts/IdentityServerRequest";
import * as SecureStore from 'expo-secure-store';
import qs from "qs";

export const useSignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [error, setError] = useState<any>(null);

    const run = async (req?: IdentityServerRequest) => {
        setIsLoading(true);
        setIsAuthenticated(null);
        let success = false;
        let params: any;

        if (req !== undefined) {
            params =
            {
                client_id: 'client_app',
                grant_type: 'password',
                username: req.username,
                password: req.password
            }
        }
        else {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (refreshToken === null) {
                setIsLoading(false);
                setIsAuthenticated(false);
                return success;
            }
            else {
                params =
                {
                    client_id: 'client_app',
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                }
            }
        }
        try {
            const res = await axios.post(
                authUrl,
                qs.stringify(params),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });

            let tokenExpiration = new Date();
            tokenExpiration.setSeconds(tokenExpiration.getSeconds() + res.data.expires_in);

            await SecureStore.setItemAsync('refreshToken', res.data.refresh_token);
            await SecureStore.setItemAsync('accessToken', res.data.access_token);
            await SecureStore.setItemAsync('accessTokenExpiration', tokenExpiration.toDateString());
            success = true;
            setIsLoading(false);
            setIsAuthenticated(true);
        } catch (responseErr: any) {
            setIsLoading(false);
            setError(responseErr);
            setIsAuthenticated(false);
        }

        return success;
    }

    return { isLoading, isAuthenticated, run, error };
}
