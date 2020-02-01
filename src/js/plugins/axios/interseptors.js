const firstTokenKey = "my_app_token";

function setToken(request) {
    const isAuthUrl = request.url.includes('auth')
    if(!isAuthUrl) {
        const token = localStorage.getItem(firstTokenKey);
        request.headers['x-access-token'] = token;
    }
    return request;
}

function setTokenOnLogin(response) {
  const isLoginUrl = response.config.url.includes("login");
  if (isLoginUrl) {
    const token = response.data.token;
    localStorage.setItem(firstTokenKey, token);
  }
  return response;
}

function getClearResponse(response) {
    return response.data;
}

// how to work with errors
function onError(err) {
    return Promise.reject(err);
}

export default function(axios) {
  // call interseptors
  axios.interseptors.request.use(setToken);
  axios.interseptors.response.use(setTokenOnLogin);
  axios.interseptors.response.use(getClearResponse, onError);
}
