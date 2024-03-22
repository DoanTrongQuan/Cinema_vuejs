<template>
    <div>
        <div>
            <Navbar/>
        </div>
        <div class="container" style="width: 79%;">
            <div>
                <vs-dialog 
                v-model="isShowConfirmSelectSchedule "
                width="700px"  not-center>
                    <template #header>
                        <h4 style="margin-top: 20px;">BẠN ĐANG <b>ĐẶT VÉ</b> XEM PHIM</h4>
                    </template>

                    <div class="con-content" style="width: 100%;height: 180px">
                        <h1 class="text-center" 
                        style="border-bottom: 1px solid #f4f4f4;
                        color: #03599d;font-size: 33px;font-family: sans-serif;
                        font-weight: 600 !important;">{{ movieName }}</h1>
                        <v-table style="height: 100%;">
                            <thead style="height: 50%;">
                            <tr>
                                <th class="text-center"><h4>Rạp chiếu</h4></th>                                                   
                                <th class="text-center"><h4>Ngày chiếu</h4></th>                                                
                                <th class="text-center"><h4>Giờ chiếu</h4></th>                                                      
                            </tr>
                            </thead>
                            <tbody style="height: 100%;background-color: #eaeaea;margin-top: 15px;">
                            <tr>
                                <td class="text-center"><h3 style="font-weight: 700;font-size: 23px;">{{ nameOfCinema }}</h3></td>
                                <td class="text-center"><h3 style="font-weight: 700;font-size: 23px;">{{ dayMonthYearSelected }}</h3></td>
                                <td class="text-center"><h3 style="font-weight: 700;font-size: 23px;">{{ startTime }}</h3></td>
                            </tr>
                            </tbody>
                        </v-table>
                    </div>
                    <template #footer>
                        <div style="display: flex; justify-content: center !important;">
                        <vs-button 
                        style="font-size: 20px !important;
                        font-weight: 500 !important;
                        font-family: sans-serif;"
                        type="transparent" @click="showPageSelectSeat"> ĐỒNG Ý </vs-button>
                        </div>
                    </template>
                </vs-dialog>
            </div>
            <h3 style="font-size: 23px;
            line-height: 1.5em;
            font-weight: 600;
            font-family: sans-serif;
            margin-top: 20px;
            margin-bottom: 20px;
            ">Trang chủ > 
            <span>{{ movieDetail.movieName }}</span> <button @click="check">check</button></h3>
            <div class="row" style="width: 100%;">
                <div class="col-md-3 image">
                    <img class="movieImage" style="border-radius: 20px;" :src="movieDetail.movieImage" alt="">
                </div>
                <div class="col-md-9 infoMovie" style="">
                    <h1
                    style="margin-bottom: 15px;font-weight: 700;
                    line-height: 1.5em;font-family: sans-serif;font-size: 33px;color: #337ab7;"
                    >{{ movieDetail.movieName }}</h1>
                    <p style="font-family: SourceSansPro !important;
                    margin-bottom: 15px; font-size: 18px;">{{ movieDetail.movieDescription }}</p>
                    <div class="row" style="margin-bottom: 15px;">
                        <div class="col-3 title-info" style="font-weight: 700;font-size: 15px;font-family:Verdana, Geneva, Tahoma, sans-serif; display: flex;align-items: center;">
                            <p>ĐẠO DIỄN:</p>
                        </div>
                        <div class="col-9 content-info" style="font-size: 18px;">
                            <p>{{ movieDetail.movieDirector }}</p>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 10px;align-items: center;">
                        <div class="col-3 title-info" style="font-weight: 700;font-size: 15px;font-family:Verdana, Geneva, Tahoma, sans-serif">
                            <p>THỂ LOẠI:</p>
                        </div>
                        <div class="col-9 content-info">
                            <p>{{ movieDetail.movieTypeName }}</p>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 10px;">
                        <div class="col-3 title-info" style="font-weight: 700;font-size: 15px;font-family:Verdana, Geneva, Tahoma, sans-serif">
                            <p>THỜI LƯỢNG:</p>
                        </div>
                        <div class="col-9 content-info">
                            <p>{{ movieDetail.movieDuration }} <span> phút</span></p>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 10px;">
                        <div class="col-3 title-info" style="font-weight: 700;font-size: 15px;font-family:Verdana, Geneva, Tahoma, sans-serif">
                            <p>NGÔN NGỮ:</p>
                        </div>
                        <div class="col-9 content-info">
                            <p>{{ movieDetail.movieLanguage }}</p>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 10px;">
                        <div class="col-3 title-info" style="font-weight: 700;font-size: 15px;font-family:Verdana, Geneva, Tahoma, sans-serif">
                            <p>NGÀY KHỞI CHIẾU:</p>
                        </div>
                        <div class="col-9 content-info">
                            <p>{{ movieDetail.moviePremiereDate }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 15px;">
                <v-card>
                    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
                        <v-tab v-for="(formattedschedule, i) in formattedSchedule" :key="i" :value="i+1">
                            <h5 class="title">
                                <span class="first-two-characters">{{ formattedschedule.substring(0, 2) }}</span>
                                {{ formattedschedule.substring(2) }}
                            </h5>
                        </v-tab>

                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item  v-for ="(schedules,n) in schedulesInDay" :key="n" :value ="n+1">
                            <v-container>
                                <div class="row">
                                    <div class="col-md-2 col-sm-3 col-4" v-for ="(schedule,i) in schedules" :key="i">
                                        <div @click ="showConfirmSelectSchedule(n, schedule.startTime,schedule.nameRoom,schedule.roomId )" style="width: 100%;height:30px;
                                        background-color: #E5E5E5;color: #333333;
                                        font-size: 14px;padding: 5px 14px;display: flex; 
                                        align-items: center;justify-content: center;">
                                            {{ schedule.startTime }}
                                        </div>
                                        <p style="font-size: 12px;padding-top: 5px;
                                        font-family: sans-serif;font-weight: 600;display: flex;
                                        justify-content: center;">
                                        {{ schedule.capacity }} ghế trống</p>
                                    </div>
                                </div>
                            </v-container>
                        </v-window-item>
                    </v-window>
                </v-card>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  </template>
  
<script setup>
import { ref,computed } from 'vue';
import { useStore } from 'vuex';
import {useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
const store = useStore();
const router = useRouter();
const route = useRoute();


const tab = ref(null)

const currentUser = computed(() => {
   return store.state.auth.user;
})
const movieDetail = computed(() => {
    return store.state.movie.movieDetail;
});

const schedulesInDay = computed(() => {
    return store.state.schedule.schedulesInDay;
})
const dayMonthOfSchedule  = computed(() => {
    return store.state.schedule.dayMonthYearOfScheduleByMovie;
})
const movieName = computed(() => {
    return store.state.movie.movieDetail.movieName;
})
const nameOfCinema = computed(() => {
    return store.state.cinema.nameOfCinema;
})
const formattedSchedule = computed(() => {
    const formatted = [];
    
    for (const date of Object.values(dayMonthOfSchedule.value)) {
        const [day, month, year] = date.split('-').map(Number);
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')} - ${getDayOfWeek(new Date(year, month - 1, day))}`;
        formatted.push(formattedDate);
    }
    return formatted;
})

function getDayOfWeek(date) {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return days[date.getDay()];
}

  const check = () => {
    console.log(currentUser.value);
  }

const isShowConfirmSelectSchedule = ref(false)
const dayMonthYearSelected = ref('');
const startTime = ref('')

const showConfirmSelectSchedule = (index,time,nameRoom,roomId) => {
    const selectedValue = dayMonthOfSchedule.value[index];
    dayMonthYearSelected.value = selectedValue;
    startTime.value = time;
    // console.log(roomId)
    store.dispatch('schedule/getRoomBySchedule',{ nameRoom, roomId })
    // store.dispatch('seat/getAllSeatByRoom',roomId)
    isShowConfirmSelectSchedule.value = true;
}


const showPageSelectSeat =()=> {
    if(!currentUser.value){
        router.push('/login')
    }else{
        const seatSelected = []
        sessionStorage.setItem('dayMonthYearSelected', JSON.stringify(dayMonthYearSelected.value)); 
        sessionStorage.setItem('startTime', JSON.stringify(startTime.value));
        sessionStorage.setItem('seatSelected', JSON.stringify(seatSelected));  
        router.push('/chon-ghe')
    }
     
}
onBeforeRouteLeave ((to, from, next) => {
    if (to.path !== '/chon-ghe') {
        sessionStorage.removeItem('movieDetail');
        sessionStorage.removeItem('dayMonthYearOfScheduleByMovie');
        sessionStorage.removeItem('schedulesInDay');
        sessionStorage.removeItem('roomId');
        sessionStorage.removeItem('seats');
    }
    next();
})


</script>
  
<style scoped>


.title-info{
    padding-bottom: 5px;
    padding-top: 5px;
}
.content-info{
    padding-bottom: 5px;
    padding-top: 5px;
}
@media only screen and (min-width: 1300px) {
    .movieImage {
        width: 257.5px;
        height:407.49px
    }
    /* .schedule{
        width: 113px ;
        margin-left: 25px;
        padding: 0 !important;
    } */
}
@media only screen and (min-width: 992px) and (max-width:1300px) {
    .movieImage {
        width: 207.5px;
        height:328.49px
    }
    .container {
        width: 85% !important;
    }
}
@media only screen and (min-width: 800px) and (max-width: 992px){
    .movieImage {
        width: 170.5px;
        height:241.33px
    }
    .title-info p {
        font-size: 12px !important;
    }
    .container{
        width: 90% !important;
    }
}
@media only screen and (min-width: 650px) and (max-width: 800px){
    .movieImage {
        width: 152.5px;
        height:241.33px
    }
    .container{
        width: 93% !important;
    }
}
@media only screen and (max-width: 650px){
    .movieImage {
        width: 100%;
        height:100%
    }
    .title-info p {
        font-size: 10px !important;
    } 
    .container {
        width: 95% !important;
    }
}
@media only screen and (max-width: 768px){
    .infoMovie{
        padding-left: 0 !important;
    }
    .image{
        padding-left: 0 !important;
    }
    .tab{
        padding-left: 0 !important;
    }
}
.first-two-characters {
    font-size: 38px; /* Ví dụ: cỡ chữ to lên */
    color: red;
    /* Thêm các thuộc tính CSS khác tùy thuộc vào yêu cầu của bạn */
}
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}

.con-form {
  width: 100%;
}

.con-form .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.con-form .flex a {
  font-size: 0.8rem;
  opacity: 0.7;
}

.con-form .flex a:hover {
  opacity: 1;
}

.con-form .vs-checkbox__label {
  font-size: 0.8rem;
}

.con-form .vs-input {
  margin: 10px 0px;
  width: calc(100%);
}

.con-form .vs-input .vs-input__original {
  width: 100%;
}

.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: calc(100%);
}

.con-footer .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}

.con-footer .new a {
  color: rgba(var(--vs-primary));
  margin-left: 6px;
}

.con-footer .new a:hover {
  text-decoration: underline;
}

.con-footer .vs-button {
  margin: 0px;
}
.text-center h4 {
    font-size: 17px;
    font-family: sans-serif;
    font-weight: 400 !important;
}
</style>
  