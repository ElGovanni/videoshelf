import { VuexModule, Action, getModule, Module } from "vuex-module-decorators";
import { MovieService, Movie } from "@/models/Movie";
import { http } from "@/services/Http";
import store from "@/store";
import { Query } from "@/models/Query";

@Module({
  name: "MovieModule",
  dynamic: true,
  store
})
class MovieModule extends VuexModule implements MovieService {
  @Action({ rawError: true })
  async load(id: string): Promise<Movie> {
    return (await http
      .get(`//www.omdbapi.com/`, {
        params: {
          i: id,
          apikey: process.env.VUE_APP_OMDB_KEY
        }
      })
      .then(({ data }) => data)) as Movie;
  }
  @Action({ rawError: true })
  async find(query: string): Promise<Query> {
    return (await http
      .get(`//www.omdbapi.com/`, {
        params: {
          s: query,
          type: ["series", "movie"],
          apikey: process.env.VUE_APP_OMDB_KEY
        }
      })
      .then(({ data }) => data)) as Query;
  }
}

export default getModule(MovieModule);
