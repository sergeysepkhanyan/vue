const existCustomer = JSON.parse(localStorage.getItem('customer'));
const initialState = existCustomer ? existCustomer: {customer: {
        name: null,
        email: null,
        mobile: null
    }};

export const customer = {
    namespaced: true,
    state: initialState,
    actions: {
        setCustomer({ commit }, customer) {
            commit('setCustomer', customer);
        },
        removeCustomer({ commit }) {
            commit('removeCustomer');
        }
    },
    mutations: {
        setCustomer(state, customer) {
            state.customer = JSON.parse(customer);
        },
        removeCustomer(state) {
            localStorage.removeItem('customer');
            state.customer = null;
        }
    }
};