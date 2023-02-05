<template>
  <div class="relative flex flex-col items-center justify-center m-4">
    <h1>Welcome to Homepage</h1>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
const API_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const Users = () => {
      router.push({ path: '/users' });
    }
    return { Users };
  },
  methods: {
    getUsers(){
      axios
          .get(API_URL + 'users')
          .then(response => {
            this.users = response.data.users;
          });
    },
  }
}
</script>

<style scoped>

</style>