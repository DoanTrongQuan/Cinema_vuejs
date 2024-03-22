<template>
<div>
<LoginNavbar class="header" />

      <div class="container-fluid text-center form-signup">
        <div style="width:100%;height:100%;position:relative"> 
         <h3>Tạo tài khoản của bạn</h3>
         <p>Học tập và giao lưu với hàng triệu học viên trên mọi miền đất nước.</p>
         <div class="row" style="width:100%; height:42px; margin-bottom:18px ">
          <div class="col-sm-6"  >
              <a href="" class="fb" style="width:273px !important; height:42px !important; display:flex;border-radius:4px; ">
                <p style="margin-left:50px">Đăng ký qua Facebook</p>
              </a>
          </div>
           <div class="col-sm-6" >
              <a href="" class="gg" style="width:273px !important; height:42px !important; display:flex;border-radius:4px; ">
                <p style="margin-left:50px">Đăng ký qua Google</p>
              </a>
          </div>     
         </div>
         <div class="row" style="width:100%; height:42px; ">
           <div class="col-sm-6"  >
              <a href="" class="yh" style="width:273px !important; height:42px !important; display:flex;border-radius:4px; ">
                <p style="margin-left:50px">Đăng ký qua Yahoo</p>
              </a>
          </div>
         <div class="col-sm-6"  >
              <a class="ap" href="" style="width:273px !important; height:42px !important; display:flex;border-radius:4px; ">
                <p style="margin-left:50px">Đăng ký qua Apple</p>
              </a>
          </div>  
         </div>
         <div style="display:flex;">
            <div style="width:45% !important ; border-top:1px solid #a9a9a9; margin-top:25px; "></div>
            <span style="width:10%; float:left; text-align:center; color:#303030; margin-top:11px">Hoặc</span>
            <div style="width:43.7% !important ; border-top:1px solid #a9a9a9; margin-top:25px; "></div>
          </div>
          <form @submit.prevent="submit">
           
            <v-text-field class="input" dense
              variant="outlined"
              v-model="user.fullName.value"
              label="Họ và tên"
              density="compact"
              clearable
              required
             :error-messages="user.fullName.errorMessage"
            ></v-text-field>

            <v-text-field class="input" dense
              variant="outlined"
              clearable
              required
              density="compact" 
              v-model="user.email.value"
              label="Email"
              type="email"
              :error-messages="user.email.errorMessage"
            ></v-text-field>

            <div class="row">
              <v-text-field class="col-sm-6 input" dense 
              type = "password"
              clearable
              required
              density="compact"
              variant="outlined"
              v-model="user.password.value" 
              label="Mật khẩu"
              :error-messages="user.password.errorMessage"
            ></v-text-field>
            <v-text-field class="col-sm-6 input" dense 
              type = "password"
              clearable          
              density="compact"
              variant="outlined"
              v-model="user.confirmPassword.value"
              label="Xác nhận mật khẩu"
              :error-messages="user.confirmPassword.errorMessage"
            ></v-text-field>
            </div>
            <div class="row" >
            <p style="color:#000; font-size:11px; font-style:italic;">(*) Khi bấm vào đăng ký tài khoản, bạn chắc chắn đã đọc và đồng ý với 
            <a href="https://hocmai.vn/privacy2.php">Chính sách bảo mật, Điều khoản dịch vụ và chính sách tư vấn</a>
             của khóa hoc.</p>
          </div>
            <div class="row" style="background:#03a9f4; width:100%;height:45px; border-radius:20px; margin-left:0.2px">
                <button type = "submit" style="color:white; font-size: 14px;line-height: 50px; font-weight:bold">ĐĂNG KÝ</button>
            </div>
            </form>
         </div>
      </div>
      <FooterLogin/>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import FooterLogin from '../components/user/FooterLogin.vue';
import LoginNavbar from '../components/user/LoginNavbar.vue';
import { useField, useForm } from 'vee-validate';
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {ref, reactive} from 'vue'

const store = useStore();
const router = useRouter();
const components = {
  LoginNavbar,
  FooterLogin,
};

const { handleSubmit, handleReset } = useForm();

const errorMessage =  ref('')
const user = reactive({
  fullName: useField('fullName', (value) => {
    if (!value) {
      return 'Tên không được để trống.';
    } else if (value?.length < 3) {
      return 'Tên phải lớn hơn 3 ký tự.';
    }
    return true;
  }),
  email: useField('email', (value) => {
    if (!value) {
      return 'Email không được để trống.';
    } else if (/^[a-z.-.0-9]+@[a-z.-]+\.[a-z]+$/i.test(value)) {
      return true;
    }
    return 'Định dạng email không hợp lệ.';
  }),
  password: useField('password', (value) => {
    if (!value) {
      return 'Mật khẩu không được để trống.';
    } else if (value?.length >= 3) {
      return true;
    }
    return 'Mật khẩu phải chứa ít nhất 3 ký tự.';
  }),
  confirmPassword: useField('confirmPassword', (value) => {
    if (!value) {
      return 'Xác nhận mật khẩu không được để trống.';
      } else if (value !== user.password.value) {
      return 'Xác nhận mật khẩu không khớp';
      }
    return true;
    }),
  });

  const loggedIn = computed(() => store.state.auth.status.loggedIn);

  onMounted (() =>{
      if (loggedIn) {
      router.push("/signup");
    } 
  })
  const submit = handleSubmit( (user) => {
    //  this.message = "";
      console.log(user)

      store.dispatch("auth/register", user).then(
        (data) => {
          console.log(data.message)
          if(data.message === "Đăng kí thành công"){
            alert(data.message)
          } else if (data.message ==="Email already exists"){
            console.log(data.message)
            alert("Email đã tồn tại")
          } 
        },
        (error) => {

        }
      );

});

//   const submit = handleSubmit(async (user) => {
//   try {
//     const response = await store.dispatch("auth/register", user);
//     if (response.data || response.data.message === "Đăng kí thành công") {
//       console.error("Đăng kí không thành công:", response.data);
//       alert(response);
//     } else {
      
//       alert("Đăng kí không thành công");
//     }
//   } catch (error) {
//     console.error("Có lỗi xảy ra trong quá trình đăng ký:", error);
//     alert("Có lỗi xảy ra trong quá trình đăng ký");
//   }
// });

</script>
  
<style scoped >
.form-signup{
  height: auto;
  padding-top:15px;
  padding-left:480px;
  padding-right:480px;
  z-index: 0;
}
.header{
  z-index: 1;
}

.col-sm-6 a{ 
  text-decoration: none;
  color:white;
   float:left; 
   padding:5px 5px;
   line-height: 30px;
}
.fb{
  background: url(https://hocmai.vn/loginv2/images/custom/facebook.png) no-repeat  10px 12px #4267b2 ;
  font-weight: bold;

}
.gg{
  background: url(https://hocmai.vn/loginv2/images/custom/google.png) no-repeat #dc4e41 10px 12px;
  font-weight: bold;
}
.yh{
  background: url(	https://hocmai.vn/loginv2/images/custom/yahoo.png) no-repeat  10px 12px #8921b4 ;
  font-weight: bold;
}
.ap{
  background: url(https://hocmai.vn/loginv2/images/custom/apple.png) no-repeat  10px 12px #131212 ;
  font-weight: bold;
}
.input{
  margin-top:8px;
}
.form-group{
  margin-top: 15px;
}
</style>