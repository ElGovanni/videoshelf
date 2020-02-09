import { Rating } from "@/models/Rating";
import { Query } from "@/models/Query";

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime?: string;
  Genre: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards?: string;
  Poster: string;
  Ratings?: Rating[];
  Metascore: string;
  imdbRating: number;
  imdbVotes?: string;
  imdbID: string;
  Type: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

export interface MovieService {
  load(id: string): Promise<Movie>;
  find(query: string): Promise<Query>;
}
