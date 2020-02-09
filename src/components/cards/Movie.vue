<template>
  <v-card max-width="344" :loading="loading">
    <span class="rating v-chip">{{ movieDetail.imdbRating }}</span>
    <v-img
      :src="movieDetail.Poster === 'N/A' ? noImage : movieDetail.Poster"
      height="400px"
    ></v-img>

    <v-card-title>
      {{ movieDetail.Title }}
    </v-card-title>

    <v-card-subtitle>
      Released: {{ movieDetail.Released }}<br />
      Rated: {{ movieDetail.Rated }}<br />
      Genre: {{ movieDetail.Genre }}<br />
      Type: {{ movieDetail.Type }}<br />
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text :href="externalLink" target="_blank">IMDB</v-btn>

      <v-btn color="purple" text @click="watched">
        Watched
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn icon @click="remove"><v-icon>mdi-close</v-icon></v-btn>

      <v-btn icon @click="show = !show" :disabled="!movieDetail.Plot">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ movieDetail.Plot }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import { Movie as MovieType, MovieService } from "@/models/Movie";

@Component
export default class Movie extends Vue {
  @Prop({ required: true }) movie!: { id: string; status: number };
  @Inject() readonly movieService!: MovieService;
  noImage: string = require("@/assets/no_picture_available.png");

  show: boolean = false;
  loading: boolean = true;
  movieDetail: MovieType = {
    Country: "",
    Genre: "",
    imdbRating: 0.0,
    Language: "",
    Metascore: "",
    Plot: "",
    Poster: "N/A",
    Rated: "",
    Released: "",
    Type: "",
    Year: "",
    Title: "Title",
    imdbID: "0"
  };

  get externalLink(): string {
    return `https://www.imdb.com/title/${this.movie.id}/?ref_=videoshelf`;
  }
  remove(): void {
    this.$store.dispatch("remove", { ...this.movie });
  }
  watched(): void {
    //todo
  }
  created(): void {
    this.movieService
      .load(this.movie.id)
      .then(response => (this.movieDetail = response));
    this.loading = false;
  }
}
</script>

<style scoped>
.rating {
  position: absolute;
  color: white;
  z-index: 1;
  right: 0;
  background-color: #ff0c0c;
  padding: 5px;
  border: 1px solid #ff0c0c;
  border-bottom-left-radius: 5px;
  font-weight: bold;
  opacity: 0.8;
}
</style>
