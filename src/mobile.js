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
        case "BSBC-201":
          return "is-yellow";
          break;
        case "BSBC-202":
          return "is-turquoise";
          break;
        case "BSBC-203":
          return "is-purple";
          break;
        case "BSBC-204":
          return "is-cyan";
          break;
        case "BSBC-205":
          return "is-orange";
          break;
        case "BSBC-206":
          return "is-dark";
          break;
        case "EVSC-101":
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
  mounted() {
    // Update document title
    try {
      document.title = document.title.replace("PCTE", Table.class);
    } catch (erro) {}
  },
  data() {
    return {
      table: Table,
      weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }
  },
  components: {
    DayView
  }
});
