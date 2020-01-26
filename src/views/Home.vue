<template>
  <v-row align="start" justify="center">
    <movie
      v-for="(item, index) in list"
      :key="index"
      :movie="item"
      class="margin col-lg-3 col-sm-12 col-md-4"
    />
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Movie from "@/components/cards/Movie.vue";

@Component({
  components: { Movie }
})
export default class Home extends Vue {
  list: { id: string; status: number }[] = [
    { id: "tt5180504", status: 0 },
    { id: "tt2861424", status: 0 },
    { id: "tt0816692", status: 0 }
  ];
}
</script>

<style scoped>
.margin {
  margin: 14px;
  padding: 0;
  float: left;
}
</style>
