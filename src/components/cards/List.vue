<template>
  <v-card class="row" @click="save(movie)">
    <div
      class="d-flex flex-no-wrap justify-space-between row col-xs-12 col-lg-11 pt-0 pb-0"
    >
      <v-img
        :src="movie.Poster === 'N/A' ? noImage : movie.Poster"
        class="col-xs-12 col-lg-1 pt-0"
        height="150"
        tile
      >
      </v-img>
      <div class="col-lg-11 pa-0">
        <v-card-title class="headline pt-0"
          >{{ movie.Title }} ({{ movie.Year }})</v-card-title
        >
        <v-card-subtitle>Type: {{ movie.Type }}</v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Movie from "@/models/Movie";
@Component
export default class List extends Vue {
  @Prop({ required: true }) movie!: {};
  noImage: string = require("@/assets/no_picture_available.png");
  save(movie: any): void {
    if (
      this.$store.state.list.filter((e: Movie) => e.id === movie.imdbID)
        .length > 0
    ) {
      return;
    }
    this.$store.dispatch("add", {
      id: movie.imdbID,
      status: 0
    });
  }
}
</script>

<style scoped>
.headline {
  word-break: break-word;
}
</style>
