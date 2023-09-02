import { toast } from 'react-toastify';
import { redirect, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export { useFetch };

function useFetch() {

    const navigate = redirect

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE'),
        download: downloadRequest, 
    };

    async function downloadRequest(url: string, filename: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: authHeader(url),
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        const blob = await response.blob();

        const file = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = file;
        a.download = filename;
        a.click();

        window.URL.revokeObjectURL(url);
    }
    function request(method: string) {
        return (url: string, body?: any) => {
            const requestOptions: RequestInit = {
                method,
                headers: authHeader(url)
            };
            if (body) {
                requestOptions.headers = {
                    ...requestOptions.headers,
                    'Content-Type': 'application/json'
                };
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(url, requestOptions).then(handleResponse);
        }
    }
    

    // helper functions

    function authHeader(url: string) {
        const auth = localStorage.getItem('token')!;
        // return auth header with jwt if user is logged in and request is to the api url
        const token = auth ? auth : null;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith('/api') || url.startsWith('/auth');
        const authHeader = { Authorization: `Bearer ${token}` }
        if (isLoggedIn && isApiUrl) {
            return authHeader;
        } else {
            return {};
        }
    }

    function handleResponse(response: Response) {
        const auth = localStorage.getItem('token')!;
        if (response.headers.get('Content-Type')?.startsWith('text/csv')) {
            return response.text()
        }
        return response.text().then(text => {
            const data = text && JSON.parse(text);

            if (!response.ok) {
                console.log([401, 403].includes(response.status) && auth);

                if ([422].includes(response.status)) {
                    const errors: [] = data.message
                    errors.forEach(e => toast.error(e))
                    return {status: response.status, errors}
                }

                if ([401, 403].includes(response.status) && auth) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/auth/login');
                }

                const error = (data && data.message) || response.statusText;
                console.log(error);

                // alertActions.error(error);
                return Promise.reject(data);
            }

            return data;
        });
    }
}