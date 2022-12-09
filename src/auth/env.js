import axios from 'axios'

// localStorage key - default = user
export const LOCAL_STORAGE_KEY = 'user'

// axios
export const AXIOS = axios

// login url django oAuth2
export const LOGIN_URL = 'http://127.0.0.1:5000/auth/token/'


// Get user information from django api
export const GET_USER_INFO_URL = 'http://127.0.0.1:5000/api/v1/user-info/'


// client_id and client_secret oAth2 application
export const CLIENT_ID = 'DUZKGCCqu8y74WiM5OWm6Ve33pwKuVwXNFXdwv3Q'
export const CLIENT_SECRET = 'iA5p0IFB7tt2igmGGhFgUG47htPQbaEDIwOsZIKrc6TV91nC0dh3gHRTHt2BkhO46NgZ8WFwn7HZ5gT1guCUdu6x0immit9XeR1flV5jThxTnoyJsAf3KZ6t13rltoYc'