<script setup>
import { ref,computed, onBeforeUnmount,onMounted ,watchEffect} from 'vue';
import { useStore } from 'vuex';
import {useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
import moment from 'moment';
import eventBus from '../../eventBus.js';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import BillService from "@/service/user/bill.service.js"
import Payment from "@/service/user/payment.service.js"

const store = useStore();
const router = useRouter();
const route = useRoute();

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
const nameRoom = computed(() => {
    return store.state.schedule.nameRoomBySchedule;
})
const dayMonthYearSelected = computed(() => {
    return JSON.parse(sessionStorage.getItem('dayMonthYearSelected'));
})
const startTime = computed(()=> {
    return JSON.parse(sessionStorage.getItem('startTime'));
})
const seats = computed(()=>{
    return store.state.seat.seats;
})
const roomId = computed(()=> {
    return JSON.parse(sessionStorage.getItem('roomId'))
})


const note_seat_status = ref([
    {linkImage:'https://betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png',text:'Ghế trống'},
    {linkImage:'https://betacinemas.vn/Assets/global/img/booking/seat-select-normal.png',text:'Ghế đang chọn'},
    {linkImage:'https://betacinemas.vn/Assets/global/img/booking/seat-process-normal.png',text:'Ghế đang được giữ'},
    {linkImage:'https://betacinemas.vn/Assets/global/img/booking/seat-buy-normal.png',text:'Ghế đã bán'}
])

const search = ref('');
const search2 = ref('')

const foods = computed(()=>{
   return store.state.food.foods;
})



const headersFood = ref([
          { title: 'Combo', key: 'image', align: 'center', },
          { title: 'Tên Combo', align: 'center',key: 'foodName',sortable: false,class: 'bold-title',},  
          { title: 'Mô tả', key: 'description',align: 'center', },
          { title: 'Giá (VNĐ)', key: 'price',align: 'center', },
          { title: 'Số lượng', key: 'action',align: 'center', }  
      ])
const headersPromotion = ref([
          { title: 'Mã voucher', key: 'name', align: 'center', },
          { title: 'Mô tả voucher', align: 'center',key: 'description',sortable: false,class: 'bold-title',},  
          { title: 'Số lượng', key: 'quantity',align: 'center', },
          { title: 'Ngày hết hạn', key: 'endTime',align: 'center', },
      ])

// const seats = ref([
//     {seatLine:'A',seatNumber:'1',seatStatus:2,seatType:1},
//     {seatLine:'A',seatNumber:'2',seatStatus:2,seatType:1},
//     {seatLine:'A',seatNumber:'3',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'4',seatStatus:2,seatType:1},
//     {seatLine:'A',seatNumber:'5',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'6',seatStatus:2,seatType:1},
//     {seatLine:'A',seatNumber:'7',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'8',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'9',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'10',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'11',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'12',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'13',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'14',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'15',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'16',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'17',seatStatus:1,seatType:1},
//     {seatLine:'A',seatNumber:'18',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'1',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'2',seatStatus:2,seatType:1},
//     {seatLine:'B',seatNumber:'3',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'4',seatStatus:2,seatType:1},
//     {seatLine:'B',seatNumber:'5',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'6',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'7',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'8',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'9',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'10',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'11',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'12',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'13',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'14',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'15',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'16',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'17',seatStatus:1,seatType:1},
//     {seatLine:'B',seatNumber:'18',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'1',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'2',seatStatus:2,seatType:1},
//     {seatLine:'C',seatNumber:'3',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'4',seatStatus:2,seatType:1},
//     {seatLine:'C',seatNumber:'5',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'6',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'7',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'8',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'9',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'10',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'11',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'12',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'13',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'14',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'15',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'16',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'17',seatStatus:1,seatType:1},
//     {seatLine:'C',seatNumber:'18',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'1',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'2',seatStatus:2,seatType:1},
//     {seatLine:'D',seatNumber:'3',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'4',seatStatus:3,seatType:1},
//     {seatLine:'D',seatNumber:'5',seatStatus:4,seatType:1},
//     {seatLine:'D',seatNumber:'6',seatStatus:2,seatType:1},
//     {seatLine:'D',seatNumber:'7',seatStatus:4,seatType:1},
//     {seatLine:'D',seatNumber:'8',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'9',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'10',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'11',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'12',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'13',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'14',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'15',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'16',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'17',seatStatus:1,seatType:1},
//     {seatLine:'D',seatNumber:'18',seatStatus:1,seatType:1},
//     {seatLine:'E',seatNumber:'1',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'2',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'3',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'4',seatStatus:2,seatType:2},
//     {seatLine:'E',seatNumber:'5',seatStatus:4,seatType:2},
//     {seatLine:'E',seatNumber:'6',seatStatus:2,seatType:2},
//     {seatLine:'E',seatNumber:'7',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'8',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'9',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'10',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'11',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'12',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'13',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'14',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'15',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'16',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'17',seatStatus:1,seatType:2},
//     {seatLine:'E',seatNumber:'18',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'1',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'2',seatStatus:2,seatType:2},
//     {seatLine:'F',seatNumber:'3',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'4',seatStatus:2,seatType:2},
//     {seatLine:'F',seatNumber:'5',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'6',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'7',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'8',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'9',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'10',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'11',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'12',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'13',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'14',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'15',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'16',seatStatus:1,seatType:2},
//     {seatLine:'F',seatNumber:'17',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'1',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'2',seatStatus:2,seatType:2},
//     {seatLine:'G',seatNumber:'3',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'4',seatStatus:2,seatType:2},
//     {seatLine:'G',seatNumber:'5',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'6',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'7',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'8',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'9',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'10',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'11',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'12',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'13',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'14',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'15',seatStatus:1,seatType:2},
//     {seatLine:'G',seatNumber:'16',seatStatus:1,seatType:2},
//     {seatLine:'h',seatNumber:'1',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'2',seatStatus:2,seatType:2},
//     {seatLine:'H',seatNumber:'3',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'4',seatStatus:2,seatType:2},
//     {seatLine:'H',seatNumber:'5',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'6',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'7',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'8',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'9',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'10',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'11',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'12',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'13',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'14',seatStatus:1,seatType:2},
//     {seatLine:'H',seatNumber:'15',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'1',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'2',seatStatus:2,seatType:2},
//     {seatLine:'I',seatNumber:'3',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'4',seatStatus:2,seatType:2},
//     {seatLine:'I',seatNumber:'5',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'6',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'7',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'8',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'9',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'10',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'11',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'12',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'13',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'14',seatStatus:1,seatType:2},
//     {seatLine:'I',seatNumber:'15',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'1',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'2',seatStatus:2,seatType:2},
//     {seatLine:'K',seatNumber:'3',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'4',seatStatus:2,seatType:2},
//     {seatLine:'K',seatNumber:'5',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'6',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'7',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'8',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'9',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'10',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'11',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'12',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'13',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'14',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'15',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'16',seatStatus:1,seatType:2},
//     {seatLine:'K',seatNumber:'17',seatStatus:1,seatType:2},
// ])
const currentColorIndex = ref(0);
const colors = ref(['rgb(254, 185, 82)', 'rgb(243, 230, 192)']);
const currentColor = ref(colors.value[currentColorIndex.value]);

const startColorChanging = () => {
  setInterval(() => {
    currentColorIndex.value = (currentColorIndex.value + 1) % colors.value.length;
    currentColor.value = colors.value[currentColorIndex.value];
  }, 1000); 
};
startColorChanging();

const check =()=> {
    if(isNaN(priceBySchedule.value)){
        console.log("là chuoi")
    }else{
        console.log('la so')
    }  
}

// setInterval(() => {
//     store.dispatch('seat/getAllSeatByRoom', roomId.value);
//   }, 10000); // 10 giây = 10000 mili giây

const priceBySchedule = computed(() => {
    const priceString = sessionStorage.getItem('priceBySchedule');
    if (priceString) {
        return parseFloat(priceString);
    }
    return 0; // Trả về 0 nếu không có giá trị trong sessionStorage
})

const seatSelected = computed(() =>{
    return store.state.seat.seatSelected
})
const formattedSeatSelected = computed(() => {
    return seatSelected.value.join(', ');
});

const isShowTotalMoney = ref(false);
const isSelectedSeatNormal = ref(false);
const isSelectedSeatVip = ref(false);
const isSelectedSeatDouble = ref(false);

const priceBySeatNormal = ref(0)
const priceBySeatVip = ref(0)
const priceBySeatDouble = ref(0)

const totalMoney = computed(()=>{
    return store.state.seat.totalMoney;
})

const seatTypeNormal = computed(()=> {
    return store.state.seat.seatTypeNormal;
})
const seatTypeVip = computed(()=> {
    return store.state.seat.seatTypeVip;
})
const seatTypeDouble = computed(()=> {
    return store.state.seat.seatTypeDouble;
})

const quantitySeatNormalSelected = computed(() => {
    return store.state.seat.quantitySeatNormalSelected;
})
const quantitySeatVipSelected = computed(() => {
    return store.state.seat.quantitySeatVipSelected;
})
const quantitySeatDoubleSelected = computed(() => {
    return store.state.seat.quantitySeatDoubleSelected;
})

const changeSeatStatus = (seat) =>{

    if(seat.seatStatus === 3 || seat.seatStatus === 4){
       console.log('block')
    }
    if(seat.seatStatus === 1 && seat.seatType === 1){
        const seatStatus = 3;
        const seatId = seat.id;
        const movieId = movieDetail.value.movieId;
        const dayMonthYear = dayMonthYearSelected.value;
        const room = roomId.value
        const start = startTime.value
        const seatLine = seat.seatLine
        const seatNumber = seat.seatNumber
        const seatStatusCurren = seat.seatStatus;
        const email = currentUser.value.email;
        priceBySeatNormal.value = priceBySeatNormal.value + priceBySchedule.value;
        // store.dispatch('seat/plusPriceSeatNormal',priceBySchedule.value)
        // sessionStorage.setItem('priceBySeatNormal', JSON.stringify(priceBySeatNormal.value));
        //lưu tổng giá vào store
        store.dispatch('seat/plusTotalMoney',priceBySchedule.value)
        isSelectedSeatNormal.value = true;
        isShowTotalMoney.value = true;
        store.dispatch('seat/changeSeatStatus',{ dayMonthYear,start,movieId,room,seatStatus,seatId,email})
        seat.seatStatus = 2
        //lấy tên của ghế đang chọn
        // seatTypeNormal.value = 'GHẾ THƯỜNG'
        store.dispatch('seat/changeSeatTypeNormal','GHẾ THƯỜNG')
        //lấy số lượng của ghế thường đang chọn
        store.dispatch('seat/setQuantitySeatNormalSelected',quantitySeatNormalSelected.value + 1)
        //
        store.dispatch('seat/saveSeatSelected',{ seatLine, seatNumber,seatStatusCurren } )
    }
    else if(seat.seatStatus === 1 && seat.seatType === 2){
        const seatStatus = 3;
        const seatId = seat.id;
        const movieId = movieDetail.value.movieId;
        const dayMonthYear = dayMonthYearSelected.value;
        const room = roomId.value
        const start = startTime.value
        const seatLine = seat.seatLine
        const seatNumber = seat.seatNumber
        const seatStatusCurren = seat.seatStatus;
        const email = currentUser.value.email;
        priceBySeatVip.value = priceBySeatVip.value + priceBySchedule.value + 10000;
        // store.dispatch('seat/plusPriceSeatVip',priceBySchedule.value + 10000 )
        // sessionStorage.setItem('priceBySeatVip', JSON.stringify(priceBySeatVip.value));
        //lưu tổng giá vào store
        store.dispatch('seat/plusTotalMoney',priceBySchedule.value + 10000)
       
        isSelectedSeatVip.value = true;
        isShowTotalMoney.value = true;
        store.dispatch('seat/changeSeatStatus',{ dayMonthYear,start,movieId,room,seatStatus,seatId,email})
        seat.seatStatus = 2
        // seatTypeVip.value = 'GHẾ VIP'
        store.dispatch('seat/changeSeatTypeVip','GHẾ VIP')
        //lấy số lượng ghế víp đang chọn
        store.dispatch('seat/setQuantitySeatVipSelected',quantitySeatVipSelected.value + 1)
        //
        store.dispatch('seat/saveSeatSelected',{ seatLine, seatNumber,seatStatusCurren } )
    }    
    else if(seat.seatStatus === 1 && seat.seatType === 3){
        const seatStatus = 3;
        const seatId = seat.id;
        const movieId = movieDetail.value.movieId;
        const dayMonthYear = dayMonthYearSelected.value;
        const room = roomId.value
        const start = startTime.value
        const seatLine = seat.seatLine
        const seatNumber = seat.seatNumber
        const seatStatusCurren = seat.seatStatus;
        const email = currentUser.value.email;
        priceBySeatDouble.value = priceBySeatDouble.value + (priceBySchedule + 10000) * 2;
        // store.dispatch('seat/plusPriceSeatDouble',(priceBySchedule + 10000) * 2)

        // sessionStorage.setItem('priceBySeatDouble', JSON.stringify(priceBySeatDouble.value ));
        //lưu tổng giá vào store
        store.dispatch('seat/plusTotalMoney',(priceBySchedule.value + 10000) * 2)
        isSelectedSeatDouble.value = true;
        isShowTotalMoney.value =true;
        store.dispatch('seat/changeSeatStatus',{ dayMonthYear,start,movieId,room,seatStatus,seatId})
        seat.seatStatus = 2
        // seatTypeDouble.value = 'GHẾ ĐÔI'
        store.dispatch('seat/changeSeatTypeDouble','GHẾ ĐÔI')
        
        //lấy số lượng ghế đôi đang chọn
        store.dispatch('seat/setQuantitySeatDoubleSelected',quantitySeatDoubleSelected.value + 1)
        store.dispatch('seat/saveSeatSelected',{ seatLine, seatNumber,seatStatusCurren } )
    }
    else if (seat.seatStatus === 2 && seat.seatType === 1){
        const seatStatus = 1;
        const seatId = seat.id;
        const movieId = movieDetail.value.movieId;
        const dayMonthYear = dayMonthYearSelected.value;
        const room = roomId.value
        const start = startTime.value
        const seatLine = seat.seatLine
        const seatNumber = seat.seatNumber
        const seatStatusCurren = seat.seatStatus;
        const email = currentUser.value.email;
        if(priceBySeatNormal.value > 0 ){
            priceBySeatNormal.value = priceBySeatNormal.value - priceBySchedule.value;
            //lưu tổng giá vào store
            store.dispatch('seat/minusTotalMoney',priceBySchedule.value)
        }
        // sessionStorage.setItem('priceSeatNormal', JSON.stringify(priceBySeatNormal.value));
        if(priceBySeatNormal.value === 0){
            isSelectedSeatNormal.value = false;
        }
        if(totalMoney.value <= 0){
            isShowTotalMoney.value = false;
        }
        store.dispatch('seat/changeSeatStatus',{ dayMonthYear,start,movieId,room,seatStatus,seatId,email})
        seat.seatStatus = 1
        store.dispatch('seat/saveSeatSelected',{ seatLine, seatNumber,seatStatusCurren } )
 
        //thay đổi số lương ghế thường đã chọn
        //Nếu số lượng lớn hơn 0 thì mới trừ
        if(quantitySeatNormalSelected.value > 0){
            store.dispatch('seat/setQuantitySeatNormalSelected',quantitySeatNormalSelected.value - 1)
        }
       
    }
    else if (seat.seatStatus === 2 && seat.seatType === 2){
        const seatStatus = 1;
        const seatId = seat.id;
        const movieId = movieDetail.value.movieId;
        const dayMonthYear = dayMonthYearSelected.value;
        const room = roomId.value
        const start = startTime.value
        const seatLine = seat.seatLine
        const seatNumber = seat.seatNumber
        const seatStatusCurren = seat.seatStatus;
        const email = currentUser.value.email;
        if(priceBySeatVip.value > 0 ){
            priceBySeatVip.value = priceBySeatVip.value - (priceBySchedule.value + 10000);
            
            //lưu tổng giá vào store
            store.dispatch('seat/minusTotalMoney',priceBySchedule.value + 10000)
        }
        // sessionStorage.removeItem('priceSeatVip');
        // sessionStorage.setItem('priceSeatVip', JSON.stringify(priceBySeatVip.value));
        if(priceBySeatVip.value === 0){
            isSelectedSeatVip.value = false;
        }
        if(totalMoney.value <= 0){
            isShowTotalMoney.value = false;
        }
        store.dispatch('seat/changeSeatStatus',{ dayMonthYear,start,movieId,room,seatStatus,seatId,email})
        seat.seatStatus = 1
        store.dispatch('seat/saveSeatSelected',{ seatLine, seatNumber,seatStatusCurren } )

        //thay đổi số lương ghế thường đã chọn
        //Nếu số lượng lớn hơn 0 thì mới trừ
        if(quantitySeatVipSelected.value > 0){
            store.dispatch('seat/setQuantitySeatVipSelected',quantitySeatVipSelected.value - 1)
        }
    }
    else if (seat.seatStatus === 2 && seat.seatType === 3){
        const seatStatus = 1;
        const seatId = seat.id;
        const movieId = movieDetail.value.movieId;
        const dayMonthYear = dayMonthYearSelected.value;
        const room = roomId.value
        const start = startTime.value
        const seatLine = seat.seatLine
        const seatNumber = seat.seatNumber
        const seatStatusCurren = seat.seatStatus;
        if(priceBySeatDouble > 0){
            priceBySeatDouble.value = priceBySeatDouble.value - (priceBySchedule.value + 10000) *2;
            // sessionStorage.setItem('priceSeatDouble', JSON.stringify(priceBySeatDouble.value));
            //lưu tổng giá vào store
            store.dispatch('seat/minusTotalMoney',(priceBySchedule.value + 10000) *2)
        }
            //lưu tổng giá vào store
        
        if(priceBySeatDouble.value === 0){
            isSelectedSeatDouble.value = false;  
        }
        if(totalMoney.value <= 0){
            isShowTotalMoney.value = false;
        }
        store.dispatch('seat/changeSeatStatus',{ dayMonthYear,start,movieId,room,seatStatus,seatId})
        seat.seatStatus = 1
        store.dispatch('seat/saveSeatSelected',{ seatLine, seatNumber,seatStatusCurren } )

                //thay đổi số lương ghế thường đã chọn
        //Nếu số lượng lớn hơn 0 thì mới trừ
        if(quantitySeatDoubleSelected.value > 0){
            store.dispatch('seat/setQuantitySeatDoubleSelected',quantitySeatDoubleSelected.value - 1)
        }
    }
}


// const showBookTicket = () => {
//     if(seatSelected.value.length === 0){
//         alert("Ghế chưa được chọn")
//     }else{
//         store.dispatch('seat/saveTotalMoney',totalMoney.value)
//         // store.dispatch('seat/resetTotalMoney')
//         router.push("/dat-ve")
//     }  
// }

const timeLeft = ref(3000); // 5 phút = 300 giây

const interval = setInterval(() => {
  timeLeft.value--;
  if (timeLeft.value === 0) {
    clearInterval(interval);
    const movieId = movieDetail.value.movieId;
    const dayMonthYear = dayMonthYearSelected.value;
    const room = roomId.value
    const start = startTime.value
    store.dispatch('seat/resetSeats', { dayMonthYear, start, movieId, room })
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Error resetting seats:', error);
        router.push('/'); // Chuyển hướng dù có lỗi hay không
      });
  }
}, 1000); // Cập nhật mỗi giây

