import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import trade from '@/page/trade'

import discover from '@/page/discover'
import match from '@/page/match'
import quote from '@/page/quote'
import home from '@/page/account/home/home'
import login from '@/page/account/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/quote',
      name: 'quote',
      component: quote
    },
    {
      path: '/trade',
      name: 'trade',
      component: trade
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/discover',
      name: 'discover',
      component: discover
    },
    {
      path: '/match',
      name: 'match',
      component: match
    },
    
    
    
    
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
