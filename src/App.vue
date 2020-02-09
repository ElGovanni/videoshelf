<template>
  <v-app>
    <v-app-bar app fixed>
      <v-switch v-model="dark" hide-details inset>Dark theme</v-switch>
      <v-spacer></v-spacer>
      <v-text-field
        single-line
        placeholder="Search"
        v-model="query"
        class="pr-2"
        v-validate="'min:2'"
        :error-messages="errors.collect('search')"
        name="search"
        @keyup.enter="makeQuery"
      />
      <v-btn
        :disabled="search || query.length <= 1"
        :loading="search"
        color="primary"
        outlined
        tile
        @click="makeQuery"
        ><v-icon left>mdi-cloud-search-outline</v-icon> Search</v-btn
      >
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary" tile>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Search result</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialog = false">Close</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container>
            <list
              v-for="item in queryList"
              :key="item.imdbID"
              :movie="item"
              class="list-item"
              @display="displayDetails"
            />
          </v-container>
        </v-card>
      </v-dialog>
      <movie-dialog ref="movieDialog" />
    </v-app-bar>
    <v-container class="padding">
      <router-view />
      <v-snackbar v-model="snackbar" :timeout="4000" color="error">
        {{ error }}
        <v-btn color="white" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import List from "@/components/cards/List.vue";
import { Movie as MovieType, MovieService } from "@/models/Movie";
import MovieModule from "@/services/Movie";
import { Query } from "@/models/Query";
import { QueryRecord } from "@/models/QueryRecord";
import MovieDialog from "@/components/dialogs/Movie.vue";

@Component({
  components: { List, MovieDialog }
})
export default class App extends Vue {
  @Provide() movieService: MovieService = MovieModule;

  dialog: boolean = false;
  search: boolean = false;
  query: string = "";
  queryList: QueryRecord[] = [];
  snackbar: boolean = false;
  error: string = "";

  get dark(): string | null {
    return localStorage.getItem("dark");
  }

  set dark(value) {
    localStorage.setItem("dark", String(value));
    this.$vuetify.theme.dark = Boolean(value);
  }

  async makeQuery(): Promise<void> {
    if (!(await this.$validator.validateAll())) {
      return;
    }
    this.search = true;
    let result!: Query;

    await this.movieService
      .find(this.query)
      .then(response => (result = response));

    if (result.Response !== "False") {
      this.search = false;
      this.dialog = true;
      this.query = "";
      this.queryList = result.Search;
    } else {
      this.snackbar = true;
      this.error = result.Error;
      this.search = false;
    }
  }

  displayDetails(movie: MovieType): void {
    //@ts-ignore
    this.$refs.movieDialog.open(movie);
  }

  created() {
    this.$vuetify.theme.dark = Boolean(localStorage.getItem("dark")) || false;
  }
}
</script>
<style scoped>
.padding {
  padding-top: 70px;
}
.list-item {
  margin-bottom: 14px;
}
</style>
