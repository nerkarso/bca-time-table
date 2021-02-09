<template>
  <div class="container is-fluid">
    <section class="hero is-large" v-if="isLoading">
      <div class="hero-body has-text-centered">
        <div class="button is-text is-large is-loading">Loading</div>
      </div>
    </section>
    <template v-else>
      <nav class="navbar is-fixed-top has-shadow">
        <div class="container">
          <div class="navbar-item has-tabs">
            <div class="tabs" v-if="weekdays.length">
              <router-link
                :to="{ name: 'day', params: { index: todayIndex } }"
                class="navbar-logo"
              >
                <img src="../assets/icon.png" height="28" />
              </router-link>
              <ul class="container">
                <router-link
                  v-for="(weekday, index) in weekdays"
                  :key="index"
                  :to="{ name: 'day', params: { index: index } }"
                  tag="li"
                >
                  <a class="animated" :class="animateDirection">{{
                    weekday
                  }}</a>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <main class="main" v-hammer:swipe.horizontal="onSwipe">
        <transition name="slide" mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </main>
      <Footer />
    </template>
  </div>
</template>

<script>
import Footer from '../components/Footer';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      previousDayIndex: -1,
      currentDayIndex: 0,
      navIsActive: null,
    };
  },
  computed: {
    animateDirection() {
      if (this.previousDayIndex < this.currentDayIndex) {
        return 'slideInLeft';
      } else {
        return 'slideInRight';
      }
    },
    todayIndex() {
      const date = new Date();

      return date.getDay() > 0 && date.getDay() < 7 ? date.getDay() - 1 : 0;
    },
    ...mapGetters(['isLoading', 'weekdays']),
  },
  async mounted() {
    // Show loading
    this.$store.commit('SET_LOADING', true);

    // Fetch table
    await this.$store.dispatch('fetchTable');

    // Hide loading
    this.$store.commit('SET_LOADING', false);

    // Go to first week day
    this.navigate();

    // Register event listeners
    this.eventListeners();
  },
  watch: {
    $route(to, from) {
      // Update previous day index
      this.previousDayIndex = from.params.index;

      // Update current day index
      this.currentDayIndex = to.params.index;
    },
  },
  methods: {
    /**
     * Navigate
     */
    navigate() {
      this.$router.push({
        name: 'day',
        params: {
          index: this.currentDayIndex,
        },
      });
    },
    /**
     * Event Listeners
     */
    eventListeners() {
      // Add event listener
      document.addEventListener('keydown', (event) => {
        this.handleNavigation(event.keyCode);
      });
    },
    /**
     * Swipe
     */
    onSwipe(event) {
      this.handleNavigation(event.type);
    },
    /**
     * Handle Navigation Event
     */
    handleNavigation(event) {
      switch (event) {
        case 37:
        case 'swiperight':
          // Key left
          if (this.currentDayIndex !== 0 && this.currentDayIndex > 0) {
            // Decrement current day index
            this.currentDayIndex--;
            // Navigate
            this.navigate();
          }
          break;
        case 39:
        case 'swipeleft':
          // Key right
          if (this.currentDayIndex < this.weekdays.length - 1) {
            // Increment current day index
            this.currentDayIndex++;
            // Navigate
            this.navigate();
          }
          break;
      }
    },
  },
  components: {
    Footer,
  },
};
</script>
