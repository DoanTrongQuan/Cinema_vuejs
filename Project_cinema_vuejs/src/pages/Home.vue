<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import eventBus from '../eventBus.js';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import PublicService from '../service/public.service.js';
import MovieDetail from './MovieDetail.vue';
import { useStore } from 'vuex';
const store = useStore();

// const isShowHomePage = ref(true);
const active = ref(false);

const movies = computed(() => {
    return store.state.movie.movies;
});

const isShowIconPlay = ref(Array(movies.length).fill(false));
const isShowOverlay = ref(Array(movies.length).fill(false));

const showIconPlayAndOverlay = (i, value) => {
    isShowIconPlay.value[i] = value;
    isShowOverlay.value[i] = value;
};
const isShowTrailer = ref(false);
const currentMovieTrailer = ref('');

const openDialogTrailer = (movieTrailer) => {
    isShowTrailer.value = true;
    currentMovieTrailer.value = movieTrailer;
};

// const isShowMovieDetail = ref(false);

const showMovieDetail = (movie) => {
    // isShowMovieDetail.value = true;
    // isShowHomePage.value = false;
    store.dispatch('movie/getMovieDetail', movie);
    store.dispatch('schedule/getAllDayMonthYearOfScheduleByMovie', movie.movieId);
};

const tab = ref(null);
const banner = ref([{ linkImage: 'https://files.betacorp.vn/files/ecm/2024/02/21/1702x621-2-163855-210224-73.png' }, { linkImage: '/img/movie_galaxy.jpg' }]);

const nameOfCinema = computed(() => {
    return store.state.cinema.nameOfCinema;
});

const cinemas = reactive([
    { address: 'Hà Nội', children: [] },
    { address: 'TP.Hồ Chí Minh', children: [] },
    { address: 'Bắc Giang', children: [] },
    { address: 'Đồng Nai', children: [] },
    { address: 'Khánh Hòa', children: [] },
    { address: 'Thái Nguyên', children: [] },
    { address: 'Thanh Hóa', children: [] },
    { address: 'Bà Rịa-Vũng Tàu', children: [] },
    { address: 'Bình Dương', children: [] },
    { address: 'Kiên Giang', children: [] },
    { address: 'Lào Cai', children: [] }
]);

// :nameOfCinema="nameOfCinema" :cinemas="cinemas"

const getAllMoviesByCinema = async (nameOfCinemaValue) => {
    try {
        await store.dispatch('movie/getAllMovieByCinema', nameOfCinemaValue);
    } catch (error) {}
};
//nhận giá trị biến nameOfCinema mới nhất sau khi thay đổi nameOfCinema ở Navbar
eventBus.on('getAllMovieByCinema', (nameOfCinemaNew) => {
    // nameOfCinema.value = nameOfCinemaNew;
    getAllMoviesByCinema(nameOfCinemaNew);
});

//Lấy tất cả cinema theo address
const getAllCinemas = async () => {
    for (const cinema of cinemas) {
        try {
            const address = cinema.address;
            const res = await PublicService.getAllCinemaByAddress(address);
            cinema.children = res.data;
        } catch (error) {
            // console.error('Error:', error);
        }
    }
};
// const isShowHomePage = ref(true);
// const isShowAdminPage = ref(false);
// const isShowNavbar = ref(true)
onMounted(
    async () => {
    if(!store.state.cinema.nameOfCinema){
        store.dispatch('cinema/changeNameOfCinema','Beta Mỹ Đình');
    }
    try {
        await getAllCinemas();
        await getAllMoviesByCinema(nameOfCinema.value);  
        eventBus.emit('cinemas',cinemas)
    //     eventBus.on('showAdminPage', (mes) => {
    //     isShowAdminPage.value = mes;
    //     isShowHomePage.value = !mes;
    // });
    } catch (error) {
        console.error('Error:', error);
        }
    }

);
</script>

