import Vue from "vue/dist/vue";
import Table from "../data/table.json";

// Feather Icons
import feather from "vue-icon";
Vue.use(feather, "v-icon");

// App
new Vue({
  el: "#app",
  data: {
    table: Table
  },
  computed: {
    // Week Day
    weekDay() {
      return "./#" + this.getWeekDay();
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
          return "is-warning";
          break;
        case "BSBC202":
          return "is-danger";
          break;
        case "BSBC203":
          return "is-info";
          break;
        case "BSBC204":
          return "is-link";
          break;
        case "BSBC205":
          return "is-primary";
          break;
        case "BSBC206":
          return "is-dark";
          break;
        case "EVSC":
          return "is-success";
          break;
        default:
          return "is-light";
      }
    },
    /**
     * Get Week Day
     * 
     * @returns {string} name of week day.
     */
    getWeekDay() {
      const date = new Date();
      const weekDay = new Array(7);
      weekDay[0] = "Sunday";
      weekDay[1] = "Monday";
      weekDay[2] = "Tuesday";
      weekDay[3] = "Wednesday";
      weekDay[4] = "Thursday";
      weekDay[5] = "Friday";
      weekDay[6] = "Saturday";

      return weekDay[date.getDay()];
    }
  }
});
