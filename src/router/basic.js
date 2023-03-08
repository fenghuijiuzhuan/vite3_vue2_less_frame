const files = import.meta.globEager('./modules/**/*.js');
const modules = {};
for (const key in files) {
  if ({}.hasOwnProperty.call(files, key)) {
    modules[key.replace(/(\.\/modules\/|\.js)/g, '')] = files[key].default;
  }
}

export const asyncRoutes = [...Object.values(modules).flat(1)];

const LocalRoutes = [
  {
    path: '/index',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: () => import('@/views/Redirect.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/ErrorPage/404.vue'),
  },
];

export const basicRoutes = [...LocalRoutes];
