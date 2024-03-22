import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:8089/api/v1/cinema/';
const API_URL_MOVIE = 'http://localhost:8089/api/v1/movie/';
const API_URL_SCHEDULE = 'http://localhost:8089/api/v1/schedule/';
const API_URL_SEAT = 'http://localhost:8089/api/v1/seat/';

class PublicService {

  getAllCinemaByAddress() {
    return axios.get(API_URL + 'get-cinema-by-address')
  }
  getAllCinemaByAddress(address) {
    return axios.get(API_URL + 'get-cinema-by-address?address='+ address)
  }
  getAllMovieByCinema(nameOfCinema){
    return axios.get(API_URL_MOVIE + 'top-movies?nameOfCinema=' + nameOfCinema)
  }
  getAllDayMonthYearOfScheduleByMovie(movieId){
    return axios.get(API_URL_SCHEDULE + 'get-schedule-by-movie?movieId=' + movieId)
  }
  getAllScheduleInDay(movieId, startDate){
    return axios.get(API_URL_SCHEDULE + 'get-schedule-by-day-and-movie?movieId='+ movieId + '&startDate=' + startDate)
  }
  getAllSeatByRoom(roomId){
    return axios.get(API_URL_SEAT + 'get-all-seat-by-room?roomId=' + roomId)
  }
  setSeatStatus(dayMonthYear,start,movieId,room,seatStatus,seatId,email){
    return axios.put(API_URL_SEAT + 'update-seat-status', null, {
      params: { dayMonthYear: dayMonthYear,
                startTime: start,
                movieId: movieId,
                roomId: room,
                seatStatus: seatStatus,
                seatId: seatId,
                email:email
         },
      headers: authHeader()
    } )   
  }
  resetSeats(dayMonthYear,start,movieId,room){
    return axios.put(API_URL_SEAT + 'reset-seat-status',null, {
      params: {
        dayMonthYear: dayMonthYear,
        startTime: start,
        movieId: movieId,
        roomId: room,
      },
      headers: authHeader()
    })
  }
  getPriceBySchedule(start, dayMonthYear, movieId){
    return axios.get(API_URL_SCHEDULE + 'get-price-by-schedule?startTime='
     + start + '&startDate=' + dayMonthYear + '&movieId=' + movieId,{ headers:authHeader() });
  }
}

export default  new PublicService();