import Vue from 'vue';
import { Button } from 'element-ui';
import DataWrapper from '@/components/data-wrapper/DataWrapper';
import StateHandler from '@/components/presentation/state/StateHandler';
import Loading from '@/components/presentation/state/Loading';
import Error from '@/components/presentation/state/Error';
import Icon from '@/components/utils/Icon';

Vue.component('Btn', Button);
Vue.component('DataWrapper', DataWrapper);
Vue.component('StateHandler', StateHandler);
Vue.component('Loading', Loading);
Vue.component('Error', Error);
Vue.component('Icon', Icon);
