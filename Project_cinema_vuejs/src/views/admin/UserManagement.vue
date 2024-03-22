<script setup>
import { ref, reactive, onMounted } from 'vue'
import AdminService from '@/service/admin/admin.service.js';
import eventBus from '@/eventBus.js';
import { useRouter} from 'vue-router'
import { VsNotification } from 'vuesax-alpha';
import { watchEffect } from 'vue';

   const search = ref('');
   
   const color = ref('success');
   const router = useRouter();
   const usersInPage = ref([
      { value: '5',label: '5' },
      { value: '10',label: '10' },
      { value: '15',label: '15' },
      { value: '20',label: '20' },
    ]);

    const headers = ref([
          { title: 'ID', key: 'id', align: 'end', },
          { title: 'Email', align: 'center',key: 'email',sortable: false,class: 'bold-title',},  
          { title: 'Hình ảnh', key: 'avatar',align: 'center', },
          { title: 'Họ và tên', key: 'userName',align: 'center', },
          { title: 'Ngày sinh', key: 'dateOfBirth',align: 'center', },
          { title: 'Giới tính', key: 'gender',align: 'center', },
          { title: 'Địa chỉ', key: 'address',align: 'center', }, 
          { title: 'Tên', key: 'firstName',align: 'center', } ,
          { title: 'Họ', key: 'lastName',align: 'center', } ,
          { title: 'Quyền hạn', key: 'role',align: 'center', } ,
          { title: 'Trạng thái', key: 'isActive',align: 'center', }  , 
          { title: 'Tác vụ', key: 'action',align: 'center', }  
      ])
    const users = ref([
      // {email:"fsdfsdf",image:'fesdfsdf',fullName:'fasfsdg',dayOfBirth:'fasf',gender:'fsafsdg',address:'fsfs',firstName:'dfasf',lastName:"fdsgsdgd",role:'tgd',isActive:'1'}
    ]);
    const numberPageAndPageSize = reactive({ usersPerPage:'5' , page: '1' });
    const totalPage = ref();
    const totalUser = ref();


    const getUserByPage = async () => {
      try {
        const res = await AdminService.getAllUser(numberPageAndPageSize);
        users.value = res.content;
        totalPage.value = res.totalPages;
        totalUser.value = res.totalElements;
        
      } catch (error) {
        alert("error serve")
      }
    };

    onMounted(() => {
        getUserByPage();
    });

    watchEffect(() => {
      getUserByPage();
    });
    
    const isShowEditUser = ref(false)

    const showEditUser = (userID) => {
      isShowEditUser.value = true;
      router.push(`/management/user/EditUser/${userID}`);
    }

    eventBus.on('hiddenAddUser', (value) => {
      isShowEditUser.value = value;
    })

    const isShowConfirmDialog= ref(false)

    const userid = ref(null)
    const showConfirmDialog = (ID) => {
      isShowConfirmDialog.value = !isShowConfirmDialog.value
      userid.value = ID;
    }

    const openNotification = (position = null, color, title, message) => {
      VsNotification({
            progress: 'auto',
            color,
            position,
            title: title,
            text: message
          })
    }
    const lockUser = async() => {
      try {
        const res = await AdminService.lockUser(userid.value);
        openNotification('top-right', 'success', 'Khóa tài khoản thành công', res.data)
        getUserByPage();
      } catch (error) { 
        if(error.response.status === 400){
          openNotification('top-right', 'danger', 'Khóa tài khoản thất bại!', error.response.data)
        }
        else if(error.response.status === 404){
          openNotification('top-right', 'danger', 'Khóa tài khoản thất bại!', error.response.data)
        } else {
          openNotification('top-right', 'danger', 'Khóa tài khoản thất bại!', error.response.data)
        }
      }
      isShowConfirmDialog.value = false
    }



</script>
<template>
  <div>
    <Toast />
    <div v-if="isShowEditUser" >
      <router-view/>
    </div>
  <div class="UserManagement" v-if="!isShowEditUser">
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon color="green" icon="mdi-video-input-component"></v-icon> &nbsp;
      Danh sách người dùng
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        color="black"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="Search"
        single-line
        flat
        hide-details
        variant="solo"
      ></v-text-field>
    </v-card-title>
      
      <v-divider style="margin-top: 10px;"></v-divider>
      <div>
      <v-data-table style="margin-top: 10px;" hover :headers="headers" v-model:search="search" :items="users" >
        <template v-slot:item.action = "{ item }">
          <v-icon
          size="small"
          color="red"
          class="me-2"
          @click="showEditUser(item.id)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          color="red"
          @click="showConfirmDialog(item.id)"
        >
          mdi-account-lock
        </v-icon>
        </template>

        <template v-slot:item.avatar="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img
              :src="item.avatar"
              height="64"
              cover
            ></v-img>
          </v-card>
        </template>
        <template #bottom></template>
    </v-data-table>
    <vs-dialog width="550px" not-center v-model="isShowConfirmDialog">
        <template #header>
          <h4 class="not-margin">
            Bạn có chắc chắn muốn khóa tài khoản này!
          </h4>
        </template>


        <div class="con-content">
          <p>
            {{  }}
          </p>
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button @click="lockUser"  transparent>
              Khóa
            </vs-button>
            <vs-button @click="isShowConfirmDialog = false" dark transparent>
              Hủy
            </vs-button>
          </div>
        </template>
      </vs-dialog>
  </div>
  <div class="center con-pagination con-selects v-table-footer">
      <!-- <span>Items per page
        <Select v-model="numberPageAndPageSize.usersPerPage" size="large" style="width:60px" label="5" >
            <Option v-for="(user,index) in usersInPage" @click="getUserByPage" :value="user.value"  :key="user.value">{{ user.label }}</Option>
        </Select>
      </span> -->
        <vs-pagination :page-sizes = "[5,10,15,20]" 
          :default-page-size = "5" 
          :color="color" 
          v-model:page-size ="numberPageAndPageSize.usersPerPage" 
          progress 
          v-model:current-page="numberPageAndPageSize.page" 
          @change ="getUserByPage"  
          :total="totalUser" />
  </div>
  </v-card>
  <div class="width:100%;height:500px">

  </div>
  </div>
</div>
</template>


<style scoped>
  /* .UserManagement {
    transition: transform 0.2s ease;
  }
  .UserManagement:hover {
    transform: translateY(-3px);
  } */
  .con-pagination .con-radio{
     display: flex;
     align-items: center;
     justify-content: flex-start;
  }
  .v-table-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
.vs-select{
    padding: 7px 50px !important;
}
.vs-radio-content{
    margin: 10px;
}   
.vs-pagination-content{
    margin: 10px 0px;
}
.button-addUser{
  transition: transform 0.2s ease ;
}
.button-addUser:hover {
  transform: translateY(2px);
}
.con-footer{
  display: flex;
  float: right;
}
</style>