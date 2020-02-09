<template>
  <v-card class="row" :loading="loading" @click="showDetails(movie)">
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
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import { MovieService } from "@/models/Movie";
import { QueryRecord } from "@/models/QueryRecord";
@Component
export default class List extends Vue {
  @Prop({ required: true }) movie!: QueryRecord;
  @Inject() readonly movieService!: MovieService;

  noImage: string = require("@/assets/no_picture_available.png");
  loading: boolean = false;
  movieDetails: any = {};

  async showDetails(movie: QueryRecord): Promise<void> {
    this.loading = true;

    await this.movieService.load(movie.imdbID).then(response => {
      this.movieDetails = response;
    });

    this.loading = false;
    this.$emit("display", this.movieDetails);
  }
}
</script>

<style scoped>
.headline {
  word-break: break-word;
}
</style>
