<script setup>
import { ref,computed, onBeforeUnmount,onMounted } from 'vue';
import { useStore } from 'vuex';
// import  Navbar from '@/components/Navbar.vue'
import {useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
import moment from 'moment';
import eventBus from '../../eventBus';
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
    return JSON.parse(sessionStorage.getItem('seats'));
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

const priceBySeatNormal = computed(()=> {
    return parseInt(JSON.parse(sessionStorage.getItem('priceBySeatNormal')))
})
const priceBySeatVip = computed(()=> {
    return parseInt(JSON.parse(sessionStorage.getItem('priceBySeatVip')))
})
const priceBySeatDouble = computed(()=> {
    return parseInt(JSON.parse(sessionStorage.getItem('priceBySeatDouble')))
})

const seatTypeNormal = computed(()=> {
    return JSON.parse(sessionStorage.getItem('seatTypeNormal'))
})
const seatTypeVip = computed(()=> {
    return JSON.parse(sessionStorage.getItem('seatTypeVip'))
})
const seatTypeDouble = computed(()=> {
    return JSON.parse(sessionStorage.getItem('seatTypeDouble'))
})

const totalMoney = computed(()=>{
    return store.state.seat.totalMoney
})
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
    console.log(itemId)
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

  
const check = ()=> {
    console.log(voucherInput.value)
}

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
onMounted(
    ()=> {
       store.dispatch('food/getAllFood')
       store.dispatch('promotion/getAllPromotion',currentUser.value.email) 
    }   
)
onBeforeUnmount(() => {
    sessionStorage.removeItem('promotions');
    sessionStorage.removeItem('totalMoney');
});
// onBeforeRouteLeave ((to, from, next) => {
//     if(to.path !== '/dat-ve'){
//         const movieId = movieDetail.value.movieId;
//         const dayMonthYear = dayMonthYearSelected.value;
//         const room = roomId.value
//         const start = startTime.value
        
//         store.dispatch('seat/resetSeats', { dayMonthYear, start, movieId, room })
//         store.dispatch('seat/resetSeatsSelected')
//         sessionStorage.removeItem('nameRoomBySchedule');
//         sessionStorage.removeItem('dayMonthYearSelected');
//         sessionStorage.removeItem('startTime');
//         sessionStorage.removeItem('seats');
//         sessionStorage.removeItem('seatSelected');
//         sessionStorage.removeItem('priceBySchedule');
//         store.dispatch('seat/resetTotalMoney')
//         sessionStorage.removeItem('totalMoney');
//         sessionStorage.removeItem('currentSeatType');
//         sessionStorage.removeItem('priceBySeatNormal');
//         sessionStorage.removeItem('priceBySeatVip');
//         sessionStorage.removeItem('priceBySeatDouble');
//         sessionStorage.removeItem('seatTypeNormal');
//         sessionStorage.removeItem('seatTypeVip');
//         sessionStorage.removeItem('seatTypeDouble');
//     }
//     next();
// })
</script>

<template>
  <div  style="background-color: #f8f8f8;">
    <div class="container-fluid"style="width: 78vw;">
        <div class="row">
            <div class="col-lg-8 col-12">
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
                <div class="payment-form">
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
                                @click="showBookTicket"
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

@media only screen and (min-width: 992px) and (max-width:1300px) {
    .screenImage {
        width: 856px !important;
        height: 96px !important;
    }
    .container-fluid{
        width: 92vw !important;
    }

}

@media only screen and (min-width: 768px) and (max-width: 992px){
    .info-schedule-2  {
        display: flex !important;
    }
    .result-money{
        margin-top: 0 !important;
    }
    .container-fluid{
        width:87vw !important;
    }
}

@media only screen and (min-width: 650px) and (max-width: 768px){
    .container-fluid{
        width: 93vw !important;
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
    .container-fluid{
        width: 95vw !important;
    }
}

</style>