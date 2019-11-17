// export const server = `http://localhost:4040`;
export const server = `http://101.132.64.25:60000`;

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
