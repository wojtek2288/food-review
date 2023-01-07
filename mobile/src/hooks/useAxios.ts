import { useState } from 'react';
import { queryUrl, commandUrl, authUrl } from '../api/urlProvider';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import ErrorResponse from '../responseTypes/ErrorResponse';

export enum RequestType {
    Command,
    Query,
}

interface IdentityServerResponse {
    access_token: string,
    token_expiry: number,
    refresh_token: string,
}

export const loginWithPassword = async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append('client_id', 'client_app');
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    const res: IdentityServerResponse = await axios({
        method: 'post',
        url: authUrl,
        data: params,
    });

    let tokenExpiration = new Date();
    tokenExpiration.setSeconds(tokenExpiration.getSeconds() + res.token_expiry);

    await SecureStore.setItemAsync('refreshToken', res.refresh_token);
    await SecureStore.setItemAsync('accessToken', res.access_token);
    await SecureStore.setItemAsync('accessTokenExpiration', tokenExpiration.toDateString());
}

const getToken = async (): Promise<string | null> => {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const accessTokenExpiration = await SecureStore.getItemAsync('accessTokenExpiration');

    if (refreshToken == null || accessToken == null || accessTokenExpiration == null) {
        return null;
    }

    let tokenExpiration = new Date(accessTokenExpiration);

    if (tokenExpiration > new Date()) {
        return accessToken;
    }

    const params = new URLSearchParams();
    params.append('client_id', 'client_app');
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const res: IdentityServerResponse = await axios({
        method: 'post',
        url: authUrl,
        data: params,
    });

    tokenExpiration = new Date();
    tokenExpiration.setSeconds(tokenExpiration.getSeconds() + res.token_expiry);

    await SecureStore.setItemAsync('refreshToken', res.refresh_token);
    await SecureStore.setItemAsync('accessToken', res.access_token);
    await SecureStore.setItemAsync('accessTokenExpiration', tokenExpiration.toDateString());

    return res.access_token;
}

export const useAxios = <TResponse, TRequest>(requestType: RequestType, path: string, req: TRequest) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse[] | null>(null);
    const [response, setRespone] = useState<TResponse>();
    const [requestSuccessful, setRequestSuccessful] = useState<boolean | undefined>(undefined);

    const run = async (req?: TRequest, token?: string) => {
        setIsLoading(true);
        setError(null);
        setRequestSuccessful(undefined);

        let success = false;

        const url = requestType === RequestType.Command ? commandUrl(path) : queryUrl(path);
        console.log(path);

        try {
            console.log(req);
            const res = await axios<TResponse>({
                method: 'post',
                url: url,
                data: req,
                headers: token !== undefined
                    ?
                    {
                        Authorization: `Bearer ${token}`
                    }
                    : undefined,
            });
            setRespone(res.data);
            setRequestSuccessful(true);
            success = true;
        } catch (responseErr: any) {
            console.log(responseErr);
            setError(responseErr.response.data);
        }

        setIsLoading(false);
        return success;
    }

    return { response, isLoading, error, run, requestSuccessful };
}

export const request = async <TResponse, TRequest>(
    requestType: RequestType,
    path: string,
    req?: TRequest): Promise<TResponse> => {
    const url = requestType === RequestType.Command ? commandUrl(path) : queryUrl(path);

    const res = await axios<TResponse>({
        method: 'post',
        url: url,
        data: req,
    });

    return res.data;
}