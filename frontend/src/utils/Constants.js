
const BASE_URL = 'http://localhost:3000';

module.exports = {
    GOOGLE_CLIENT_ID: '539473549977-hc40uqpc90em1smaqrk7l1nkde1ebaj2.apps.googleusercontent.com',
    BASE_URL,
    API_URL: `${BASE_URL}/api`,
    POST_URL: `${BASE_URL}/posts`,
    LOGIN_PATH: `${BASE_URL}/auth/login/federated/google`,
    REDIRECT_LOGIN_PATH: `${BASE_URL}/auth/oauth2/redirect/google`,
}