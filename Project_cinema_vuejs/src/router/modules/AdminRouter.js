import AppLayout from '@/layout/AppLayout.vue';

const AdminRouter =[
    {
        path: '/post',
        name: 'post',
        component: () => import( '@/pages/Post.vue'),
        meta: {
          keepAlive: true, // Thêm thuộc tính keepAlive
        },
      },
    {
        path: '/admin',
        component: AppLayout,
        children: [
          {
            path: '', 
            redirect: 'dashboard', 
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/admin/Dashboard.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/user',
            name: 'ManagementUser',
            component: () => import('@/views/admin/UserManagement.vue'),
            children: [
              {
                path:'/management/user/EditUser/:userID',
                name:'AddUser',
                component: () => import('@/views/admin/EditUser.vue'),
                props:true
              }
            ]
          },
          {
            path: '/management/movie',
            name: 'ManagementMovie',
            component: () => import('@/views/admin/MovieAdmin.vue'),
            // children: [
            //   {
            //     path:'/management/movie/EditMovie/:movieId',
            //     name:'EditMovie',
            //     component: () => import('@/views/admin/EditUser.vue'),
            //     props:true
            //   }
            // ]
          },
          {
            path: '/management/schedule',
            name: 'ManagementSchedule',
            component: () => import('@/views/admin/ScheduleAdmin.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },    
          },
          {
            path: '/management/bill',
            name: 'ManagementBill',
            component: () => import('@/views/admin/BillAdmin.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/food',
            name: 'ManagementFood',
            component: () => import('@/views/admin/FoodAdmin.vue'),
            // children: [
            //   {
            //     path:'/management/food/EditFood/:foodId',
            //     name:'EditFood',
            //     component: () => import('@/views/admin/EditUser.vue'),
            //     props:true
            //   }
            // ]
          },
          {
            path: '/management/cinema',
            name: 'ManagementCinema',
            component: () => import('@/views/admin/CinemaAdmin.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/room',
            name: 'ManagementRoom',
            component: () => import('@/views/admin/RoomAdmin.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/seat',
            name: 'ManagementSeat',
            component: () => import('@/views/admin/SeatAdmin.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/voucher',
            name: 'ManagementVoucher',
            component: () => import('@/views/admin/VoucherAdmin.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/banner',
            name: 'ManagementBanner',
            component: () => import('@/views/admin/BannerAdmin.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/task',
            name: 'ManagementTask',
            component: () => import('@/views/admin/TaskManagement.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/contact-evaluation',
            name: 'ManagementContactEvaluation',
            component: () => import('@/views/admin/ContactEvaluation.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
          {
            path: '/management/map',
            name: 'ManagementMap',
            component: () => import('@/views/admin/MapManagement.vue'),
            meta: {
              keepAlive: true, // Thêm thuộc tính keepAlive
            },
          },
        ],
        meta: {
          keepAlive: true, // Thêm thuộc tính keepAlive
        },
      },  
]

export default AdminRouter