import { createRouter, createWebHashHistory } from "vue-router";
import UserList from "./components/UserList.vue";

const routes = [
    {
        path: "/",
        name: "users",
        component: UserList,
    },
    {
        path: "/user-detail/:id",
        name: "detail",
        component: ()=>import("./components/UserDetail.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;