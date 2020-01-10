import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/Home.vue'
import GenTrade from "@/widgets/GenTrade/GenTrade.vue"
import GenPrintF from "@/widgets/GenPrintF/GenPrintF.vue"
import GenInterface from "@/widgets/GenInterface/GenInterface.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect:"/GenTrade",
      component: Home
    },
    {
      path: '/GenTrade',
      name: 'GenTrade',
      component: GenTrade
    },
    {
      path: '/GenPrintF',
      name: 'GenPrintF',
      component: GenPrintF
    },
    {
      path: '/GenInterface',
      name: 'GenInterface',
      component: GenInterface
    },
  ]
})
