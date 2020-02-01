<template>
  <v-row align="start" justify="center">
    <movie
      v-for="(item, index) in shelf"
      :key="index"
      :movie="item"
      class="margin col-lg-3 col-sm-12 col-md-4"
    />
    <v-container fluid class="container">
      <v-row
        justify="center"
        align="center"
        v-if="shelf.length === 0"
        width="100%"
        style="height: 300px;"
      >
        <h1 class="text-center">Find and add your movies to shelf</h1>
      </v-row>
    </v-container>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Movie from "@/components/cards/Movie.vue";

@Component({
  components: { Movie }
})
export default class Home extends Vue {
  get shelf(): Movie[] {
    return this.$store.getters.toWatch;
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  opacity: 0.5;
}
.margin {
  margin: 14px;
  padding: 0;
  float: left;
}
</style>
