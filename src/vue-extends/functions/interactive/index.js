import * as Message from './message';
import * as TabView from './tabView';
import * as MessageBox from './messageBox';
import * as Notify from './notify';
import * as Loading from './loading';

export default {
  ...Message,
  ...TabView,
  ...MessageBox,
  ...Notify,
  ...Loading,
};
