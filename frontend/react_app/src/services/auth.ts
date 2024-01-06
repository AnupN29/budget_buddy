
export const checkLoginStatus = (): boolean => {
    const accessToken = localStorage.getItem('accessToken');
  
    return !!accessToken;
};
  