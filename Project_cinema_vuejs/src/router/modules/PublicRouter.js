const PublicRouter = [
    {
        path: '/',
        name: 'home',
        component: () => import( '@/pages/Home.vue')
        }, 
        {
          path: '/login',
          name: 'login',
          component: () => import( '@/pages/Login.vue'),
          meta: {
            keepAlive: true, // Thêm thuộc tính keepAlive
          },
        },
        {
          path: '/chi-tiet-phim/:movieName',
          name: 'movieDetail',
          component: () => import( '@/pages/MovieDetail.vue'),
        }
]

export default PublicRouter