import Vue from "vue/dist/vue";
import Table from "../data/table.json";

// Feather Icons
import feather from "vue-icon";
Vue.use(feather, "v-icon");

// Component Day View
const DayView = Vue.component("dayview", {
  template: "#dayview-template",
  data() {
    return {
      data: Table.data
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
});

// App
new Vue({
  el: "#app",
  data() {
    return {
      table: Table,
      weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }
  },
  computed: {},
  components: {
    DayView
  }
});
