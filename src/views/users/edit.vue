<template>
  <div class="relative flex flex-col items-center justify-center  m-4">
    <div>
      <h1>Edit User</h1>
    </div>
    <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
      <form class="space-y-4">
        <div>
          <label for="name" class="block text-sm text-gray-800">Name</label>
          <input
              id="name"
              type="text"
              name="name"
              v-model="user.name"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <span class="mt-4 text-red-700">
            <small v-if="message && message.name" > {{message.name[0]}}</small>
          </span>
        </div>
        <div>
          <label for="email" class="block text-sm text-gray-800"
          >Email</label
          >
          <input
              id="email"
              type="email"
              name="email"
              v-model="user.email"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <span class="mt-4 text-red-700">
            <small v-if="message && message.email" > {{message.email[0]}}</small>
          </span>
        </div>
        <div>
          <label for="mobile" class="block text-sm text-gray-800"
          >Mobile</label
          >
          <input
              id="mobile"
              type="text"
              name="mobile"
              v-model="user.mobile"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <span class="mt-4 text-red-700">
            <small v-if="message && message.mobile" > {{message.mobile[0]}}</small>
          </span>
        </div>
        <div>
          <button
              type="button"
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" @click="update"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from '@/common/EventBus';
const API_URL = import.meta.env.VITE_API_ENDPOINT;
export default {
  name: 'user-edit',
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('customer'));
    }
  },
  data() {
    return {
      message: {}
    };
  },
  beforeUnmount() {
    this.$store.dispatch('customer/removeCustomer');
  },
  methods: {
    update(){
      let user = this.user;
      axios
          .patch(API_URL + `users/${user.id}`, user)
          .then(response => {
            this.$router.push({path: '/users'});
          }).catch(error => {
        this.message = error.response.data;
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout');
        }
      });
    }
  }
}
</script>

<style scoped>

</style>