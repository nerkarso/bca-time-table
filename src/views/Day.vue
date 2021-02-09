<template>
  <div v-if="days.length">
    <Day :data="data" />
  </div>
</template>

<script>
import Day from '../components/Day';
import { mapGetters } from 'vuex';

export default {
  computed: {
    data() {
      const { index } = this.$route.params;

      return index >= 0 ? this.days[index] : this.days[0];
    },
    ...mapGetters(['days']),
  },
  components: {
    Day,
  },
};
</script>
