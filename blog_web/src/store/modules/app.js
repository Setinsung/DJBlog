export default {
  namespaced: true,
  state: {
    footerFixed: false,
  },
  mutations: {
    setFooterFixed(state, fixed) {
      state.footerFixed = fixed;
    },
  },
};