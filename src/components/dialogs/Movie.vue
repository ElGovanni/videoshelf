<template>
  <v-dialog v-model="show" scrollable>
    <v-card>
      <v-card-title>
        {{ movieData.Title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <p>{{ movieData.Plot }}</p>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                :src="movieData.Poster === 'N/A' ? noImage : movieData.Poster"
                height="400px"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" text @click="show = false">
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="add">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Movie } from "@/models/Movie";

@Component
export default class MovieDialog extends Vue {
  movieData: Movie = {
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
  noImage: string = require("@/assets/no_picture_available.png");
  show: Boolean = false;

  open(movie: Movie): void {
    this.movieData = movie;
    this.show = true;
  }

  add() {
    this.$store.dispatch("add", {
      id: this.movieData.imdbID,
      status: 0
    });
    this.show = false;
  }
}
</script>

<style scoped></style>
