import BillService from "@/service/user/bill.service.js"

const billFromSessionStorage =  JSON.parse(sessionStorage.getItem('bill'));


export const bill = {
  namespaced: true,
  state: {
    bill: billFromSessionStorage || {},
  },

  actions: {

  },
  mutations: {

  }
};