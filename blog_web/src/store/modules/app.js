import { getHome } from '@/api/home';

export default {
  namespaced: true,
  state: {
    footerFixed: false,
    homeConfig: null
  },
  actions: {
    async fetchConfigs({ commit }) {
      const res = await getHome();
      console.log('store/res', res);
      commit('setConfig', res.data);
    }
  },
  mutations: {
    setFooterFixed(state, fixed) {
      state.footerFixed = fixed;
    },
    setConfig(state, config) {
      state.homeConfig = config;
    },
  },
};