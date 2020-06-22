import JwtService from "@/common/jwt.service";

export default function authHeader() {
  let token = JwtService.getToken();

  if (token) {
    return {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Token ' + token 
    }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
