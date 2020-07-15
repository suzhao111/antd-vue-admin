import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/404.vue";
import Forbidden from "../views/403.vue";
import { check, isLogin } from "@/utils/auth";

Vue.use(VueRouter);

const routes = [
  // 用户登录注册，不使用基础布局
  {
    path: "/user",
    hideInMenu: true, //菜单中不显示
    // component: { render: h => h(" router-view ") },
    component: () =>
      import(/* webpackChunkName: "user" */ "../layouts/UserLayout.vue"), //异步加载
    children: [
      { path: "/user", redirect: "/user/login" },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue")
      }
    ]
  },

  //   使用基础布局
  {
    path: "/",
    meta: { authority: ["admin", "guest"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      { path: "/", redirect: "/dashboard/analysis" },

      // dashboard
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: () =>
          import(/* webpackChunkName: "layout" */ "../layouts/MainLayout.vue"), //异步加载
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页面" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"
              )
          }
        ]
      },

      //   form
      {
        path: "/form",
        meta: { icon: "form", title: "表单" },
        name: "form表单",
        component: () =>
          import(/* webpackChunkName: "layout" */ "../layouts/MainLayout.vue"), //异步加载
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Form/BasicForm.vue"
              )
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "fenbu表单" },
            hideChildrenMenu: true, //不显示子菜单
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../layouts/MainLayout.vue"
              ),
            children: [
              { path: "/form/step-form", redirect: "/form/step-form/info" },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Form/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Form/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Form/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
