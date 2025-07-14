export const HOST=import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

export const AUTH_ROUTES='/api/auth';
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`;
export const PROFILE_ROUTE=`${AUTH_ROUTES}/profile`;
export const LOGOUT_ROUTE=`${AUTH_ROUTES}/logout`;
export const USER_PROFILE_ROUTE=`${AUTH_ROUTES}/user-profile`;
export const GET_USER_INFO=`${AUTH_ROUTES}/userInfo`;
export const UPDATE_PROFILE_ROUTE =`${AUTH_ROUTES}/update-profile`;

export const ADD_IMAGE_PROFILE_ROUTE =`${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_IMAGE_PROFILE_ROUTE =`${AUTH_ROUTES}/remove-profile-image`;