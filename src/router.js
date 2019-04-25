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

    // dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "DashboardPage" */ '@/views/dashboard/DashboardPage.vue'),
      meta: {
        title: 'Dashboard',
      },
    },
    // patients
    {
      path: '/patients',
      name: 'patients',
      component: () => import(/* webpackChunkName: "PatientsPage" */ './views/patients/PatientsPage.vue'),
      meta: {
        title: 'Patients',
      },
    },
    // treatment arms
    {
      path: '/treatment-arms',
      name: 'treatment-arms',
      component: () => import(/* webpackChunkName: "TreatmentArmsPage" */ './views/treatment-arms/TreatmentArmsPage.vue'),
      meta: {
        title: 'Treatment Arms',
      },
    },
    // specimen tracking
    {
      path: '/specimen-tracking',
      name: 'specimen-tracking',
      component: () => import(/* webpackChunkName: "SpecimenTrackingPage" */ './views/specimen-tracking/SpecimenTrackingPage.vue'),
      meta: {
        title: 'Specimen Tracking',
      },
    },
    // CLIA labs
    {
      path: '/labs',
      name: 'labs',
      component: () => import(/* webpackChunkName: "LabsPage" */ './views/labs/LabsPage.vue'),
      meta: {
        title: 'CLIA Labs',
      },
    },

  ]
})
