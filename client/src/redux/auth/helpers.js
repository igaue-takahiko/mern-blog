import jwtDecode from 'jwt-decode';

export const verifyToken = (token) => {
  const decodeToken = jwtDecode(token)
  const expiresIn = new Date(decodeToken.exp * 1000)
  if (new Date() > expiresIn) {
    localStorage.removeItem('myToken')
    return null
  } else {
    return decodeToken
  }
}
