import router from "@/router";
import request from "@/utils/request";

const state = {
  step: {
    payAccount: "123456"
  }
};
const actions = {
  async submitStepForm({ commit }, payload) {
    console.log("提交========", payload);
    await request({
      url: "/api/form",
      method: "POST",
      data: payload.payload
    });
    commit("saveStepFormData", payload);
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    console.log("保存state========", state.step, payload);
    state.step = {
      ...state.step,
      ...payload
    };
    console.log(state.step);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
