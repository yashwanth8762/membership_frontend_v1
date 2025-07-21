
/**
 * DEV DEPENDENCIES
 */
export const API_BASE_URL = "http://localhost:5000/";
export const BASE_URL = "/";
export const SOCKET_URL = "http://localhost:5000";
export const BASE_LINK = "/";
export const SOCKET_PATH = "/";
export const DEFAULT_IP_ADDRESS = "127.0.0.1";


//  export const API_BASE_URL = "http://10.6.4.42/api/";
//  export const BASE_URL = "/";
//  export const SOCKET_URL = "http://10.6.4.42/api";
//  export const BASE_LINK = "/";
//  export const SOCKET_PATH = "/";
//  export const DEFAULT_IP_ADDRESS = "127.0.0.1";

//   export const API_BASE_URL = "https://talukincharge.karnataka.gov.in/api/";
//  export const BASE_URL = "/";
//  export const SOCKET_URL = "https://talukincharge.karnataka.gov.in/api";
//  export const BASE_LINK = "/";
//  export const SOCKET_PATH = "/";
//  export const DEFAULT_IP_ADDRESS = "127.0.0.1";
//  login.js:91 Refused to connect to 'https://districtincharge.karnataka.gov.in/api/user/login' because it violates the following Content Security Policy directive: "default-src 'self'". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.
 
 /**
  * COMMON FOR BOTH DEV & PROD
  */
export const AUTHOR_NAME = "madaramahasabha";
// export const BRAND_NAME_EN = lables.brand.name.en;
// export const BRAND_NAME_KN = lables.brand.name.kn;
export const JWT_SECRET = "secret!19!Membership";
// export const FIRST_PAGE = 1;
// export const DEFAULT_PAGE_SIZE = 10;
export const LOGGER = process.env.NODE_ENV === 'development';
export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'

}