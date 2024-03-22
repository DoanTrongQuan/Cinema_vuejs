<template>
  <div class="header" style="position: sticky; top:0; z-index: 1000;">
        <div  style="background: black;">
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-8" style="margin-left: auto !important; margin-right: auto !important; text-align: right;padding: 0;">
            <div v-if = "!currentUser"> 
                <router-link to="/login"><a href="" style="color: white;font-size: 15px;">Đăng nhập</a></router-link>
                <router-link to="/login"><a href="" style="color: white;margin-left: 10px;" >Đăng ký</a></router-link>
             </div>
             <div v-else>
              <div v-if="currentUser['roles'].includes('ROLE_USER')">             
                <v-menu class="menu-user" offset-y open-on-hover open-delay="1">
                    <template v-slot:activator="{ props, on }">
                      <span style="cursor: pointer; " v-bind="props" v-on="on">
                        <v-chip link pill ripple style="color: white;">
                          Xin chào: {{ currentUser.userName }}                      
                        </v-chip>
                      </span>
                    </template>
                      <v-card
                      class="mx-auto"
                      width="250"
                      >
                      <v-layout>
                        <v-navigation-drawer permanent absolute>
                          <v-list
                            :lines="false"
                            density="compact"
                            nav
                          >
                            <v-list-item
                              v-for="(menu, i) in menusUser" @click="handleMenuItemClick(menu)"
                              :key="i"
                              :value="menu"
                              color="primary"
                            >
                              <template v-slot:prepend>
                                <v-icon :icon="menu.icon"></v-icon>
                              </template>

                              <v-list-item-title v-text="menu.text"></v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-navigation-drawer>
                        <v-main style="height: 200px;"></v-main>
                      </v-layout>
                    </v-card>
                  </v-menu>
                </div>
                <div v-if = "currentUser['roles'].includes('ROLE_ADMIN')">
                  <router-link to="/admin">
                  <v-chip style="color: #ff9800;"
                  prepend-icon="mdi-marker"
                  @click="showAdminPage"
                  >
                  Quản trị
                </v-chip>
               </router-link>
                                <v-menu class="menu-user" offset-y open-on-hover open-delay="1">
                    <template v-slot:activator="{ props, on }">
                      <span style="cursor: pointer; " v-bind="props" v-on="on">
                        <v-chip link pill ripple style="color: white;">
                          Xin chào: {{ currentUser.userName }}                      
                        </v-chip>
                      </span>
                    </template>
                      <v-card
                      class="mx-auto"
                      width="250"
                      >
                      <v-layout>
                        <v-navigation-drawer permanent absolute>
                          <v-list
                            :lines="false"
                            density="compact"
                            nav
                          >
                            <v-list-item
                              v-for="(menu, i) in menusUser" @click="handleMenuItemClick(menu)"
                              :key="i"
                              :value="menu"
                              color="primary"
                            >
                              <template v-slot:prepend>
                                <v-icon :icon="menu.icon"></v-icon>
                              </template>

                              <v-list-item-title v-text="menu.text"></v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-navigation-drawer>
                        <v-main style="height: 200px;"></v-main>
                      </v-layout>
                    </v-card>
                  </v-menu>
                </div>
             </div>

        </div>  
    </div>

    <Disclosure class="header-content" as="nav" style="height: 100px;" v-slot="{ open }">
      <div class="mx-auto  max-w-7xl " style="height: 100%;">
        <div class="relative flex  " style="height: 100%; width: 100%;padding: 0 !important;">
          <div class="absolute inset-y-0 left-0 flex items-center md:hidden" >
            <!-- Mobile menu button-->      
              <DisclosureButton  class="relative  inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" style="width: 50px;height: 50px;" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton> 
          </div>
          <!-- <div class="flex flex-1 items-center justify-center " style="; align-items: center; float: right; height: 100%; width: 100%;"> -->
            <div class="row" style="height: 100%; align-items: center; width: 100%; padding: 0 ;">
            <div class="col-xs-12 col-sm-8 col-lg-4 ">
                <div style="display: flex;height: 100%; justify-content: center;">
                    <router-link to="/">
                      <div class="flex flex-shrink-0 items-center">
                        <img style="width: 100%; height: 55px;" class="h-8 w-auto" src="/img/logoBeta.png" alt="Your Company" />
                      </div>
                    </router-link>
                    <div style=" display: flex; align-items: center; margin-left: 35px;">
                        <div class="dropdown" style="border-radius: 16px; border: 1px solid black;">
                          <button style="color: black;font-size: 15px;font-weight: bold; font-family: Arial, Helvetica, sans-serif;width: 150px;align-items: center;" class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ nameOfCinema }}
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li v-for="(cinema, i) in cinemasRef" :key="i" class="dropdown-item" style="border-bottom: 1px solid #efefef;">
                              <div class="dropdown dropend">
                                <button style="color: #767f88;font-weight: 400;cursor: pointer;font-size: 14px" class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                  {{ cinema.address }}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                  <li v-for="(children, i) in cinema.children" :key="i"><a @click="getNameCinema(children)" class="dropdown-item" href="#">{{ children }}</a></li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-md-block d-none  col-xl-8 col-md-12" style="padding: 0 !important;">
              <div class="flex space-x-4 md:justify-center xl:justify-start">
                <a style="
                       margin-left: 27px !important;
                       padding: 0 !important;
                       font-weight: bold !important;
                       font-size: large !important;" 
                       v-for="item in navigation" 
                       :key="item.name" :href="item.href" 
                       :class="['text-black-900' ,'hover:#337ab7', 'rounded-md', 'px-3', 'py-2', 'text-sm', 'font-medium']" 
                       :aria-current="item.current ? 'page' : undefined"           
                >{{ item.name }}</a>
              </div>
            </div>
            </div>
        </div>
      </div>
  
      <DisclosurePanel class="md:hidden" style="background: black;">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <DisclosureButton v-for="item in navigation" 
          :key="item.name" as="a" 
          :href="item.href" 
          :class="['text-black-700', 'hover:black','block', 'rounded-md' ,'px-3', 'py-2']"
          :aria-current="item.current ? 'page' : undefined"  
          >
          {{ item.name }}
        </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>

  </div>

  </template>
  
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import {  ref, defineProps, computed} from 'vue';
import eventBus from '../eventBus.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import {
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import PublicService from "@/service/public.service.js";

