import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";

class AuthService {
  login(user) {
    return ApiService.post("user/login",
      {
        user_name: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          JwtService.saveToken(response.data.token);
        }
        return response.data.token;
      });
  }

  logout() {
    JwtService.destroyToken();
  }
}

export default new AuthService();
