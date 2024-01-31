"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const comp_items_route_1 = require("../modules/comp-items/comp-items.route");
const sales_route_1 = require("../modules/sales/sales.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    // {
    //   path: '/course',
    //   route: CourseRoutes,
    // },
    // {
    //   path: '/courses',
    //   route: CoursesRoutes,
    // },
    {
        path: '/sales',
        route: sales_route_1.SalesRoutes,
    },
    {
        path: '/dashboard',
        route: comp_items_route_1.CompItemRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
