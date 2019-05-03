import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "DashboardPage" */ '@/views/dashboard/DashboardPage.vue'),
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/style-guide',
      name: 'style-guide',
      component: () => import( /* webpackChunkName: "StyleGuide" */ '@/views/style-guide/StyleGuide.vue'),
      meta: {
        title: 'Style Guide',
      },
    },
    {
      path: '/patients',
      name: 'patients',
      component: () => import(/* webpackChunkName: "PatientsPage" */ './views/patients/PatientsPage.vue'),
      meta: {
        title: 'Patients',
      },
    },
    {
      path: '/treatment-arms',
      name: 'treatment-arms',
      component: () => import(/* webpackChunkName: "TreatmentArmsPage" */ './views/treatment-arms/TreatmentArmsPage.vue'),
      meta: {
        title: 'Treatment Arms',
      },
    },
    {
      path: '/specimen-tracking',
      name: 'specimen-tracking',
      component: () => import(/* webpackChunkName: "SpecimenTrackingPage" */ './views/specimen-tracking/SpecimenTrackingPage.vue'),
      meta: {
        title: 'Specimen Tracking',
      },
    },
    {
      path: '/labs',
      name: 'labs',
      component: () => import(/* webpackChunkName: "LabsPage" */ './views/labs/LabsPage.vue'),
      meta: {
        title: 'CLIA Labs',
      },
    },
  ],
})
