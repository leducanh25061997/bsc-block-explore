import axios from 'axios';
import qs from 'qs';
import { API_URL } from '@/constants/common';

const axiosConfig = {
  baseURL: API_URL,
  timeout: 120000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
};

export const request = axios.create(axiosConfig);

request.interceptors.request.use(
  function (config) {
    // const accessToken = CookieStorage.getAccessToken();

    // if (accessToken) {
    //   config.headers['mToken'] = accessToken;
    // }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (errorResponse) {
    
    // console.log(errorResponse, 'errorResponse')
    const { error, errors, msg } = errorResponse?.response?.data || {};
    // const message = ErrorApi?.[error || errors?.[0]?.msg || msg] || error || errors?.[0]?.msg || msg;

    // toast('error', message, 'api-error');
    // return errorResponse?.response;
    if (errorResponse?.response?.status === 404 && errorResponse?.response?.data?.message === 'jwt expired') {
      
      // setUserInfo({
      //   isLogged: false,
      // });
      // CookieStorage.clearSession();
      window.location.href = '/';
    }
    if (errorResponse?.response?.status === 401) {
      // CookieStorage.clearSession();
      // window.location.href = '/login';
    }

    return Promise.reject(errorResponse?.response?.data);
  }
);