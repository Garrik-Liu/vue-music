import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
import state from './state';

import createLogger from 'vuex/dist/logger';

const debug = process.env.NODE_ENV !== 'production';

export default {
    state,
    actions,
    mutations,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
}