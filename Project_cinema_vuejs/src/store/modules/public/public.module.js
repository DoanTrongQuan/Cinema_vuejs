 import PublicService from '@/service/public.service.js';

 const movieDetailFromSessionStorage = JSON.parse(sessionStorage.getItem('movieDetail'));
 export const movie = {
  namespaced: true,
  state: {
    movieDetail: movieDetailFromSessionStorage || {},
    movies: []
  },

  actions: {
    async getAllMovieByCinema({ commit }, nameOfCinema) {
      try {
        const response = await PublicService.getAllMovieByCinema(nameOfCinema);
        commit('SET_MOVIES', response.data);
        return response.data;
      } catch (error) {
        commit('getMoviesFail');
        throw error;
      }
    },
   async getMovieDetail({ commit }, movie){
      try {
        // Kiểm tra xem liệu dữ liệu đã được lưu trong session storage chưa
        const movieDetail = sessionStorage.getItem('movieDetail');
        if (movieDetail) {
          // Nếu có, sử dụng dữ liệu từ session storage
          const parsedMovieDetail = JSON.parse(movieDetail);
          commit('set_movieDetail', parsedMovieDetail);
          return parsedMovieDetail;
        } else {
          // Nếu không, gọi API để lấy dữ liệu mới
          // const response = await PublicService.getMovieDetail(movie);
          // const movieDetail = response.data;
          // Lưu dữ liệu vào sessionStorage
          sessionStorage.setItem('movieDetail', JSON.stringify(movie));
          commit('set_movieDetail', movie);
          return movie;
        }
      } catch (error) {
        throw error;
      }
    }
    
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    set_movieDetail(state, movie) {
      state.movieDetail = movie;
    }
  }
};

const dayMonthYearOfScheduleByMovieFromSessionStorage = JSON.parse(sessionStorage.getItem('dayMonthYearOfScheduleByMovie'));
const scheduleInDayFromSessionStorage = JSON.parse(sessionStorage.getItem('schedulesInDay'));
const nameRoomFromSessionStorage = JSON.parse(sessionStorage.getItem('nameRoomBySchedule'));
const roomIdFromSessionStorage = JSON.parse(sessionStorage.getItem('roomId'))
const priceByScheduleFromSessionStorage = JSON.parse(sessionStorage.getItem('priceBySchedule'))

export const schedule = {
  namespaced: true,
  state: {
    dayMonthYearOfScheduleByMovie: dayMonthYearOfScheduleByMovieFromSessionStorage || [],
    schedulesInDay:scheduleInDayFromSessionStorage || [],
    nameRoomBySchedule:nameRoomFromSessionStorage || '',
    roomId:roomIdFromSessionStorage || '',
    priceBySchedule:priceByScheduleFromSessionStorage || ''
  },
  actions:{
    async getAllDayMonthYearOfScheduleByMovie({commit}, movieId){
      try {
        const res = await PublicService.getAllDayMonthYearOfScheduleByMovie(movieId);

        //lưu allDayMonthYearOfScheduleByMovie vào sessionStorage 
        sessionStorage.setItem('dayMonthYearOfScheduleByMovie', JSON.stringify(res.data));
        commit('set_dayMonthYearOfSchedule', res.data)

        const schedulesInDay = []
            // Duyệt qua mỗi phần tử trong mảng res.data
        for (const startDate of res.data) {
          // Gọi API để lấy dữ liệu cho mỗi phần tử
          const resSchedulesInDay = await PublicService.getAllScheduleInDay(movieId, startDate);

          schedulesInDay.push(resSchedulesInDay.data);

        }
        sessionStorage.setItem('schedulesInDay', JSON.stringify(schedulesInDay)); 
        commit('set_schedulesInDay',schedulesInDay); 

      } catch (error) {
        commit('getDayMonthYearOfScheduleFail');
        throw error;
      }
    },

    getRoomBySchedule({commit},namRoomAndId){
      const { nameRoom, roomId } = namRoomAndId;

      // console.log(roomId) 
      sessionStorage.setItem('roomId', JSON.stringify(roomId));
      
      commit('set_roomIdBySchedule',roomId) 
      sessionStorage.setItem('nameRoomBySchedule', JSON.stringify(nameRoom));
      commit('set_nameRoomBySchedule',nameRoom);
    },

    async getPriceBySchedule({commit},scheduleInfo){
      try {
        const { start, dayMonthYear, movieId } = scheduleInfo;
        const res = await PublicService.getPriceBySchedule(start, dayMonthYear, movieId);
        sessionStorage.setItem('priceBySchedule', JSON.stringify(res.data));
        commit('set_priceBySchedule',res.data)

      } catch (error) {
        throw error;
      }
    }
    
  },
  mutations: {
    set_dayMonthYearOfSchedule(state, dayMonthOfSchedule){
      state.dayMonthYearOfScheduleByMovie = dayMonthOfSchedule
      // console.log('day of month:' + state.dayMonthYearOfScheduleByMovie)
    },
    set_schedulesInDay(state, schedulesInDay){
      state.schedulesInDay = schedulesInDay;
      // console.log(state.schedulesInDay)
    },
    set_nameRoomBySchedule(state, nameRoom){
      state.nameRoomBySchedule = nameRoom;
    },
    set_roomIdBySchedule(state,roomId){
      state.roomId = roomId;
      // console.log(state.roomId)
    },
    set_priceBySchedule(state,price){
      state.priceBySchedule = price;
    }
  }
};

