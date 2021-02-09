<template>
  <div id="app">
    <router-view />
    <div
      id="updateAvailable"
      class="notification toast animated slideInUp"
      style="display: none"
    >
      <div class="wrapper">
        New update available.
        <button class="button is-primary" @click="refresh">Refresh</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    refresh() {
      window.location.reload(true);
    },
  },
};
</script>
