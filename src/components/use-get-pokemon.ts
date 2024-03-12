import { BASE_API_URL, BASE_LIMIT } from "@/utils/consts";
import { useQuery, keepPreviousData, useQueries } from "@tanstack/react-query";
import { useState } from "react";

const fetchPokemonUrls = (limit: number) =>
  fetch(`${BASE_API_URL}?limit=${limit}&offset=0`).then((res) => res.json());

const fetchPokemon = (id: string) =>
  fetch(`${BASE_API_URL}/${id}`).then((res) => res.json());

export const useGetPokemon = () => {
  const [limit, setLimit] = useState(BASE_LIMIT);

  const { isPending: isPokemonIdsPending, data: pokemonIdsData } = useQuery({
    queryKey: ["pokemonUrls", limit],
    queryFn: () => fetchPokemonUrls(limit),
    placeholderData: keepPreviousData,
    select: (data) =>
      data.results.map((result: { url: string }) => result.url.split("/")[6]),
  });

  const { data, arePokemonPending } = useQueries({
    queries: pokemonIdsData
      ? pokemonIdsData.map((id: string) => ({
          queryKey: ["pokemon", id],
          queryFn: () => fetchPokemon(id),
          staleTime: Infinity,
        }))
      : [],

    combine: (results) => {
      const arePokemonPending = results.some((result) => result.isPending);

      if (results.length === 20 && arePokemonPending) {
        return {
          data: [],
          arePokemonPending,
        };
      }

      return {
        data: results
          .map((result) => result.data)
          .slice(0, arePokemonPending ? limit - 20 : undefined),
        arePokemonPending,
      };
    },
  });

  return {
    isPending: arePokemonPending || isPokemonIdsPending,
    data,
    setLimit,
  };
};