onBeforeUnmount(() => {
  clearInterval(interval);
  
});

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

const amountDiscounted = computed(()=> {
    return store.state.promotion.amountDiscounted;
})
const totalAmount = computed(()=> {
    return totalMoney.value - amountDiscounted.value;
})
const promotions = computed(()=> {
    return store.state.promotion.promotions;
})
const quantityOfFood = ref({}); // Lưu số lượng của từng sản phẩm

const addFoodtoCart = (item,itemId) => {

  if (!quantityOfFood.value[itemId]) {
    quantityOfFood.value[itemId] = 1;
  } else {
    quantityOfFood.value[itemId]++;
  }
  store.dispatch('seat/plusTotalMoney', item.price);
  
};

const removeFood = (item,itemId) => {
  if (quantityOfFood.value[itemId] && quantityOfFood.value[itemId] > 0) {
    quantityOfFood.value[itemId]--;
    store.dispatch('seat/minusTotalMoney',item.price);
  }
};

const getQuantity = (itemId) => {
  return quantityOfFood.value[itemId] || '';
};

  

const isShowVoucher = ref(false);
const showListVoucher = () => {
        isShowVoucher.value = !isShowVoucher.value;
}
const voucherInput = ref('')
const getDiscountAmount = () => {
    const voucher = voucherInput.value;
    const total = totalMoney.value;
    store.dispatch('promotion/getDiscountAmount',{ voucher, total })
}
const createBill = async ()=>{
    try {
        const email = currentUser.value.email;
        await BillService.createBill(email)
    } catch (error) {
        
    }
}

