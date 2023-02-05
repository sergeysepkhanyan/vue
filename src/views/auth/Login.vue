<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen">
    <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
      <form class="space-y-4">
        <div>
          <label for="username" class="block text-sm text-gray-800">Username</label>
          <input
              id="username"
              type="text"
              name="username"
              v-model="user.username"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="password" class="block text-sm text-gray-800"
          >Password</label
          >
          <input
              id="password"
              type="password"
              name="password"
              v-model="user.password"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <button
              type="button"
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" @click="login"
          >
            Login
          </button>
        </div>
      </form>
      <div v-if="message" class="mt-4 text-red-700">
        {{message}}
      </div>
    </div>
  </div>
</template>
<script>
import User from '@/models/user';

export default {
  name: 'login',
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  data() {
    return {
      user: new User('', ''),
      message: ''
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    login() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              location.reload();
            },
            error => {
              this.message = error.message;
            }
        );
      }
    }
  }
};
</script>