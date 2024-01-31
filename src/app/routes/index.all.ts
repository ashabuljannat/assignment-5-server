/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { ReviewRoutes } from '../modules/review/review.route';
import { CategoriesRoutes } from '../modules/category/categories.route';
import { CourseRoutes } from '../modules/course/course.route';
import { CoursesRoutes } from '../modules/course/courses.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CompItemRoutes } from '../modules/comp-items/comp-items.route';
import { SalesRoutes } from '../modules/sales/sales.route';

const router = Router();

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
    route: SalesRoutes,
  },
  {
    path: '/dashboard',
    route: CompItemRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
