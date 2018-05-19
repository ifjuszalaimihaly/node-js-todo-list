import Vue from 'vue'
import Router from 'vue-router'
import CreateTodo from '@/components/CreateTodo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todos',
      component: CreateTodo
    }
  ]
})