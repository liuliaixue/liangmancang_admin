export const server = $server;

export const userProfile = {
  url: '/api/profile',
  method: 'GET'
};

export const userLogout = {
  url: '/api/logout',
  method: 'POST'
};

export const userLogin = {
  url: '/api/login',
  method: 'POST'
};

export const userRegister = {
  url: '/api/register',
  method: 'POST'
};

export const adminLogin = {
  url: `${server}/api/auth/adminlogin`,
  method: 'post'
};
