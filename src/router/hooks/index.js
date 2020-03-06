import Vue from 'vue';
import routersMap from '../table';
import auth from '@iyourcar-admin/acl';
import connectAuth from './connectAuth';
import sessionCheck from './sessionCheck';

export default function(router) {
  Vue.use(auth, { router, routersMap });
  [connectAuth, sessionCheck].forEach((h) => {
    h(router);
  });
}
