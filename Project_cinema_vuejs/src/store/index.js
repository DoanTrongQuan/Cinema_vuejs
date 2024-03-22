import { createStore } from 'vuex'
import { auth } from "./modules/public/auth.module.js";
import { movie, schedule, cinema,seat } from "./modules/public/public.module.js"
import {food} from "./modules/public/food.module.js"
import { promotion } from "./modules/public/promotion.module.js";
import { bill } from "./modules/public/bill.module.js";
export default createStore({
  modules: {
    auth,
    movie,
    schedule,
    cinema,
    seat,
    food,
    promotion,
    bill
  }
})
