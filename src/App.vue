<template>
  <v-app>
    <v-app-bar app fixed>
      <v-switch v-model="dark" hide-details inset>Dark theme</v-switch>
      <v-spacer></v-spacer>
      <v-text-field
        hide-details
        single-line
        placeholder="Search"
        v-model="query"
        class="pr-2"
        @keyup.enter="makeQuery"
      />
      <v-btn
        :disabled="search"
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
              v-for="(item, index) in queryList"
              :key="index"
              :movie="item"
              class="list-item"
            />
          </v-container>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-container class="padding">
      <router-view />
    </v-container>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import List from "@/components/cards/List.vue";
@Component({
  components: { List }
})
export default class App extends Vue {
  dialog: boolean = false;
  search: boolean = false;
  query: string = "";
  queryList: [] = [];

  get dark(): string | null {
    return localStorage.getItem("dark");
  }

  set dark(value) {
    localStorage.setItem("dark", String(value));
    this.$vuetify.theme.dark = Boolean(value);
  }

  makeQuery(): void {
    this.search = true;
    this.$http
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDB_KEY}&s=${this.query}&type[]=series&type[]=movie`
      )
      .then(response => {
        this.search = false;
        this.dialog = true;
        this.query = "";
        this.queryList = response.data.Search;
      });
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
