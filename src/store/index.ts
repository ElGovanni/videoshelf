import Vue from "vue";
import Vuex from "vuex";
import Movie from "@/models/Movie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: Array<Movie>()
  },
  mutations: {
    ADD_MOVIE(state, movie: Movie) {
      state.list.push(movie);
    },
    SET_SHELF(state, shelf) {
      state.list = shelf;
    },
    SET_WATCHED(state, id) {
      let movie = state.list.find(movie => movie.id === id);
      if (movie) {
        movie.status = 1;
      }
    },
    REMOVE(state, item) {
      let movie = state.list.find(
        movie => movie.id === item.id && movie.status === item.status
      );
      if (movie) {
        state.list.splice(state.list.indexOf(movie), 1);
      }
    },
    init(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(String(localStorage.getItem("store")))
          )
        );
      }
    }
  },
  actions: {
    init: ({ commit }, list: Movie[]) => {
      commit("SET_SHELF", list);
    },
    add: ({ commit }, movie: Movie) => {
      commit("ADD_MOVIE", movie);
    },
    setWatched: ({ commit }, id: string) => {
      commit("SET_WATCHED", id);
    },
    remove: ({ commit }, movie: { id: string; status: number }) => {
      commit("REMOVE", movie);
    }
  },
  modules: {},
  getters: {
    all: state => {
      return state.list;
    },
    toWatch: state => {
      return state.list.filter(movie => movie.status === 0);
    },
    watched: state => {
      return state.list.filter(movie => movie.status === 1);
    }
  }
});
