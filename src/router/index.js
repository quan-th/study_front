import Router from 'vue-router';
import Vue from "vue";

Vue.use(Router);

export default new Router({routes: [
    { 
        path: '/', 
        component: () => import("@/store/modules/List"), 
        name:'home'
    },
    { 
        path: '/register', 
        component: () => import("@/store/modules/Create"), 
        name:'create' 
    },
    { 
        path: '/detail', 
        component: () => import("@/store/modules/Detail"), 
        name:'detail',
        props: true
    },
    { 
        path: '/update', 
        component: () => import("@/store/modules/Update"), 
        name:'update',
        props: true
    },
    {
      path: '/login',
      component: () => import("@/store/modules/Login"),
      name: 'login'
    },
    {
      path: '/error',
      component: () => import("@/store/modules/Error"),
      name: 'error',
      props: true
    }
]});

