import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld.vue');
const HomePage = () => import('@/components/HomePage.vue');

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
