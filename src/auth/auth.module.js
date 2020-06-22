import AuthService from '@/auth/auth.service';

const token = JSON.parse(localStorage.getItem('token'));
const initialState = token
  ? {token}
  : {token: null};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        token => {
          console.log("auth.module1-token: "+ token)
          commit('loginSuccess', token);
          return Promise.resolve(token);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, token) {
      state.token = token;
    },
    loginFailure(state) {
      state.token = null;
    },
    logout(state) {
      state.token = null;
    },
    registerSuccess(state) {
      state.token = null;
    },
    registerFailure(state) {
      state.token = null;
    }
  }
};