<template>
    <div >
        <div class="header-home">
            <Navbar/>
        </div>

        <div  class="main" >
            <div>
                <vs-dialog v-model="isShowTrailer" width="685px" not-center>
                    <template #header>
                        <h4 class="not-margin">Welcome to <b>Vuesax</b></h4>
                    </template>

                    <div class="con-content" style="width: 645px; height: 377px; padding-left: 10px">
                        <iframe
                            width="100%"
                            height="100%"
                            :src="currentMovieTrailer"
                            title="LỄ TRỪ TÀ | MAIN Trailer | Khởi Chiếu 23.02.2024"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>

                    <template #footer>
                        <div class="con-footer">
                            <vs-button type="transparent" @click="active = false"> Ok </vs-button>
                        </div>
                    </template>
                </vs-dialog>
            </div>
            <div class="wrap-header">
                <!-- <div style="width:25%;height:100%;padding-bottom:24px">
          <img style="width:100%;height:100%" src="https://hocmai.vn/php_javascript/images/popup-qc2-87/popupT12-TopClass.png" alt="">
        </div> -->
                <v-carousel cycle style="height: auto" hide-delimiter-background show-arrows="hover" :interval="6000000">
                    <v-carousel-item v-for="(ban, i) in banner" :key="i">
                        <v-sheet height="100%">
                            <div class="d-flex fill-height justify-center align-center">
                                <img :src="ban.linkImage" alt="" />
                            </div>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </div>
            <div class="category col-xl-9 col-sm-11">
                <!-- <button @click="check">check</button> -->
                <v-card style="padding-top: 15px" flat>
                    <v-tabs class="col-md-12 col-8" style="align-items: center !important; height: 80px;width: 100% !important; " v-model="tab" color="deep-purple-accent-4" align-tabs="center">
                        <v-tab :value="1"><h1 class="title" style="margin-bottom: 0 !important; height: 40px; font-family: Arial, Helvetica, sans-serif; font-weight: bold">PHIM SẮP CHIẾU</h1> </v-tab>
                        <v-tab :value="2"><h1 class="title" style="margin-bottom: 0 !important; height: 40px; font-family: Arial, Helvetica, sans-serif; font-weight: bold">PHIM ĐANG CHIẾU</h1> </v-tab>
                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item v-for="n in 2" :key="n" :value="n">
                            <v-container style="padding-top: 25px" fluid>
                                <div class="row">
                                    <div class="col-lg-3 col-sm-12 col-md-6 movie" v-for="(movie, i) in movies" :key="i" style="padding-bottom: 30px">
                                        <div class="card">
                                            <div class="row">
                                                <div class="col-6 col-lg-12" style="padding-top: 0; padding-bottom: 0; position: relative">
                                                    <div @mousemove="showIconPlayAndOverlay(i, true)" @mouseleave="showIconPlayAndOverlay(i, false)" class="image-container" style="position: relative">
                                                        <img class="card-img-top" :src="movie.movieImage" alt="..." />
                                                        <div v-show="isShowOverlay[i]" class="overlay"></div>
                                                        <div v-show="isShowIconPlay[i]" class="icon-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
                                                            <font-awesome-icon @click="openDialogTrailer(movie.movieTrailer)" style="width: 50px; height: 60px; color: white" :icon="['fas', 'circle-play']" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 col-6" style="padding-top: 5px; padding-bottom: 0">
                                                    <h5 class="card-title" style="color: #337ab7; font-weight: 700">{{ movie.movieName }}</h5>
                                                    <p class="card-text"><span style="font-weight: 700">Thể loại: </span>{{ movie.movieTypeName }}</p>
                                                    <p class="card-text"><span style="font-weight: 700">Thời lượng: </span>{{ movie.movieDuration }} phút</p>
                                                    <router-link :to="`/chi-tiet-phim/${movie.movieName}`">
                                                        <a href="#" class="btn" @click="showMovieDetail(movie)" style="width: 100%">MUA VÉ</a>
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
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

<style  scoped>
.header-home {
    position: sticky;
    top: 0;
    z-index: 1000;
}

.main {
    width: 100%;
    height: auto;
}
.wrap-header {
    display: flex;
    justify-content: space-between;
    width: 100%;

    /* background: rgba(152, 145, 145, 0.43) ; */
    z-index: 0;
}

MegaMenu .p-menuitem-link {
    /* Add your custom styles here */
    color: #333; /* Example: Change text color */
    font-size: 16px; /* Example: Change font size */
    /* Add more styles as needed */
    background: red;
    margin-top: 10px;
}
.category {
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
}
.tittle-popular-courses {
    width: 20%;
    margin-bottom: 20px;
    border-left: 5px solid #28b1ff;
}
.image-course {
    object-fit: cover;
}
/* .v-carousel{
  z-index: 0 !important;
} */
.v-carousel-item {
    transition: transform 0.9s ease;
}
.movie .card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-0.7px) scale(1.01);
}

.movie .card {
    padding: 0;
    transition: transform 0.1s ease, box-shadow 0.3s ease;
    border: none;
}
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(199, 17, 17);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}

@media only screen and (max-width: 768px) {
    .title {
        font-size: 16px !important; /* Kích thước chữ cho màn hình nhỏ */
    }
}
@media only screen and (min-width: 768px) and (max-width: 992px) {
    .card-img-top {
        width: 137.5px;
        height: 217.59px;
    }
    .icon-play {
        width: 137.5px;
        height: 217.59px;
    }
}
@media only screen and (min-width: 992px) {
    .card-img-top {
        width: 100%;
        height: 370px;
    }
    .icon-play {
        width: 100%;
        height: 370px;
    }
}
.btn {
    background-size: 200% auto;
    border-radius: 5px;
    background: #0a64a7;
    color: #fff;
    font-size: large;
    font-weight: normal;
}
.btn:hover {
    background-image: linear-gradient(to right, #0a64a7 0%, #258dcf 51%, #3db1f3 100%) !important;
    color: #fff;
}

.icon-play {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.image-container {
    position: relative;
    border-radius: 20px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
}
.icon-play {
    z-index: 1;
}
.card-img-top {
    z-index: 0;
    border-radius: 20px;
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
</style>