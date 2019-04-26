import Vue from 'vue';
import { Button } from 'element-ui';
import AsyncDataWrapper from '@/components/data/AsyncDataWrapper';
import StateHandler from '@/components/presentation/state/StateHandler';
import Loading from '@/components/presentation/state/Loading';
import Error from '@/components/presentation/state/Error';

Vue.component('Btn', Button);
Vue.component('AsyncDataWrapper', AsyncDataWrapper);
Vue.component('StateHandler', StateHandler);
Vue.component('Loading', Loading);
Vue.component('Error', Error);
