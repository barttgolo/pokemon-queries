import { PokemonCard } from "@/components/pokemon-card";
import { Skeleton } from "@/components/skeleton";
import { useGetPokemon } from "@/hooks/use-get-pokemon";
import { BASE_LIMIT } from "@/utils/consts";
import { ElementRef, useEffect, useRef } from "react";

export const Pokemon = () => {
  const { data, isPending, setLimit } = useGetPokemon();
  const buttonRef = useRef<ElementRef<"button">>(null);

  const handleClickButton = () => {
    if (isPending) {
      return;
    }

    setLimit((prev) => prev + BASE_LIMIT);
  };

  useEffect(() => {
    if (
      isPending ||
      !buttonRef.current ||
      data.length === 20 ||
      window.innerWidth < 768
    ) {
      return;
    }

    buttonRef.current.scrollIntoView({ behavior: "smooth" });
  }, [isPending]);

  if (!data.length) {
    return null;
  }

  return (
    <div className="w-5/6 bg-white rounded-lg p-4 flex flex-col my-4 md:my-7 xl:my-10 shadow-lg">
      <div className="grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        {isPending ? <Skeleton /> : null}
      </div>

      <button
        ref={buttonRef}
        className="p-4 mt-10 text-lg bg-cyan-500 rounded-md text-white disabled:bg-cyan-100  disabled:text-cyan-400 hover:bg-cyan-600 active:hover:bg-cyan-700 transition-colors duration-150"
        disabled={isPending}
        onClick={handleClickButton}
      >
        Load more
      </button>

      <div className="fixed bottom-1 md:bottom-4 bg-blue-500 left-1 md:left-4 h-10 w-10 md:h-16 md:w-16 text-center rounded-full flex justify-center items-center">
        <span className="text-white font-semibold">{data.length}</span>
      </div>
    </div>
  );
};
