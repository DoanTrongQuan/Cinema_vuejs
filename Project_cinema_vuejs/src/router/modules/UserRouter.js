const UserRouter = [
    {
        path: '/chon-ghe',
        name: 'SeatSelection',
        component: () => import( '@/pages/user/SeatSelection.vue')
      },
      {
        path: '/dat-ve',
        name: 'BookTicket',
        component: () => import( '@/pages/user/BookTicket.vue')
      },

]

export default UserRouter