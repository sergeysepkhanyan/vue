<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div>
    <Navbar />
  </div>
  <RouterView />
</template>
<script>
import EventBus from './common/EventBus';
export default {
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on('logout', () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove('logout');
  }
};
</script>
