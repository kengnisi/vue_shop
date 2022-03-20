import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, logOut} from "@/network";
import { getToken, setToken, removeToken } from "@/utils/token";
export default {
  state: {
    code: "",
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    // 验证码
    GETCODE(state, code) {
      state.code = code;
    },
    // 获取token
    GETTOKEN(state, token) {
      setToken(token)
      state.token = token
    },
    // 获取用户信息
    USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 退出登录时移除用户信息
    REUSERIFON(state) {
      state.userInfo = {}
      state.token = ''
    }
  },
  actions: {
    // 获取验证码
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone);
      if (result.code == 200) {
        commit("GETCODE", result.data);
        return "OK";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 注册
    async userRegister({commit}, user) {
      let result = await reqRegister(user)
      if (result.code == 200) {
        return "OK"
      }else {
        return Promise.reject(new Error("faile"))
      }
    },
    // 登录获取用户信息
    async userLogin({commit}, data) {
      let result = await reqUserLogin(data)
      if (result.code == 200) {
        commit("GETTOKEN", result.data.token)
        return "OK"
      } else {
        return Promise.reject(new Error("faile"))
      }
    },
    // 通过token获取用户信息
     async userInfo({commit}) {
      let result = await reqUserInfo()
      if (result.code == 200) {
        commit("USERINFO", result.data)
        return "OK"
      } else {
        return Promise.reject(new Error("faile"))
      }
    },
    // 退出登录
    async logOut({commit}) {
      let result = await logOut()
      if(result.code == 200) {
        removeToken()
        commit("REUSERIFON")
      }else {
        return Promise(new Error("failed"))
      }
      
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo.loginName
    }
  },
};
