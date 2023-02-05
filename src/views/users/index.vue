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
            Name
          </th>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
          >
            Email
          </th>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
          >
            Mobile
          </th>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-gray-500 uppercase"
          >
            Payments
          </th>
          <th
              scope="col"
              class="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
          >

          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <tr v-for="user in users">
          <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
          >
            {{user.name}}
          </td>
          <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
          >
            {{user.email}}
          </td>
          <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
          >
            +{{user.mobile}}
          </td>
          <td
              class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
          >
            <button
                type="button"
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" @click="Payments(user.id)"
            >
              Payments
            </button>
          </td>
          <td
              class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
          >
            <button type="button"
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md focus:outline-none" @click="edit(user)"
            >
              Edit
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import EventBus from '@/common/EventBus';
const API_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  name: 'Users',
  setup() {
    const router = useRouter();
    const Payments = (userId) => {
      router.push({ name: 'payments', params: {userId: userId} });
    }
    return { Payments };
  },
  data() {
    return {
      users: {}
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers(){
      axios
          .get(API_URL + 'users')
          .then(response => {
            this.users = response.data.users;
          }).catch(error => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout');
        }
      });
    },
    edit(user){
      let customer = JSON.stringify(user);
      localStorage.setItem('customer', customer);
      this.$store.dispatch('customer/setCustomer', customer);
      this.$router.push({path: 'users/edit'});
    }
  }
}
</script>

<style scoped>

</style>