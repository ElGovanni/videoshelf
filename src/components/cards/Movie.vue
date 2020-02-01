<template>
  <v-card max-width="344" :loading="loading">
    <span class="rating v-chip">{{ movieDetail.score }}</span>
    <v-img :src="movieDetail.image" height="400px"></v-img>

    <v-card-title>
      {{ movieDetail.title }}
    </v-card-title>

    <v-card-subtitle>
      Released: {{ movieDetail.released.toLocaleDateString() }}<br />
      Rated: {{ movieDetail.rated }}<br />
      Genre: {{ movieDetail.genre }}<br />
      Type: {{ movieDetail.type }}<br />
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text :href="externalLink" target="_blank">IMDB</v-btn>

      <v-btn color="purple" text @click="watched">
        Watched
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn icon @click="remove"><v-icon>mdi-close</v-icon></v-btn>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ movieDetail.plot }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Movie extends Vue {
  @Prop({ required: true }) movie!: { id: string; status: number };
  show: boolean = false;
  loading: boolean = true;
  movieDetail: {
    id: string;
    score: number;
    image: string;
    title: string;
    released: Date;
    rated: string;
    genre: string;
    plot: string;
    type: string;
  } = {
    id: "0",
    score: 0.1,
    image: "",
    title: "Title",
    released: new Date(),
    rated: "",
    genre: "",
    plot: "",
    type: ""
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
    this.loadData();
  }
  updated(): void {
    this.loadData();
  }
  loadData(): void {
    this.$http
      .get(`//www.omdbapi.com/`, {
        params: {
          i: this.movie.id,
          apikey: process.env.VUE_APP_OMDB_KEY
        }
      })
      .then(response => {
        this.movieDetail = {
          id: response.data.imdbID,
          score: response.data.imdbRating,
          image: response.data.Poster,
          title: response.data.Title,
          released: new Date(response.data.Released),
          rated: response.data.Rated,
          genre: response.data.Genre,
          plot: response.data.Plot,
          type: response.data.Type
        };
        this.loading = false;
      });
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
