
import { createStore } from 'vuex';

import { auth } from './auth.module';
import { customer } from './customer.module';

export default createStore({
    modules: {
        auth,
        customer
    }
})
