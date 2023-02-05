<template>
  <nav class="container flex justify-around py-8 mx-auto bg-white border">
    <div class="flex items-center space-x-8">
      <RouterLink v-if="user" to="/">Home</RouterLink>
      <RouterLink v-if="user && $route.name !== 'users'" to="/users">Users</RouterLink>
      <RouterLink v-if="!user" to="/login">Login</RouterLink>
      <button v-if="user" @click="Logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import TokenService from '@/services/token.service';
export default {
  computed: {
    user() {
      return TokenService.getUser();
    }
  },
  methods: {

  },
  setup() {
    const Logout = () => {
      TokenService.removeUser();
      location.reload();
    };
    return { Logout };
  },
};
</script>