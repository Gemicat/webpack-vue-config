import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/components/HomePage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: 'page',
          name: 'HomePage',
          component: HomePage,
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.name);
  next();
})

export default router;
