<template>
  <div class="col-xl-10 col-lg-10 col-md-10 col-12 col-sm-10 flex xs:justify-center" style="margin-left: auto; margin-right: auto;margin-top: 35px; padding-bottom: 50px;">
    <div class="row">
        <div class="col-lg-2 col-12 col-sm-6 sm:justify-center" style="letter-spacing: -1px;">
            <img src="/img/logoBeta.png" alt="" style="margin-bottom: 13px;">
            <ul v-for="(intro, i) in introBeta" :key="i" style="margin-bottom: 6px;">
                <li>
                    <font-awesome-icon :icon="['fas', 'angle-right']"  style="width: 1.25em; line-height: 14px;font-size: 14px;"/>
                    <a href="" style="font-size: 14px; color: #000; font-family: sans-serif;">{{ intro.name }}</a>
                </li>
            </ul>
        </div>
        <div class="col-lg-4 col-sm-6 col-12 " style="display: flex; flex-direction: column;vertical-align: top;">
          <span>
            <h2 style="font-size: 20px;padding-bottom: 7px;margin: 0 0 25px;
            border-bottom: 4px solid transparent;
            border-image: linear-gradient(to right, #39adf0 0%, #075fa3 100%);
            border-image-slice:1 ;
            color: #333;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            float: left !important;"
            >CỤM RẠP PHIM</h2>
          </span>
          <ul v-for="(cinema, i) in cinemas" :key="i" style="margin-bottom: 6px; float: left;">
            <li>
              <font-awesome-icon :icon="['fas', 'angle-right']"  style="width: 1.25em; line-height: 14px;font-size: 14px;"/>
              <a href="" style="font-size: 14px; color: #000;letter-spacing: -1px;">{{ cinema.name }}</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-12 col-sm-6" style="display: flex; flex-direction: column;">
          <span>
            <h2 style="font-size: 20px;padding-bottom: 7px;margin: 0 0 25px;
            border-bottom: 4px solid transparent;
            color: #333;
            border-image: linear-gradient(to right, #39adf0 0%, #075fa3 100%);
            border-image-slice:1 ;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            float: left !important;"
            >KẾT NỐI VỚI CHÚNG TÔI</h2>
          </span>
          <ul class="social-icons">
            <li style="margin-right: 10px;">
              <a class="facebook" href="https://www.facebook.com/profile.php?id=100033756241650"></a>
            </li>
            <li style="margin-right: 10px;">
              <a class="youtobe" href="https://www.youtube.com/channel/UCJHy2A6Hd06RsxcIEvq9f_A"></a>
            </li>
            <li style="margin-right: 10px;">
              <a class="instagram" href="https://www.instagram.com/trong_quan.02/"></a>
            </li>
            <li style="margin-right: 10px;">
              <a class="tiktok" href="https://www.tiktok.com/@doantrongquan1"></a>
            </li>
          </ul>
          <img src="/img/dathongbao.png" alt="">

        </div>
        <div class="col-lg-3 col-12 col-sm-6" style="display: flex; flex-direction: column;letter-spacing: -1px;">
          <span>
            <h2 style="font-size: 20px;padding-bottom: 7px;margin: 0 0 25px;
            border-bottom: 4px solid transparent;
            color: #333;
            border-image: linear-gradient(to right, #39adf0 0%, #075fa3 100%);
            border-image-slice:1 ;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            float: left !important;"
            >LIÊN HỆ</h2>
          </span>
          <h5 style="color: #333;">CÔNG TY CỔ PHẨN ĐQT</h5>
          <p>Giấy chứng nhận ĐKKD số: 0373554045 - Đăng ký lần đầu ngày 08/09/2014 tại Sở Kế hoạch và Đầu tư Thành phố Hà Nội</p>
          <p>Địa chỉ trụ sở: Tầng 3, số 595, đường Giải Phóng, phường Giáp Bát, quận Hoàng Mai, thành phố Hà Nội</p>
          <p>Hotline: 1900 636807</p>
          <p>Email: Trongquan202@gmail.com</p>
          <h5 style="color: #333;">Liên hệ hợp tác kinh doanh</h5>
          <h5>Email: Trongquan202@gmail.com</h5>
          <h5>Điện thoại: 0373554038</h5>
        </div>
    </div>
  </div>
</template>

<script setup>
import  { ref } from 'vue';
const introBeta = ref([
  {name:'Tuyển dụng'},
  {name:'Giới thiệu'},
  {name:'Liên hệ'},
  {name:'F.A.Q'},
  {name:'Hoạt động xã hội'},
  {name:'Điều khoản sử dụng'},
  {name:'Chính sách thanh toán, đổi trả-hoàn vé'},
  {name:'Liên hệ quảng cáo'},
  {name:'Điều khoản bảo mật'},
  {name:'Hướng dẫn đặt vé online'},
])
const cinemas = ref([
  {name:'Beta Cinemas Lào Cai - Hotline 0358 968 970'},
  {name:'Beta Cinemas Trần Quang Khải, TP Hồ Chí Minh - Hotline 1900 638 362'},
  {name:'Beta Cinemas TRMall Phú Quốc, Kiên Giang - Hotline 0983 474 440'},
  {name:'Beta Cinemas Empire Bình Dương - Hotline 0934 573 748'},
  {name:'Beta Cinemas Quang Trung, TP Hồ Chí Minh - Hotline 0706 075 509'},
  {name:'Beta Cinemas Giải Phóng, Hà Nội - Hotline 0585 680 360'},
  {name:'Beta Cinemas Thanh Xuân, Hà Nội - Hotline 082 4812878'},
  {name:'Beta Cinemas Mỹ Đình, Hà Nội - Hotline 0866 154 610'},
  {name:'Beta Cinemas Đan Phượng, Hà Nội - Hotline 0983 901 714'},
  {name:'Beta Cinemas Thái Nguyên - Hotline 0867 460 053'},
  {name:'Beta Cinemas Thanh Hóa - Hotline 0325 360 249'},
  {name:'Beta Cinemas Bắc Giang - Hotline 0866 493 413'},
  {name:'Beta Cinemas Nha Trang, Khánh Hòa - Hotline 0399 475 165'},
  {name:'Beta Cinemas Biên Hòa, Đồng Nai - Hotline 0979 460 002'},
  {name:'Beta Cinemas Long Khánh, Đồng Nai - Hotline 0925 165 684'},
  {name:'Beta Cinemas Phú Mỹ, Bà Riạ Vũng Tàu - Hotline 0886 006 310'},
  {name:'Beta Cinemas Hồ Tràm, Bà Rịa Vũng Tàu - Hotline 0254 3788601'},
  {name:' Beta Cinemas Tân Uyên, Bình Dương - Hotline 0937 905 925'},
  {name:'Tải Ứng Dụng Beta Cinemas'}
])
</script>

<style scoped>
.social-icons {
    display: flex !important;
}
.social-icons li:hover a{
  background-position:0 -38px ;

}
a{
  transition: transfrom 0.2s ease !important;
}
a:hover{
  color: #337ab7 !important;
  transform: translateY(-1px) !important;
}
.facebook {
  background: url(	https://betacinemas.vn/assets/global/img/social/facebook.png) no-repeat;
}
.youtobe{
  background: url(https://betacinemas.vn/assets/global/img/social/youtube.png) no-repeat;
}

.instagram{
  background: url(https://betacinemas.vn/assets/global/img/social/instagram.png) no-repeat;
}
.social-icons li > a {
  width: 28px;
  height: 28px;
  display: block;
}
</style>