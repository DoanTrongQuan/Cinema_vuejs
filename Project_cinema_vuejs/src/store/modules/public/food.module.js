import FoodService from "@/service/user/food.service.js"


const foodsFromSessionStorage = JSON.parse(sessionStorage.getItem('foods'));

export const food = {
  namespaced: true,
  state: {
    foods:foodsFromSessionStorage || []
  },

  actions: {
   async getAllFood({commit}){
        try {
            const res = await FoodService.getAllFood();
            sessionStorage.setItem('foods', JSON.stringify(res.data));
            commit('save_foods',res.data)
        } catch (error) {
            throw error
        }
    }
  },
  mutations: {
    save_foods(state,foods){
        state.foods = foods;
    }
  }
};