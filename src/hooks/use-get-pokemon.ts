import { fetchPokemonUrls, fetchPokemon } from "@/utils/service";
import { BASE_LIMIT } from "@/utils/consts";
import { useQuery, keepPreviousData, useQueries } from "@tanstack/react-query";
import { useState } from "react";

export const useGetPokemon = () => {
  const [limit, setLimit] = useState(BASE_LIMIT);

  const { isPending: isPokemonIdsPending, data: pokemonIdsData } = useQuery({
    queryKey: ["pokemonIds", limit],
    queryFn: () => fetchPokemonUrls(limit),
    placeholderData: keepPreviousData,
    select: (data) => data.results.map((result) => result.url.split("/")[6]),
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

      if (results.length === BASE_LIMIT && arePokemonPending) {
        return {
          data: [],
          arePokemonPending,
        };
      }

      return {
        data: results
          .map((result) => result.data)
          .slice(0, arePokemonPending ? limit - BASE_LIMIT : undefined)
          .filter(Boolean),
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
