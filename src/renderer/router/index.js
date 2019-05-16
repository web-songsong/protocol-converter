import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/',
      name: 'home',
      component: require('@/components/home').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
