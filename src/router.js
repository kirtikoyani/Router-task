import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import Header from "./components/HeaderPage.vue";
import Footer from "./components/FooterPage.vue";
import Home from "./components/homePage.vue";
import Users from "./components/UsersPage.vue";
import Admins from "./components/AdminPage.vue";
import Settings from "./components/SettingsPage.vue";
import notAccessable from "./components/notAccessable.vue";

const routes = [
  {
    name: "login",
    path: "/login",
    component: LoginPage,
    meta: { requiresAuth: false, requiresAdmin: false },
  },
  {
    path: "/",
    name: "home",
    components: {
      default: Home,
      header: Header,
      footer: Footer,
    },
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    path: "/users",
    components: {
      default: Users,
      header: Header,
      footer: Footer,
    },
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    path: "/admin",
    components: {
      default: Admins,
      header: Header,
      footer: Footer,
    },
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/settings",
    components: {
      default: Settings,
      header: Header,
      footer: Footer,
    },
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    name: "notAccessable",
    path: "/notAccessable",
    component: notAccessable,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const requiresAdmin = to.meta.requiresAdmin;
  const isAdmin = localStorage.getItem("isAdmin");
  const isLoggedIn = isAdmin !== null;

  if ((requiresAuth || requiresAdmin) && !isLoggedIn) {
    next("/notAccessable");
  } else if (requiresAdmin && isAdmin === "false") {
    next("/notAccessable");
   } else if (to.name === 'login' && isLoggedIn) {
      next('/notAccessable');
  } else {
    next();
  }

});

export default router;