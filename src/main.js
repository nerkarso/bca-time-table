import Vue from "vue/dist/vue";
import Table from "../data/table.json";

// Feather Icons
import feather from "vue-icon";
Vue.use(feather, "v-icon");

// Vue Router
import VueRouter from "vue-router";
Vue.use(VueRouter);

// Component Day View
const DayView = {
  template: "#dayview-template",
  computed: {
    data() {
      for (const value of Table.data) {
        // Check if day matches
        if (value.day == this.$route.params.id) return value;
      }
    }
  },
  methods: {
    /**
     * Get Color
     * 
     * @param {*} code subject code.
     * @returns {string} color class.
     */
    getColor(code) {
      switch (code) {
        case "BSBC201":
          return "is-yellow";
          break;
        case "BSBC202":
          return "is-turquoise";
          break;
        case "BSBC203":
          return "is-orange";
          break;
        case "BSBC204":
          return "is-cyan";
          break;
        case "BSBC205":
          return "is-purple";
          break;
        case "BSBC206":
          return "is-dark";
          break;
        case "EVSC101":
          return "is-green";
          break;
        default:
          return "is-light";
      }
    }
  }
};

// Create the router instance
const router = new VueRouter({
  linkActiveClass: "is-active",
  routes: [{
    path: "/:id",
    component: DayView
  }]
});

// App
new Vue({
  el: "#app",
  router,
  mounted() {
    // Go to first week day
    this.$router.push(this.weekDays[0]);
  },
  data() {
    return {
      table: Table,
      weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }
  },
  computed: {
    // Week Day
    weekDay() {
      const date = new Date();
      return this.weekDays[date.getDay() + 1];
    }
  }
});
