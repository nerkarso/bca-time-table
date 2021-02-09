<template>
  <footer class="footer">
    <div class="container content is-small">
      <p class="has-text-grey" v-if="isClass">
        {{ isClass }}, Time Table w.e.f.
        <span class="has-text-weight-semibold">{{ date }}</span>
      </p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ isClass: 'class', date: 'date' }),
  },
};
</script>
