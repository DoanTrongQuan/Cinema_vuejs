<template>
  <div>
      <div>
        <Navbar/>
      </div>
        <div v-if="isShowProgressConfifmRegister">
          <v-progress-linear
            indeterminate
            color="yellow-darken-2"
          ></v-progress-linear>
        </div>
  
        <div class="center"  >
          <vs-dialog v-model="isShowVerifyAcc" not-close>
          <div style="width: 100%; height: 100%; display: flex; justify-content: center;flex-direction: column">
            <h3 class="text-h6 mb-4" style="text-align: center;">Xác minh tài khoản</h3>
  
            <div class="text-body-2" style="text-align: center;">
             Chúng tôi đã gửi mã xác nhận tới {{userRegister.email.value }}<br>
  
              Vui lòng kiểm tra email để xác thực tài khoản.
            </div>
  
            <v-sheet color="surface">
              <v-otp-input
                
                v-model="confirmCode"
                type="password"
                variant="solo"
              ></v-otp-input>
            </v-sheet>
  
            <v-btn
            style="margin-left: 14%;"
              @click="confirmRegister"
              class="my-4"
              color="purple"
              height="40"
              text="Xác thực"
              variant="flat"
              width="70%"
            ></v-btn>
  
            <div class="text-caption" style="text-align: center;">
              Không nhận được mã? <a href="#" @click.prevent="resendConfirmCode">Gửi lại</a>
            </div>
  
          </div>
  
          </vs-dialog>
        </div>
  
        <div>
         <vs-dialog scroll v-model="isShowPrivatePoli" lock-scroll not-close auto-width>
            <template #header>
              <h3>Chính sách bảo mật</h3>
            </template>
            <div class="con-content-scroll">
              <h5>Mục đích và phạm vi truy cập</h5>
              <p>
                Việc thu thập dữ liệu chủ yếu trên website Betacinemas.vn bao gồm: email, điện thoại, 
                số chứng minh thư nhân dân/căn cước công dân, mật khẩu đăng nhập, địa chỉ khách hàng (thành viên).
                 Đây là các thông tin mà website Betacinemas.vn cần thành viên cung cấp bắt buộc khi đăng ký sử dụng 
                 dịch vụ và để website Betacinemas.vn liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên website 
                 Betacinemas.vn nhằm đảm bảo quyền lợi cho người tiêu dùng.
              </p>
  
              <h5>Phạm vi sử dụng thông tin</h5>
  
              <p>
                Vuesax is a relatively new framework with a refreshing design and in
                the latest trends, vuesax based on vuejs which means that we go hand
                in hand with one of the most popular javascript frameworks in the
                world and with a huge community with which you will have all the help
                and documentation to create and make your project
                <br />
                <br />
                - Vuesax, unlike many frameworks, is designed from scratch and we are
                not anchored to any design line, this is something great since your
                project is going to be unique and very different from the others
  
                <br />
                <br />
                - We are focused on the quick and easy creation of projects giving a
                beautiful visual line but without forgetting the personalization and
                independence of the developer
  
                <br />
                <br />
                - Vuesax uses native css variables for better customization and
                production changes such as changing to dark theme or changing the main
                color of the entire application with few javascript lines
                <br />
                <br />
  
                - Vuesax is a frame designed to have a great visual impact and that is
                always in trend with respect to design.
                <br />
                <br />
  
                - An open-source community to create, improve and correct any
                component or function.
                <br />
                <br />
  
                - Independent components to avoid importing unnecessary code.
                <br />
                <br />
  
                - Markdown documents for better sustainability.
                <br />
                <br />
  
                - and much more.
              </p>
            </div>
          </vs-dialog> 
      </div>
        <div class="container-fluid col-12 col-md-8 col-lg-6 col-xl-5 text-center form-signup">
          <v-card>
            <v-tabs
              v-model="tab"
              color="deep-purple-accent-4"
              align-tabs="center"
            >
              <v-tab :value="1" style="font-size: large;">ĐĂNG NHẬP</v-tab>
              <v-tab :value="2" style="font-size: large;">ĐĂNG KÝ</v-tab>
            </v-tabs>
            <v-window v-model="tab" style="">
              <v-window-item :value = "1"> 
                <v-container fluid>
                  <form @submit.prevent="submit">
                    <v-text-field class="input" dense
                      variant="outlined"
                      clearable
                      required
                      density="compact" 
                      v-model="userLogin.email"
                      label="Email"
                      type="email"
                      :rules="emailRules"
                    ></v-text-field>
                    <v-text-field class="input" dense 
                      type = "password"
                      clearable
                      required
                      density="compact"
                      variant="outlined"
                      v-model="userLogin.password" 
                      label="Mật khẩu"
                      :rules="passwordRules"
                  ></v-text-field>
                  <div class="row" style="margin:5px 5%; margin-top: 15px;">
                    <a href="https://hocmai.vn/loginv2/forgot_password.php" style="text-decoration: none;font-size:12px">Quên mật khẩu?</a>
                  </div>
                  <div class="row" style="background:#03a9f4; width:100%;height:45px; border-radius:20px; margin-left:0.2px;">
                      <button  @click ="Login"  style="color:white; font-size: 14px;line-height: 50px; font-weight:bold">ĐĂNG NHẬP</button>
                  </div>
                  <div class="row" style="background-image: linear-gradient(to right, #fc3606 0%, #fda085 51%, #fc7704 100%) !important; width:100%;height:45px; border-radius:20px; margin-left:0.2px; margin-top: 10px;">
                    <button type = "submit" style="color:white; font-size: 14px;line-height: 50px; font-weight:bold">ĐĂNG NHẬP VỚI FACEBOOK</button>
                  </div>
                  </form>
                </v-container>
              </v-window-item>
              <v-window-item :value = "2">
                <v-container fluid>
                  <form @submit.prevent="submit">
                  <div class="row" style="margin-top: 13px;">
                    <div class="col-md-6 col-12 input-info-register">
                      <v-text-field class="input" dense
                      variant="outlined"
                      v-model="userRegister.fullName.value"
                      label="Họ và tên"
                      density="compact"
                      clearable
                      required
                      :error-messages="userRegister.fullName.errorMessage"
                      ></v-text-field>
                    </div>
                    <div class="col-md-6 col-12 input-info-register">
                      <v-text-field class="input" dense
                      variant="outlined"
                      v-model="userRegister.name.value"
                      label="Tên"
                      density="compact"
                      clearable
                      required
                      :error-messages="userRegister.name.errorMessage"
                      ></v-text-field>
                    </div>
                  </div>     
  
                <div class="row" style="margin-top: 7px;">
                  <div class="col-12 col-md-6 input-info-register">
                    <v-text-field class="input" dense
                      variant="outlined"
                      clearable
                      required
                      density="compact" 
                      v-model="userRegister.email.value"
                      label="Email"
                      type="email"
                      :error-messages="userRegister.email.errorMessage"
                    ></v-text-field>
                  </div> 
                  <div class="col-12 col-md-6 input-info-register">
                    <v-text-field class="input" dense
                      variant="outlined"
                      clearable
                      required
                      density="compact" 
                      v-model="userRegister.phoneNumber.value"
                      label="Số điện thoại"
                      type="phoneNumber"
                      :error-messages="userRegister.phoneNumber.errorMessage"
                    ></v-text-field>
                  </div>               
                </div>
                <div class="row" style="margin-top: 7px;">
                  <v-text-field class="col-sm-6 input" dense 
                  type = "password"
                  clearable
                  required
                  density="compact"
                  variant="outlined"
                  v-model="userRegister.password.value" 
                  label="Mật khẩu"
                  :error-messages="userRegister.password.errorMessage"
                ></v-text-field>
                <v-text-field class="col-sm-6 input" dense 
                  type = "password"
                  clearable          
                  density="compact"
                  variant="outlined"
                  v-model="userRegister.confirmPassword.value"
                  label="Xác nhận mật khẩu"
                  :error-messages="userRegister.confirmPassword.errorMessage"
                ></v-text-field>
                </div>
                <div class="row" style="margin-top: 7px;">
                  <p style="color:#000; font-size:11px; font-style:italic;">(*) Khi bấm vào đăng ký tài khoản, bạn chắc chắn đã đọc và đồng ý với 
                  <a style="color: blue;" href="" @click.prevent = "isShowPrivatePoli  = !isShowPrivatePoli">Chính sách bảo mật, Điều khoản dịch vụ và chính sách tư vấn</a>
                  của khóa hoc.</p>
                </div>
                <div class="row" style="background-image: linear-gradient(to left, #03a8f473 0%, #03a9f4 51%, #606ac1 100%) !important; width:100%;height:45px; border-radius:20px; margin-left:0.2px; margin-top: 10px;">
                  <button  type = "submit" style="color:white; font-size: 14px;line-height: 50px; font-weight:bold">ĐĂNG KÝ</button>
                </div>
                <div class="row" style="background-image: linear-gradient(to right, #fc3606 0%, #fda085 51%, #fc7704 100%) !important; width:100%;height:45px; border-radius:20px; margin-left:0.2px; margin-top: 10px;">
                  <button type = "submit" style="color:white; font-size: 14px;line-height: 50px; font-weight:bold">ĐĂNG KÝ VỚI FACEBOOK</button>
                </div>
                </form>
                </v-container>
              </v-window-item>
            </v-window>
          </v-card>
        </div>
        <div class="footer">
          <Footer/>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed } from 'vue';
  import Footer from '../components/Footer.vue';
  import Navbar from '../components/Navbar.vue';
  // import PrivatePolicy from '@/components/PrivatePolicy.vue';
  import eventBus from '../eventBus';
  import { useField, useForm } from 'vee-validate';
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import AuthService  from '../service/auth.service.js'
  
  const store = useStore();
  const router = useRouter();
  
  const isShowPrivatePoli = ref(false)
  const isShowVerifyAcc = ref(false);
  
  const confirmCode = ref('');
  const isShowProgressConfifmRegister = ref(false)
  const tab = ref(null);
  const { handleSubmit, handleReset } = useForm();
  
  const userLogin = reactive({
    email:'',
    password:''
  })
  
  const emailRules = [
    value => {
      if (!value) return 'Email không được để trống.'
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Email không đúng định dạng.'
      return true
    }
  ];
  
  const passwordRules = [
    value => {
      if (!value) return 'Mật khẩu không được để trống.'
      if (value.length < 3) return 'Mật khẩu phải chứa ít nhất 3 ký tự.'
      return true
    }
  ];
  
  const Login = async() => {
    console.log(userLogin.email)
    try {
      const res = await store.dispatch("auth/login", userLogin);
      router.push("/");
      
    } catch (error) {
     if(error.response.status === 404){
      alert(error.response.data)
     } else if(error.response.status === 401){
      alert(error.response.data);
     }else if(error.response.data === "User account is disabled"){
      alert("error.response.data")
     } else{
      alert("Error serve")
     }
    }
  }
  
  const userRegister = reactive({
    fullName: useField('fullName', (value) => {
      if (!value) {
        return 'Họ và tên không được để trống.';
      } else if (value?.length < 3) {
        return 'Họ và tên phải lớn hơn 3 ký tự.';
      }
      return true;
    }),
    name:useField('name', (value) => {
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
  
    phoneNumber: useField('phoneNumber', (value) => {
    if (!value) {
      return 'Số điện thoại không được để trống';
    } else if (/^[0-9]+$/.test(value)) {
      return true;
    }
    return 'Số điện thoại không hợp lệ.';
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
        } else if (value !== userRegister.password.value) {
        return 'Xác nhận mật khẩu không khớp';
        }
      return true;
      }),
    }); 
  
  
    const submit = handleSubmit(async(userRegister) => {
      isShowProgressConfifmRegister.value = true
      try {
        const res = await store.dispatch("auth/register", userRegister);
        isShowProgressConfifmRegister.value = false
        isShowVerifyAcc.value = true;
      } catch (error) {
       if(error.response.status === 400){
        isShowProgressConfifmRegister.value = false
        alert("Email này đã tồn tại")
       } else{
        isShowProgressConfifmRegister.value = false
        alert("Error serve")
       }
      }
  });
  
  const confirmRegister = async() => {
      try {
        // console.log(userRegister.fullName.value)
        // console.log(confirmCode)
        const res = await AuthService.confirmRegister(userRegister, confirmCode.value)
        isShowVerifyAcc.value = false;
        alert("Đăng kí thành công")
      } catch (error) {
        if(error.response.status === 404){
          alert("Mã không tồn tại")
        }
        else if(error.response.status === 406){
          alert("Mã hết hạn")
        }else{
          alert("error serve")
        }
      }   
  }
  
  const resendConfirmCode = async() => {
    console.log(userRegister)
    isShowProgressConfifmRegister.value = true
      try {
        const userInfo = {
        fullName: userRegister.fullName.value,
        email: userRegister.email.value,
        phoneNumber: userRegister.phoneNumber.value,
        password: userRegister.password.value,
        confirmPassword: userRegister.confirmPassword.value
      };
        const res = await AuthService.sendConfifmCodeRegister(userInfo);
        isShowProgressConfifmRegister.value = false
        isShowVerifyAcc.value = true;
      } catch (error) {
       if(error.response.status === 400){
        isShowProgressConfifmRegister.value = false
        alert("Email này đã tồn tại")
       } else{
        isShowProgressConfifmRegister.value = false
        alert("Error serve")
       }
      }
  }
const nameOfCinema = ref('CX Hà Nội')

const cinemas = reactive([
        { address: 'Hà Nội',children: []},
        { address: 'TP.Hồ Chí Minh',children: []},
        { address: 'Bắc Giang',children: []},
        { address: 'Đồng Nai',children: []},
        { address: 'Khánh Hòa',children: []},
        { address: 'Thái Nguyên',children: []},
        { address: 'Thanh Hóa',children: []},
        { address: 'Bà Rịa-Vũng Tàu',children: []},
        { address: 'Bình Dương',children: []},
        { address: 'Kiên Giang',children: []},
        { address: 'Lào Cai',children: []},
])
  //nhận giá trị biến nameOfCinema mới nhất sau khi thay đổi nameOfCinema ở Navbar
  eventBus.on('changeValueNameOfCinema',(nameOfCinemaNew) => {
        nameOfCinema.value = nameOfCinemaNew;
        getAllMoviesByCinema(nameOfCinema.value);
    });
    //Lấy tất cả cinema theo address
    const getAllCinemas = async() => {
        for (const cinema of cinemas) {
          try {

            const address = cinema.address;
            const res = await PublicService.getAllCinemaByAddress(address);
            cinema.children = res.data;
            
          } catch (error) {
            // console.error('Error:', error);
          }
        }
      }
      onMounted (
        async () => {
              try {
                await getAllCinemas();
              } catch (error) {
                console.error('Error:', error);
              }
        })
  </script>
  
  
  <style scoped >
  .form-signup{
    height: auto;
    margin-left: auto;
    margin-right: auto;
    z-index: 0;
    background: white;
    padding-bottom: 50px;
  }
  .header{
    position: sticky;
    top:0;
  }
  
  .col-sm-6 a{ 
    text-decoration: none;
    color:white;
     float:left; 
     padding:5px 5px;
     line-height: 30px;
  }
  
  
  .input-info-register {
      padding-bottom: 0 !important;
      padding-top: 0 !important;
  }
  .verify-account p {
    margin: 20px 0px;
    position: relative;
    display: block;
    font-size: 0.9rem;
    width: 100%;
    z-index: 100000 !important;
  }
  </style>