const responseUlrPayment = ref('')
const payment = async() => {
    try {
        console.log(totalAmount.value)
       const amount =  totalAmount.value
       const res = await Payment.submidOrder(amount,'doan trong quan');
       responseUlrPayment.value = res.data;

    } catch (error) {
        
    }
}

watchEffect(() => {
  if (responseUlrPayment.value) {
    window.location.href = responseUlrPayment.value; // Chuyển hướng đến đường dẫn phản hồi
  }
});

onMounted(
    ()=> {
        const start = startTime.value
        const dayMonthYear = dayMonthYearSelected.value;
        const movieId = movieDetail.value.movieId; 
        const room = roomId.value;
        createBill()
        store.dispatch('seat/getAllSeatByRoom',room)
        // store.dispatch('seat/resetSeats',{ dayMonthYear,start,movieId,room } )
        store.dispatch('schedule/getPriceBySchedule',{ start, dayMonthYear, movieId });
        store.dispatch('food/getAllFood')
        store.dispatch('promotion/getAllPromotion',currentUser.value.email)
        store.dispatch('seat/resetSeatsSelected') 
    }
)

onBeforeRouteLeave ((to, from, next) => {
    if(to.path !== '/dat-ve'){
        const movieId = movieDetail.value.movieId;
        const dayMonthYear = dayMonthYearSelected.value;
        const room = roomId.value
        const start = startTime.value
        
        store.dispatch('seat/resetSeats', { dayMonthYear, start, movieId, room })
        store.dispatch('seat/resetSeatsSelected')
        sessionStorage.removeItem('nameRoomBySchedule');
        sessionStorage.removeItem('dayMonthYearSelected');
        sessionStorage.removeItem('startTime');
        sessionStorage.removeItem('seats');
        sessionStorage.removeItem('seatSelected');
        sessionStorage.removeItem('priceBySchedule');
        store.dispatch('seat/resetTotalMoney')
        sessionStorage.removeItem('totalMoney');
        sessionStorage.removeItem('currentSeatType');
        sessionStorage.removeItem('priceBySeatNormal');
        sessionStorage.removeItem('priceBySeatVip');
        sessionStorage.removeItem('priceBySeatDouble');
        sessionStorage.removeItem('seatTypeNormal');
        sessionStorage.removeItem('seatTypeVip');
        sessionStorage.removeItem('seatTypeDouble');
        sessionStorage.removeItem('quantitySeatNormalSelected');
        sessionStorage.removeItem('quantitySeatVipSelected');
        sessionStorage.removeItem('quantitySeatDoubleSelected');
        store.commit('seat/reset_quantity_Seat_Selected')
    }
    next();
})