const nameOfCinemaFromSessionStorage = JSON.parse(sessionStorage.getItem('nameOfCinema'));
export const cinema = {
  namespaced: true,
  state: {
    nameOfCinema:nameOfCinemaFromSessionStorage || ''
  },
  actions:{
    changeNameOfCinema({commit},nameOfCinemaNew){
      if (!nameOfCinemaNew) {
        nameOfCinemaNew = 'Beta Mỹ Đình'; // Gán giá trị mặc định
      }
      sessionStorage.setItem('nameOfCinema', JSON.stringify(nameOfCinemaNew)); 
      commit('set_nameOfCinema',nameOfCinemaNew)
    }
  },
  mutations: {
    set_nameOfCinema(state,nameOfCinemaNew){
      state.nameOfCinema = nameOfCinemaNew;
    }
  }
};


const seatsFromSessionStorage = JSON.parse(sessionStorage.getItem('seats'));
const seatSelectedFromSessionStorage = JSON.parse(sessionStorage.getItem('seatSelected'));
let totalMoneyFromSessionStorage = JSON.parse(sessionStorage.getItem('totalMoney'));

let seatTypeNormalFromSession = JSON.parse(sessionStorage.getItem('seatTypeNormal'));
let seatTypeVipFromSession = JSON.parse(sessionStorage.getItem('seatTypeVip'));
let seatTypeDoubleFromSession = JSON.parse(sessionStorage.getItem('seatTypeDouble'));

let priceSeatNormalFromSession = JSON.parse(sessionStorage.getItem('priceSeatNormal'));
let priceSeatVipFromSession = JSON.parse(sessionStorage.getItem('priceSeatVip'));
let priceSeatDoubleFromSession = JSON.parse(sessionStorage.getItem('priceSeatDouble'));

// let quantitySeatNormalSelectedFromSession = JSON.parse(sessionStorage.getItem('quantitySeatNormalSelected'));
// let quantitySeatVipSelectedFromSession = JSON.parse(sessionStorage.getItem('quantitySeatVipSelected'));
// let quantitySeatDoubleSelectedFromSession = JSON.parse(sessionStorage.getItem('quantitySeatDoubleSelected'));