const router = useRouter();
const store = useStore();
const props = defineProps({
  cinemas: Array
})

const currentUser = computed(() => {
  return store.state.auth.user;
})

const menusUser = ref([
        { text: 'Thông tin cá nhân', icon: 'mdi-account'},
        { text: 'Đổi mật khẩu', icon: 'mdi-key' },
        { text: 'Đăng xuất', icon: 'mdi-logout' },
])

const nameOfCinema = computed(() => {
  return store.state.cinema.nameOfCinema;
})

// const nameOfCinemaRef = ref('')
const cinemasRef = ref([])
// const { nameOfCinema, cinemas } = defineProps(['nameOfCinema', 'cinemas'])

eventBus.on('cinemas',(value) => {
    cinemasRef.value = value;
})
// eventBus.on('nameOfCinema',(value) => {
//   nameOfCinemaRef.value = value;
// })


const handleMenuItemClick = (menu) =>{
      if (menu.text === "Thông tin cá nhân") {

      }else if (menu.text === "Đổi mật khẩu"){

      } else {
          store.dispatch("auth/logout");
          router.push('/');
      }
}

const getNameCinema = (children) => {
  store.dispatch('cinema/changeNameOfCinema',children)

  // nameOfCinemaRef.value = children;
  eventBus.emit('getAllMovieByCinema', children)
}

// const showAdminPage = () => {
//   eventBus.emit('showAdminPage', true)
  
// }

  const navigation = ref([
    { name: 'LỊCH CHIẾU THEO RẠP', href: '#' },
    { name: 'PHIM', href: '#' },
    { name: 'RẠP', href: '#' },
    { name: 'GIÁ VÉ', href: '#'},
    { name: 'TIN MỚI', href: '#' },
    { name: 'NHƯỢNG QUYỀN', href: '#'},
  ])
  </script>

<style scoped>
.header-content{
  background: rgb(255, 255, 255);
}
.dropdown-item{
  padding: 0 !important;
  
}
.dropdown-item:hover {
  color: black;
}
.dropdown:hover > .dropdown-menu, .dropend:hover > .dropdown-menu{
  display: block;
}
/* .dropend .dropdown-menu li {
  padding-left: 10px;
} */
.dropdown button {
  width: 100% ;
  display: flex;
  justify-content: space-between;
}
@media screen and (min-width: 577px) {
  .dropend:hover > .dropdown-menu{
  position: absolute;
  top: 0;
  left: 100%;

}
}
  </style>