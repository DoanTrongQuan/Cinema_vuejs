import PromotionService from "@/service/user/promotion.service.js"
import { useStore } from 'vuex'

const store = useStore();
let promotionFromSessionStorage = JSON.parse(sessionStorage.getItem('promotions'));

export const promotion = {
  namespaced: true,
  state: {
    promotions:promotionFromSessionStorage || [],
    amountDiscounted:0,
    totalAmount:0
  },
  actions: {
    async getAllPromotion ({commit},email){
      try {
        const res = await PromotionService.getAllPromotion(email);
        sessionStorage.setItem('promotions', JSON.stringify(res.data));
        commit('set_promotion',res.data)
      } catch (error) {
        if(error.response.status === 404){
          sessionStorage.setItem('promotions', JSON.stringify([]));
          commit('init_promotions')
        }
      }
    },
    async getDiscountAmount ({commit},totalMoneyAndCode){
      try {
        const { voucher, total} = totalMoneyAndCode;
        const res =  await PromotionService.getDiscountAmount(voucher,total);
        commit('set_amount_discounted', res.data)
      } catch (error) {
        if(error.response.status === 406){
          alert(error.response.data)
        }else if (error.response.status === 404){
          alert(error.response.data)
        }
      }
    }
  },
  mutations: {
    set_promotion(state,promotion){
      state.promotions = promotion;
    },
    init_promotions(state){
      state.promotions = []
    },
    set_amount_discounted(state,discounted){
      state.amountDiscounted = discounted;
      // console.log(state.amountDiscounted)
    }
  }
};