export const seat = {
  namespaced: true,
  state: {
    seats:seatsFromSessionStorage || [],
    seatSelected:seatSelectedFromSessionStorage || [],
    totalMoney:totalMoneyFromSessionStorage || 0,

    priceSeatNormal:priceSeatNormalFromSession || 0,
    priceSeatVip:priceSeatVipFromSession || 0,
    priceSeatDouble:priceSeatDoubleFromSession || 0,

    seatTypeNormal:seatTypeNormalFromSession || '',
    seatTypeVip:seatTypeVipFromSession || '',
    seatTypeDouble:seatTypeDoubleFromSession || '',

    quantitySeatNormalSelected:0,
    quantitySeatVipSelected:0,
    quantitySeatDoubleSelected:0,
  },
  actions:{
   async getAllSeatByRoom({commit},roomId){
      try {
        const res = await PublicService.getAllSeatByRoom(roomId);
        sessionStorage.setItem('seats', JSON.stringify(res.data));
        commit('get_all_seat_by_room',res.data) 
      } catch (error) {
        throw error;
      }
    },
    async changeSeatStatus({commit}, newSeatStatus){
      try {
        const { dayMonthYear,start,movieId,room,seatStatus,seatId,email} = newSeatStatus;
        const res = await PublicService.setSeatStatus(dayMonthYear,start,movieId,room,seatStatus,seatId,email);
        //xóa seats cũ
        // sessionStorage.removeItem('seats');
        // sessionStorage.setItem('seats', JSON.stringify(res.data));
        // commit('set_seatStatus',res.data)
      } catch (error) {
        throw error;
      }
    },
    async resetSeats({commit},resetSeat){
      try {
        const { dayMonthYear,start,movieId,room } = resetSeat;
        const res = await PublicService.resetSeats(dayMonthYear,start,movieId,room);
        sessionStorage.setItem('seats', JSON.stringify(res.data));
        commit('reset_all_seat',res.data)
      } catch (error) {
        throw error
      }
    },
    saveSeatSelected({ commit }, seatSelected) {
      const { seatLine, seatNumber, seatStatusCurren } = seatSelected;
      let currentSelection = sessionStorage.getItem('seatSelected');
      let seatSelectionArray = [];
    
      // Kiểm tra xem có giá trị trong sessionStorage hay không
      if (currentSelection) {
        // Chuyển đổi giá trị từ chuỗi JSON thành mảng
        seatSelectionArray = JSON.parse(currentSelection);
      }
      if (seatStatusCurren === 1) {
        // Thêm chuỗi mới vào mảng
        seatSelectionArray.push(seatLine + seatNumber);
      } else if (seatStatusCurren === 2) {
        // Tìm vị trí của seatLine + seatNumber trong mảng và xóa nó
        const indexToRemove = seatSelectionArray.indexOf(seatLine + seatNumber);
        if (indexToRemove !== -1) {
          seatSelectionArray.splice(indexToRemove, 1);
        }
      }
    
      // Lưu mảng đã được cập nhật vào sessionStorage
      sessionStorage.setItem('seatSelected', JSON.stringify(seatSelectionArray));
    
      // Gửi giá trị đã được cập nhật cho mutation
      commit('set_seatSelected', seatSelectionArray);
    },

    resetSeatsSelected({commit}){
      sessionStorage.removeItem('seatSelected')
      commit('reset_seatSelected')
    },
    saveTotalMoney({commit},total){
      sessionStorage.setItem('totalMoney', JSON.stringify(total));
      commit('save_TotalMoney',total)
    },
    plusTotalMoney({commit},price){
      commit('plus_TotalMoney',price)
    },
    minusTotalMoney({commit},price){
      commit('minus_TotalMoney',price)
    },
    resetTotalMoney({commit}){
      commit('reset_total_money')
    },
    plusPriceSeatNormal({commit},newValue){
      const priceSeatNormalNew = JSON.parse(sessionStorage.getItem('priceSeatNormal'));

      sessionStorage.setItem('priceSeatNormal', JSON.stringify(priceSeatNormalNew + newValue));
      commit('plus_price_seat_normal',newValue)
    },
    plusPriceSeatVip({commit},newValue){
      const priceSeatVipNew = JSON.parse(sessionStorage.getItem('priceSeatVip'));
      sessionStorage.setItem('priceSeatVip', JSON.stringify(priceSeatVipNew + newValue));
      commit('plus_price_seat_vip',newValue)
    },
    plusPriceSeatDouble({commit},newValue){
      const priceSeatDoubleNew = JSON.parse(sessionStorage.getItem('priceSeatDouble'));
      sessionStorage.setItem('priceSeatDouble', JSON.stringify(priceSeatDoubleNew + newValue));
      commit('plus_price_seat_double',newValue)
    },
    changeSeatTypeNormal({commit},newSeatType){
      sessionStorage.setItem('seatTypeNormal', JSON.stringify(newSeatType));
      commit('set_seat_type_normal',newSeatType)
    },
    changeSeatTypeVip({commit},newSeatType){
      sessionStorage.setItem('seatTypeVip', JSON.stringify(newSeatType));
      commit('set_seat_type_vip',newSeatType)
    },
    changeSeatTypeDouble({commit},newSeatType){
      sessionStorage.setItem('seatTypeDouble', JSON.stringify(newSeatType));
      commit('set_seat_type_double',newSeatType)
    },

    setQuantitySeatNormalSelected({commit}, newValue){
      // sessionStorage.setItem('quantitySeatNormalSelected', JSON.stringify(newValue));
      commit('set_quantity_seat_normal_selected',newValue)
    },
    setQuantitySeatVipSelected({commit}, newValue){
      // sessionStorage.setItem('quantitySeatVipSelected', JSON.stringify(newValue));
      commit('set_quantity_seat_vip_selected',newValue)
    },
    setQuantitySeatDoubleSelected({commit}, newValue){
      // sessionStorage.setItem('quantitySeatDoubleSelected', JSON.stringify(newValue));
      commit('set_quantity_seat_double_selected',newValue)
    },
  },

  mutations: {
    get_all_seat_by_room(state,seatsByRoom){
      state.seats = seatsByRoom;
      // console.log(state.seats)
    },
    set_seatStatus(state,newSeatStatus){
      state.seats = newSeatStatus;
    },
    reset_all_seat(state,newSeatStatus){
      state.seats = newSeatStatus;
    },
    set_seatSelected(state,lineAndNumber){
      state.seatSelected = lineAndNumber;
    },
    reset_seatSelected(state){
      state.seatSelected = []
    },
    save_TotalMoney(state,total){
      state.totalMoney = total;
    },
    plus_TotalMoney(state,price){
      state.totalMoney += price;

    },
    minus_TotalMoney(state,price){
      state.totalMoney -= price;
    },
    reset_total_money(state){
      state.totalMoney = 0;
    },
    plus_price_seat_normal(state,newPrice){
      state.priceSeatNormal += newPrice;
    },
    plus_price_seat_vip(state,newPrice){
      state.priceSeatVip += newPrice;
    },
    plus_price_seat_double(state,newPrice){
      state.priceSeatDouble += newPrice;
    },
    set_seat_type_normal(state,newSeatType){
      state.seatTypeNormal  = newSeatType;
    },
    set_seat_type_vip(state,newSeatType){
      state.seatTypeVip  = newSeatType;
    },
    set_seat_type_double(state,newSeatType){
      state.seatTypeDouble  = newSeatType;
    },
    set_quantity_seat_normal_selected(state, newValue){
      state.quantitySeatNormalSelected = newValue;
    },
    set_quantity_seat_vip_selected(state, newValue){
      state.quantitySeatVipSelected = newValue;
    },
    set_quantity_seat_double_selected(state, newValue){
      state.quantitySeatDoubleSelected = newValue;
    },
    reset_quantity_Seat_Selected(state) {
      state.quantitySeatNormalSelected = 0;
      state.quantitySeatVipSelected = 0;
      state.quantitySeatDoubleSelected = 0;
    }
  }
};