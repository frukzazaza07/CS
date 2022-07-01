import {
  createWebHistory,
  createRouter
} from "vue-router";
// import Home from "@/views/Home.vue";
import Register from "@/components/authen/Register.vue";
import Login from "@/components/authen/Login.vue";
import Auth from "@/components/authen/Auth.vue";
// import Profile from "@/components/Profile.vue";
import Home from "@/components/homepage/Home.vue";
// import AdminHome from "@/components/adminPage/Home.vue";
// import BoardModerator from "@/components/BoardModerator.vue";
import BoardUser from "@/components/userPage/BoardUser.vue";
import Page404 from "@/components/page404/Page404.vue";
import {
  checkRememberMe
} from "@/services/authen/authCookie";

import AddCompany from "@/components/company/AddCompany.vue";
import ViewCompany from "@/components/company/ViewCompany.vue";
// const userPermissions = ['admin', 'moderator', 'users'];

const routes = [{
    path: "/auth",
    name: "Auth",
    // redirect: "/auth/login",
    component: Auth,
    children: [{
        path: "register",
        name: "Register",
        component: Register,
      },
      {
        path: "login",
        name: "Login",
        component: Login,
      },
    ],

  },
  {
    path: "/home",
    name: "Home",
    // redirect: "/home/home",
    component: Home,
    // meta: {
    //   permissions: ['admin']
    // },
    // children: [{
    //   path: "home",
    //   name: "Home",
    //   component: AdminHome,
    // }, ],

  },
  {
    path: "/user",
    name: "user",
    component: BoardUser,
    meta: {
      permissions: ['users']
    },
  },
  {
    path: "/company",
    name: "Company",
    redirect: "/company/add-company",
    component: Auth,
    children: [{
        path: "view-company",
        name: "ViewCompany",
        component: ViewCompany,
      },
      {
        path: "add-company",
        name: "AddCompany",
        component: AddCompany,
      },
    ],

  },
  {
    path: '/:pathMatch(.*)*',
    component: Page404,

  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // const allPage = [
  //   '/auth',
  //   '/auth/login',
  //   '/auth/register',
  //   '/admin',
  //   '/admin/home',
  //   '/user',
  // ];
  // const checkPage404 = allPage.includes(to.path);
  const publicPages = ['/auth/login', '/auth/register'];
  const authRequired = publicPages.includes(to.path);
  const loggedIn = checkRememberMe();
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (!authRequired && !loggedIn) {
    next('/auth/login');
  }
  if (authRequired && loggedIn) {
    next('/home');
  }

  next();
});

export default router;
export {
  routes
};