</script>

<template>
    <div>
        <div>
            <Navbar/>
        </div>
        <div style="background-color: #f8f8f8;">
            <div class="container" style="width: 81%;padding-top: 10px;">
            <div class="row">
            <div class="col-lg-8 col-md-12" style="">
                <h3 style="font-size: 23px;
                    line-height: 1.5em;
                    color: black;
                    font-weight: 600;
                    font-family: sans-serif;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    ">Trang chủ >
                    <span>Đặt vé > </span> 
                    <span>{{ movieDetail.movieName }}</span> <button @click="check">check</button></h3>
                <div class="text-center" :style="{ backgroundColor: currentColor }" 
                    style="color: red;padding: 10px;
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 15px;">
                    Theo quy định của cục điện ảnh, phim này không dành cho khán giả dưới 18 tuổi
                </div>
                <div class="row">
                    <div class="col-lg-3" v-for="(note,i) in note_seat_status" :key="i"
                    style="display: flex;align-items: center;"
                    >
                        <img :src="note.linkImage" alt="" style="width: 35px; height: 35px;">
                        <span style="font-weight: 600;margin-left: 8px;">{{ note.text }}</span>
                    </div>
                </div>
                <div class="room-over-view" style="margin-top: 20px;">
                    <div class="row">
                        <div class="seat-diagram">
                            <div class="screenImage">
                            <img  src="https://betacinemas.vn/Assets/global/img/booking/ic-screen.png" alt="" style="width: 100% !important;">

                            </div>
                            <div class="check-show" style="margin-top: 20px;">
                                <!-- <div class="full-width" style="">
                                    <div class="seat" v-for="(seat, i) in seats.slice(0, 18)" :key="i" style="text-align: center;">
                                        <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                    </div>
                                </div>
                                <div class="full-width">
                                    <div class="seat" v-for="(seat, i) in seats.slice(18, 36)" :key="i" style="text-align: center;">
                                        <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                    </div>
                                </div>
                                <div class="full-width">
                                    <div class="seat" v-for="(seat, i) in seats.slice(36, 54)" :key="i" style="text-align: center;">
                                        <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                    </div>
                                </div> -->
                                <div class="full-width" style="">
                                    <div class="seat-normal" v-for="(seat, i) in seats.slice(0, 18)" :key="i" @click="changeSeatStatus(seat)" style="cursor: pointer;">
                                    <!-- <div v-if ="seat.seatStatus == 3" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-process-normal.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;color: white;">
                                        <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                    </div> -->
                                    <div v-if ="seat.seatStatus == 4" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-buy-normal.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;color: white;">
                                        <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                    </div>
                                    <div v-else-if="seat.seatStatus == 2" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-select-normal.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;color: white;">
                                        <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                    </div>
                                    <div v-else-if="seat.seatStatus == 3" style="text-align: center; background-image: url('https://betacinemas.vn/Assets/global/img/booking/seat-process-normal.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;color: white;">
                                        <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                    </div>
                                    <div v-else-if="seat.seatStatus == 1 && seat.seatType == 1" class="seat" style="text-align: center;">
                                        <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                    </div>
                                    </div>
                                </div>
                                <div class="full-width">
                                    <div class="seat-vip" v-for="(seat, i) in seats.slice(18, 36)" :key="i"  @click="changeSeatStatus(seat)" style="cursor: pointer;">
                                        <div v-if ="seat.seatStatus == 2" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-select-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;color: white;" >
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                        <div v-else-if ="seat.seatStatus == 4" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-buy-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;color: white;">
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                        <div v-else-if ="seat.seatStatus == 3" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-process-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;color: white;">
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                        <div  v-else-if="seat.seatStatus == 1 && seat.seatType == 2" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;">
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                        

                                    </div>
                                </div>

                                <!-- <div class="full-width">
                                    <div class="seat-vip"  v-for="(seat, i) in seats.slice(90, 107)" :key="i">
                                        <div class="seat"  v-if="seat.seatType === 2" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;">
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="full-width">
                                    <div class="seat-vip" v-for="(seat, i) in seats.slice(107, 123)" :key="i">
                                        <div class="seat"  v-if="seat.seatType === 2" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;">
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="full-width">
                                    <div class="seat-vip"  v-for="(seat, i) in seats.slice(123, 138)" :key="i">
                                        <div class="seat"  v-if="seat.seatType === 2" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;">
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="full-width">
                                    <div class="seat-vip" v-for="(seat, i) in seats.slice(138, 153)" :key="i">
                                        <div class="seat"  v-if="seat.seatType === 2" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;">
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="full-width">
                                    <div class="seat-vip"  v-for="(seat, i) in seats.slice(153, 171)" :key="i">
                                        <div class="seat"  v-if="seat.seatType === 2" style="text-align: center; background-image: url('https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png'); background-repeat: no-repeat; background-size: 35px 35px; background-position: center; width: 40px; height: 40px; display: inline-block; font-size: 11px; align-items: center; justify-content: center; margin-right: 8px;">
                                            <span style="margin: auto !important; line-height: 3;">{{ seat.seatLine }}{{ seat.seatNumber }}</span>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>              
                </div>
                <div class="seat-type-panel" style="padding-top: 15px;width: 100%;border-radius: 10px;">
                    <div class="row" style="padding-left: 40px;">
                        <div class="col-lg-3 col-12" style="padding-top: 0;padding-bottom: 8px;">
                            <div class="row seat-type">
                                <div class="col-lg-3 col-4" style="padding: 0 !important;display: flex;align-items: center;">
                                    <img  style="width: 40px;height: 40px;" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png" alt="">
                                </div>
                                <span class="col-lg-8 col-4" style="font-size: 18px;margin-left: 8px;font-weight: bold;">Ghế thường</span>
                                <span v-if="isSelectedSeatNormal" class="col-12 value-money" style="padding-top:10px ;padding-bottom: 0;text-align: center;">{{ quantitySeatNormalSelected }}x{{ priceBySeatNormal }}vnđ</span>
                            </div>
                        </div>
                        <div class="col-lg-2 col-12" style="padding-top: 0;padding-bottom: 0;">
                            <div class="row seat-type">
                                <div class="col-lg-3 col-4" style="padding: 0 !important;display: flex;align-items: center;">
                                    <img  style="width: 40px;height: 40px" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png" alt="">
                                </div>
                                <span class="col-lg-8 col-4" style="font-size: 18px;margin-left: 8px;font-weight: bold">Ghế VIP</span>
                                <span v-if="isSelectedSeatVip" class="co-12 value-money" style="padding-top:10px ;padding-bottom: 0;text-align: center;">{{ quantitySeatVipSelected}}x{{ priceBySeatVip }}vnđ</span>
                            </div>
                        </div>
                        <div class="col-lg-2 col-12" style="border-right: 2px solid #d8d8d8;padding-top: 0;padding-bottom: 8px;">
                            <div class="row seat-type">
                                <div class="col-lg-3 col-4" style="padding: 0 !important;display: flex;align-items: center;">
                                    <img class="image-seat-double" style="width: 40px;height: 20px" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-double.png" alt="">
                                </div>
                                <span class="col-lg-8 col-4" style="font-size: 18px;margin-left: 8px;font-weight: bold">Ghế đôi</span>
                                <span v-if="isSelectedSeatDouble" class="col-12 value-money" style="padding-top:10px ;padding-bottom: 0;text-align: center;">{{  }}</span>
                            </div>
                        </div>
                        <div class="col-lg-3 col-12 money" style="border-right: 2px solid #d8d8d8;padding-top: 0;padding-bottom: 8px;">
                            <div class="row seat-type" style="margin-top: 10px;">
                                <p class="col-lg-12 col-4 total-money" style="margin-bottom: 8px;font-size: 18px;margin-left: 8px;font-weight: bold;float: left;padding-left:0 ;padding-top: 5px;">Tổng tiền</p>
                                <p v-if ="isShowTotalMoney" class="col-lg-12 col-4 result-money" style="padding-top:0;padding-bottom: 0;text-align: center;margin-top: 30px;">{{ totalMoney }}vnđ</p>
                                <div class="col-4 d-lg-none"></div>
                            </div>
                        </div>
                        <div id="time" class="col-lg-2 col-12" style="padding-top: 0;">
                            <h1>
                                {{ formattedTimeLeft }}
                            </h1>
                    </div>
                    </div>
                </div>
                <div class="payment-form" style="margin-top: 30px;">
                            <div style="height: 35px;display: flex;">
                                <img src="https://www.betacinemas.vn/Assets/global/img/booking/ic-inforpayment.png" style="height: 100%;" alt="">
                                <div style="font-family: sans-serif;
                                font-size: 20px;
                                font-weight: 600;
                                line-height: 35px;
                                height: 35px;
                                float: left;
                                margin-left: 12px;
                                color: #494c62;">THÔNG TIN THANH TOÁN</div>
                            </div>
                            <div class="row">
                                <div class="col-4" style="font-size: 16px;">
                                    <span><b>Họ tên:</b></span>
                                    <br>
                                    <span>{{ currentUser.userName }}</span>
                                </div>
                                <div class="col-4" style="font-size: 16px;">
                                    <span><b>Số điện thoại:</b></span>
                                    <br>
                                    <span>{{ currentUser.phoneNumber }}</span>
                                </div>
                                <div class="col-4" style="font-size: 16px;">
                                    <span><b>Email:</b></span>
                                    <br>
                                    <span>{{ currentUser.email }}</span>
                                </div>
                            </div>
                            <div >
                                <div class="row" v-if="priceBySeatVip">
                                    <div class="col-3" style="font-size: 18px;"><b>{{ seatTypeVip }}</b></div>
                                    <div style="text-align: right;
                                    font-family: SourceSansPro;
                                    font-size: 18px;
                                    font-weight: normal;
                                    font-style: normal;
                                    font-stretch: normal;
                                    line-height: normal;
                                    letter-spacing: normal;
                                    text-align: right;
                                    color: #494c62;
                                    padding-right: 10%;" class="col-9">{{ priceBySeatVip }} vnđ</div>
                                </div>
                                <div class="row" v-if="priceBySeatNormal">
                                    <div class="col-3" style="font-size: 18px;"><b>{{ seatTypeNormal }}</b></div>
                                    <div style="text-align: right;
                                    font-family: SourceSansPro;
                                    font-size: 18px;
                                    font-weight: normal;
                                    font-style: normal;
                                    font-stretch: normal;
                                    line-height: normal;
                                    letter-spacing: normal;
                                    text-align: right;
                                    color: #494c62;
                                    padding-right: 10%;" class="col-9">{{ priceBySeatNormal }} vnđ</div>
                                </div>

                                <div class="row" v-else="priceBySeatDouble">
                                    <div class="col-3" style="font-size: 18px;"><b>{{ seatTypeDouble }}</b></div>
                                    <div style="text-align: right;
                                    font-family: SourceSansPro;
                                    font-size: 18px;
                                    font-weight: normal;
                                    font-style: normal;
                                    font-stretch: normal;
                                    line-height: normal;
                                    letter-spacing: normal;
                                    text-align: right;
                                    color: #494c62;
                                    padding-right: 10%;" class="col-9">{{ priceBySeatDouble }} vnđ</div>
                                </div>
                            </div>

                            <div  style="height: 35px;display: flex;margin-top: 20px;">
                                <img style="height: 100%;float: left;" src="https://www.betacinemas.vn/Assets/global/img/booking/ic-combo.png" alt="">
                                <div style="font-size: 20px;
                                font-weight: 700;
                                line-height: 35px;
                                height: 35px;
                                float: left;
                                margin-left: 12px;
                                color: #494c62;">COMBO ƯU ĐÃI</div>
                            </div>
                            <div style="margin-top: 30px;">
                                <v-card flat>
                                    <v-card-title class="d-flex align-center pe-2">
                                    <v-spacer></v-spacer>
                                    <v-text-field
                                        v-model="search"
                                        density="compact"
                                        label="Search"
                                        prepend-inner-icon="mdi-magnify"
                                        variant="solo-filled"
                                        flat
                                        hide-details
                                        single-line
                                    ></v-text-field>
                                    </v-card-title>

                                    <v-divider></v-divider>
                                    <v-data-table v-model:search="search" :items="foods" hover :headers="headersFood">
                                        <template v-slot:item.action = "{ item }">
                                            <div style="height: 150px; display: flex;align-items: center;">
                                                <span>{{ getQuantity(item.id) }}</span>
                                                <v-icon size="large" color="#03599d" class="me-2" @click="addFoodtoCart(item,item.id)">
                                                mdi-plus-box
                                                </v-icon>
                                                <v-icon size="large" color="#03599d" @click="removeFood(item,item.id)">
                                                mdi-minus-box
                                                </v-icon>
                                            </div>
                                        </template>
                                        <template v-slot:item.foodName="{ item }">
                                            <div style="font-family: sans-serif;
                                            font-weight: 600;">
                                                {{ item.foodName }}
                                            </div>
                                        </template>
                                        <template v-slot:item.price="{ item }">
                                            <div style="font-family: sans-serif;
                                            font-weight: 550;">
                                                {{ item.price }}
                                            </div>
                                        </template>
                                        <template v-slot:item.image="{ item }">
                                            <v-card style="width: 130px;height: 130px;" class="my-2" rounded>
                                            <v-img
                                                style="width: 100%;height: 100%;"
                                                :src="item.image"
                                                height="64"
                                                cover
                                            ></v-img>
                                            </v-card>
                                        </template>
                                    </v-data-table>
                                </v-card>
                            </div>
                            <div  style="margin-top: 35px;display:  flex;">
                                <div style="width: 56px;height: 35px;">
                                    <img src="https://www.betacinemas.vn/Assets/global/img/booking/ic-payment.png" style="width: 100%;height: 100%;" alt="">
                                </div>
                                <div
                                style="font-size: 20px;
                                font-weight: 500;
                                line-height: 35px;
                                height: 35px;
                                float: left;
                                margin-left: 12px;
                                color: #494c62">
                                    GIẢM GIÁ
                                </div>
                            </div>
                            <div style="display: flex;margin-top: 20px;align-items: center;
                                font-size: 15px;border-bottom: 1px solid #ccc;padding-bottom: 10px;">
                                <font-awesome-icon :icon="['fas', 'circle-arrow-right']" style="font-size: 14px;" />
                                <b style="margin-left: 5px;">Voucher</b>
                                <span @click="showListVoucher" style="color: #1473B6;cursor: pointer;margin-left: 5px;">( Nhấn vào đây để xem danh sách voucher của bạn )</span>
                            </div>
                            <div v-if="isShowVoucher">
                                <div style="display: flex;margin-top: 20px;">
                                    <input class="col-4" type="text" v-model="voucherInput" name = "Voucher" placeholder="Voucher"
                                    style="border: 1px solid rgb(149, 149,149);border-radius: 5px;height: 40px;">
                                    <button class="col-2" 
                                    @click="getDiscountAmount"
                                    style="text-align: left;display: flex;
                                    align-items: center;height: 40px;
                                    color: white;                      
                                    font-weight: bold;
                                    margin-left: 15px;
                                    justify-content: center;
                                    background-image: linear-gradient(to right, #fc3606 0%, #fda085 51%, #fc7704 100%) !important;
                                    ">ÁP DỤNG
                                    </button>
                                </div>
                                <div style="font-size: 20px;
                                color: rgb(73, 76, 98);
                                margin-top: 14px;
                                margin-bottom: 8px;
                                font-weight: bold;
                                float: left;
                                width: 100%">
                                VOUCHER CỦA BẠN
                                </div>
                                <div class="voucher" style="margin-top: 60px;">
                                    <v-card flat> 
                                    <v-data-table
                                    style="font-weight: 600;font-size: 18px;"
                                    :headers="headersPromotion"
                                    :items="promotions"
                                    :search="search2" >
                                    <template #bottom></template>
                                </v-data-table>
                                </v-card> 
                                </div>
                            </div>
                            <div style="text-align: right;margin-top: 20px;font-size: 18px;">
                                <span style="margin-bottom: 10px"><b>Tổng tiền: </b>{{ totalMoney }} vnđ</span>
                                <br>
                                <br>
                                <span style="margin-bottom: 10px"><b>Số tiền được giảm: </b>{{ amountDiscounted }} vnđ</span>
                                <br>
                                <br>         
                                <span style="margin-bottom: 10px"><b>Số tiền cần thanh toán: </b>{{ totalAmount }} vnđ</span>
                            </div>
                        </div>
            </div>
            <div class="col-lg-4 d-lg-block d-md-none d-block info-schedule-1">
                <div class="content-schedule" style="background-color: white;border-radius: 10px;height: 100%;">
                    <div class="row">
                        <div class="col-6" style="padding-top: 0;">
                            <img :src="movieDetail.movieImage" alt="" style="width: 155px;height: 236px;border-radius: 10px;">
                        </div>
                        <div class="col-6" style="padding-top: 20px;">
                            <h3 style="font-size: 23px;color: #03599d;font-weight: 700;">{{ movieDetail.movieName }}</h3>
                            <h5 style="font-weight: 300;">Phụ đề</h5>
                        </div>
                    </div> 
                        <div class="row" style="padding-left: 35px;">
                            <div class="col-5" style="display: flex;align-items: center;padding-top: 0 !important;">
                                <font-awesome-icon :icon="['fas', 'tags']" style="font-size: 14px;color: black;" />
                                <p style="margin-left: 10px;">Thể loại</p>
                            </div>
                            <div class="col-7" style="float: left;padding-top: 0;">
                                <p><b>{{ movieDetail.movieTypeName }}</b></p>
                            </div>
                        </div>
                        <div class="row" style="padding-left: 35px;">
                            <div class="col-5" style="display: flex;align-items: center;">
                                <font-awesome-icon :icon="['fas', 'clock']" style="font-size: 14px;color: black;" />
                                <p style="margin-left: 10px;">Thời lượng</p>
                            </div>
                            <div class="col-7" style="float: left;">
                                <p><b>{{ movieDetail.movieDuration}} phút</b></p>
                            </div>
                        </div>
                        <hr style="border-top: 2px dashed black ;">
                        <div class="row"  style="padding-left: 35px;">
                            <div class="col-5" style="display: flex;align-items: center;">
                                <font-awesome-icon :icon="['fas', 'building-columns']" style="font-size: 14px;color: black;" />
                                <p style="margin-left: 10px;">Rạp chiếu</p>
                            </div>
                            <div class="col-7" style="float: left;">
                                <p><b>{{ nameOfCinema}}</b></p>
                            </div>
                        </div>
                        <div class="row"  style="padding-left: 35px;">
                            <div class="col-5" style="display: flex;align-items: center;">
                                <font-awesome-icon :icon="['fas', 'calendar-days']"  style="font-size: 14px;color: black;" />
                                <p style="margin-left: 10px;">Ngày chiếu</p>
                            </div>
                            <div class="col-7" style="float: left;">
                                <p><b>{{ dayMonthYearSelected }}</b></p>
                            </div>
                        </div>
                        <div class="row" style="padding-left: 35px;">
                            <div class="col-5" style="display: flex;align-items: center;">
                                <font-awesome-icon :icon="['fas', 'clock']" style="font-size: 14px;color: black;"/>
                                <p style="margin-left: 10px;">Giờ chiếu</p>
                            </div>
                            <div class="col-7" style="float: left;">
                                <p><b>{{ startTime }}</b></p>
                            </div>
                        </div>
                        <div class="row"  style="padding-left: 35px;">
                            <div class="col-5" style="display: flex;align-items: center;">
                                <font-awesome-icon :icon="['fas', 'desktop']" style="font-size: 14px;color: black;" />
                                <p style="margin-left: 10px;">Phòng chiếu</p>
                            </div>
                            <div class="col-7" style="float: left;">
                                <p><b>{{ nameRoom}}</b></p>
                            </div>
                        </div>
                        <div class="row"  style="padding-left: 35px;">
                            <div class="col-5" style="display: flex;align-items: center;">
                                <font-awesome-icon :icon="['fas', 'cubes']" style="font-size: 14px;color: black;" />
                                <p style="margin-left: 10px;">Ghế ngồi</p>
                            </div>
                            <div class="col-7" style="float: left;">
                                <p>{{ formattedSeatSelected }}</p>
                            </div>
                        </div>
                        <div style="display: flex;justify-content: center;margin-bottom: 20px;">
                                <button 
                                @click="payment"
                                style="width: 126px;height:41px;
                                background-image: linear-gradient(to right, #0a64a7 0%, #258dcf 51%, #3db1f3 100%) !important;
                                color: #fff;border-radius: 5px;">
                                TIẾP TỤC</button> 
                        </div>

                </div>
            </div>

                <div class="d-lg-none d-md-block d-none" style="border-radius: 10px;padding-right: 0;margin-top: 20px;display: flex !important;margin-bottom: 30px;padding-top: 10px;">
                    <div class="info-schedule-2 d-lg-none d-md-block d-none" style="background-color: white; border-radius: 10px;width: 100%;display: flex;">
                        <div class="col-6" style="padding-left: 0;padding-top: 0;">
                            <div class="image" style="width: 335px;height: 530px;">
                                <img style="width: 100%; height: 100%;border-radius: 10px;" :src="movieDetail.movieImage" alt="">
                            </div>
                        </div>
                        <div class="col-6" style="padding-top: 0;padding-left: 0;padding-right: 0;">
                            <h3 style="color:#03599d;margin-top: 10px;">{{ movieDetail.movieName }}</h3>
                            <h4>Phụ đề</h4>
                            <div class="row" style="margin-top: 20px;padding-left: 35px;margin-bottom: 30px;">
                                <div class="col-md-5" style="display: flex;align-items: center;">
                                    <font-awesome-icon :icon="['fas', 'tags']" style="font-size: 14px;color: black;" />
                                    <p style="margin-left: 10px;">Thể loại</p>
                                </div>
                                <div class="col-md-7" style="float: left;">
                                    <p><b>{{ movieDetail.movieTypeName }}</b></p>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 20px;padding-left: 35px;margin-bottom: 30px;">
                                <div class="col-md-5" style="display: flex;align-items: center;">
                                    <font-awesome-icon :icon="['fas', 'clock']" style="font-size: 14px;color: black;" />
                                    <p style="margin-left: 10px;">Thời lượng</p>
                                </div>
                                <div class="col-md-7" style="float: left;">
                                    <p><b>{{ movieDetail.movieDuration}} phút</b></p>
                                </div>
                            </div>
                            <hr style="border-top: 2px dashed black ;">
                            <div class="row"  style="margin-top: 20px;padding-left: 35px;margin-bottom: 30px;">
                                <div class="col-md-5" style="display: flex;align-items: center;">
                                    <font-awesome-icon :icon="['fas', 'building-columns']" style="font-size: 14px;color: black;" />
                                    <p style="margin-left: 10px;">Rạp chiếu</p>
                                </div>
                                <div class="col-md-7" style="float: left;">
                                    <p><b>{{ nameOfCinema}}</b></p>
                                </div>
                            </div>
                            <div class="row"  style="margin-top: 20px;padding-left: 35px;margin-bottom: 30px;">
                                <div class="col-md-5" style="display: flex;align-items: center;">
                                    <font-awesome-icon :icon="['fas', 'calendar-days']"  style="font-size: 14px;color: black;" />
                                    <p style="margin-left: 10px;">Ngày chiếu</p>
                                </div>
                                <div class="col-md-7" style="float: left;">
                                    <p><b>{{ dayMonthYearSelected }}</b></p>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 20px;padding-left: 35px;margin-bottom: 30px;">
                                <div class="col-md-5" style="display: flex;align-items: center;">
                                    <font-awesome-icon :icon="['fas', 'clock']" style="font-size: 14px;color: black;"/>
                                    <p style="margin-left: 10px;">Giờ chiếu</p>
                                </div>
                                <div class="col-md-7" style="float: left;">
                                    <p><b>{{ startTime }}</b></p>
                                </div>
                            </div>
                            <div class="row"  style="margin-top: 20px;padding-left: 35px;margin-bottom: 30px;">
                                <div class="col-md-5" style="display: flex;align-items: center;">
                                    <font-awesome-icon :icon="['fas', 'desktop']" style="font-size: 14px;color: black;" />
                                    <p style="margin-left: 10px;">Phòng chiếu</p>
                                </div>
                                <div class="col-md-7" style="float: left;">
                                    <p><b>{{ nameRoom}}</b></p>
                                </div>
                            </div>
                            <div class="row"  style="margin-top: 20px;padding-left: 35px;margin-bottom: 30px;">
                                <div class="col-md-5" style="display: flex;align-items: center;">
                                    <font-awesome-icon :icon="['fas', 'cubes']" style="font-size: 14px;color: black;" />
                                    <p style="margin-left: 10px;">Ghế ngồi</p>
                                </div>
                                <div class="col-md-7" style="float: left;">
                                    <p>{{ formattedSeatSelected }}</p>
                                </div>
                            </div>
                            <div style="display: flex;justify-content: center;margin-bottom: 20px;">
                                    <button 
                                    @click="payment"
                                    style="width: 126px;height:41px;
                                    background-image: linear-gradient(to right, #0a64a7 0%, #258dcf 51%, #3db1f3 100%) !important;
                                    color: #fff;border-radius: 5px;">
                                    TIẾP TỤC</button>     
                            </div>
                        </div>  
                    </div>

                </div>
            </div>
        </div>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
</template>

<style scoped>
@media only screen and (min-width: 1300px) {
    .screenImage {
        width: 856px !important;
        height: 96px !important;
    }
    .show-seats{
        width: 70% !important;
    }

}
@media only screen and (max-width:992px) {
    .total-money{
        padding-top: 15px !important;
        text-align: start;
        margin-left: 0 !important;
    }
    .value-money{
        padding-top: 0 !important ;
        text-align: end !important;
    }
    .money .seat-type{
        border-top:1px solid #d8d8d8 ;
    }
    .result-money{
        padding-top: 15px !important;
    }

    .seat-type{
        text-align: center !important;
        padding-right: 20px !important;
    }
}
@media only screen and (min-width: 992px) and (max-width:1300px) {
    .screenImage {
        width: 856px !important;
        height: 96px !important;
    }
    .container {
        width: 93% !important;
    }

}
@media only screen and (min-width: 800px) and (max-width: 992px){
    .screenImage {
        width: 856px !important;
        height: 96px !important;
    }
    .title-info p {
        font-size: 12px !important;
    }
    .container{
        width: 90% !important;
    }
    .image-seat-double{
        width: 50px !important;
        height: 25px !important;
    }

@media only screen and (min-width: 768px) and (max-width: 992px){
    .info-schedule-2  {
        display: flex !important;
    }
    .result-money{
        margin-top: 0 !important;
    }
}
}
@media only screen and (min-width: 650px) and (max-width: 800px){
    .screenImage {
        width: 856px !important;
        height: 96px !important;
    }
    .container{
        width: 93% !important;
    }
        .result-money{
        margin-top: 0 !important;
    }
    .result-money{
        margin-top: 0 !important;
    }
}
/* @media only screen and (min-width: 650px) and (max-width: 768px){
    .infor-schedule-2 .col-6 .image {
        width: 280px !important;
        height: 480px !important;
    }
} */
@media only screen and (max-width: 650px){
    .screenImage {
        width: 856px !important;
        height: 96px !important;
    }
    .title-info p {
        font-size: 10px !important;
    } 
    .container {
        width: 95% !important;
    }
}
@media only screen and (max-width: 768px){
    .info-schedule-1 {
        margin-top: 20px;
    }
    .result-money{
        margin-top: 0 !important;
    }
}
.room-over-view > .row {
    overflow-x: auto;
    white-space: nowrap;
}

.seat-vip {
    display: inline-block;
}
.seat-normal {
    display: inline-block;
}
.seat{
    width: 40px;
    height: 40px;
    display: inline-block;
    font-size: 11px;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    background-image: url(https://betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png);
    background-repeat: no-repeat ;
    background-size: 35px 35px ;
    background-position: center;
}
.seat-type-panel{
    margin-top: 40px;
    background-color: white;
}
.content-schedule{
    transition: tranform 0.2s ease;
}
.content-schedule:hover {
    transform: translateY(-1px);
}
</style>