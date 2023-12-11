import {useAuthUser} from "src/store/authUser";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      {
        path: '/my-libraries',
        component: () => import('pages/MyLibrariesPage.vue'),
      },
      {
        path: 'shared-libraries',
        component: () => import('pages/SharedLibrariesPage.vue'),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
