import { BASE_API_URL } from "@/utils/consts";
import { PokemonList, Pokemon } from "@/utils/types";

export const fetchPokemonUrls = (limit: number) =>
  fetch(`${BASE_API_URL}?limit=${limit}&offset=0`).then(
    (res) => res.json() as Promise<PokemonList>
  );

export const fetchPokemon = (id: string) =>
  fetch(`${BASE_API_URL}/${id}`).then((res) => res.json() as Promise<Pokemon>);
