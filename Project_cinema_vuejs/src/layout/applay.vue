<template>
    <div>
        <div class="home" v-if="isShowHomePage" >
            <div  class="header">
                <Navbar/>
            </div>
            <div  v-if="isShowHomePage">
                <router-view/>
            </div>
            <div >
                <Footer/>
            </div>
        </div>
        <div v-if="isShowAdminPage" class="admin">
            <AppLayout />
        </div> 
    </div>


</template>

<script setup>
import {ref, onMounted} from 'vue'
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import AppLayout from '@/layout/AppLayout.vue';
import eventBus from '../eventBus';


// const isShowHomePage = ref(true);
// const isShowAdminPage = ref(false);
// const isShowFooter = ref(true)
// const isShowNavbar = ref(true)




// import SeatSelection from '@/pages/user/SeatSelection.vue';

</script>

<style scoped>
.header{
    position: sticky;
    top: 0;
    z-index: 1000;
}
</style>