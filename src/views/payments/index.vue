<template>
  <div class="m-4">
    <button
        type="button"
        class="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md focus:outline-none focus:bg-purple-600" @click="$router.back"
    >
      Back
    </button>
  </div>
  <div class="relative flex flex-col items-center justify-center m-4">
    <div class="w-full p-6 shadow bg-gray-50 lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
          >
            ID
          </th>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
          >
            User
          </th>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
          >
            Amount
          </th>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
          >
            Currency
          </th>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
          >
            Status
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <tr v-for="payment in payments">
          <td
              class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
          >
            #{{payment.id}}
          </td>
          <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
          >
            {{payment.customer.name}}
          </td>
          <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
          >
            {{payment.amount}}
          </td>
          <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
          >
            {{payment.currency}}
          </td>
          <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
          >
            {{payment.status}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventBus from '@/common/EventBus';
const API_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  name: 'Payments',
  props: {
    userId: String
  },
  data() {
    return {
      payments: {},
    };
  },
  mounted() {
    this.getPayments(this.userId);
  },
  methods: {
    getPayments(userId){
      axios
          .get(API_URL + `users/${userId}/payments`)
          .then(response => {
            this.payments = response.data.payments;
          }).catch(error => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout');
        }
      });
    }
  }
}
</script>