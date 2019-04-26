import Vue from 'vue';
import { Button } from 'element-ui';
import AsyncDataWrapper from '@/components/data/AsyncDataWrapper';
import StateHandler from '@/components/data/StateHandler';

Vue.component('Btn', Button);
Vue.component('AsyncDataWrapper', AsyncDataWrapper);
Vue.component('StateHandler', StateHandler);
