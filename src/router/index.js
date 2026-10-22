import Router from "vue-router";
import Vue from "vue";

import Home from "@/components/Home";
import Login from "@/components/Login";

import EvaluationForm from "@/components/intern/EvaluationForm";
import EvaluationSuccess from "@/components/intern/EvaluationSuccess";
import Management from "@/components/intern/Management";

import LeaderEvaluation from "@/components/sign/LeaderEvaluation";
import ManagerEvaluation from "@/components/sign/ManagerEvaluation";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
      hidden: true
    },
    {
      path: "/home",
      name: "主页",
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/evaluation/success",
      name: "实习生评价",
      component: EvaluationSuccess,
      hidden: true
    },
    {
      path: "/evaluation/:id",
      name: "实习生评价",
      component: EvaluationForm,
      hidden: true
    },
    {
      path: "/management",
      name: "实习生评价管理",
      component: Management,
      hidden: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/leader/:urlKey",
      name: "直属领导评价",
      component: LeaderEvaluation,
      hidden: true
    },
    {
      path: "/manager/:urlKey",
      name: "部门负责人评价",
      component: ManagerEvaluation,
      hidden: true
    }
  ]
});
