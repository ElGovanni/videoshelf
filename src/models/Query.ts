import { QueryRecord } from "@/models/QueryRecord";

export interface Query {
  Response: string;
  Search: QueryRecord[];
  totalResults: Number;
  Error: string;
}
