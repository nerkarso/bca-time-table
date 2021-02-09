<template>
  <div :id="day.name" class="section">
    <div class="container">
      <h1 class="title">{{ day.name }}</h1>
      <div class="columns is-multiline">
        <div
          v-for="(lecture, index) in day.lectures"
          class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd block"
          :key="index"
        >
          <!-- <h2 class="subtitle has-text-grey"> -->
          <h2 class="subtitle">
            <v-icon name="clock"></v-icon> {{ lecture.time }}
          </h2>
          <div class="notification" :class="`is-${lecture.subject.color}`">
            <p v-if="lecture.subject" class="text-truncate">
              <v-icon name="book"></v-icon>
              <template v-if="lecture.subject.code">
                {{ lecture.subject.code }}: {{ lecture.subject.name }}
              </template>
              <template v-else>
                {{ lecture.subject }}
              </template>
            </p>
            <p v-if="lecture.faculty" class="text-truncate">
              <v-icon name="user"></v-icon>
              {{ lecture.faculty.code }}: {{ lecture.faculty.name }}
            </p>
            <p v-if="lecture.room">
              <v-icon name="map-pin"></v-icon> {{ lecture.room }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      day: this.data,
    };
  },
};
</script>
