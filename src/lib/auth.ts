const ADMIN_CREDENTIALS = {
  username: 'admin_cccp',
  password: 'stalin1924'
};

export const login = (username: string, password: string): boolean => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    sessionStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  sessionStorage.removeItem('isAdmin');
};

export const isAuthenticated = (): boolean => {
  return sessionStorage.getItem('isAdmin') === 'true';
};
