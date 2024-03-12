import { PokemonCard } from "@/components/pokemon-card";
import { useGetPokemon } from "@/components/use-get-pokemon";

export const Pokemon = () => {
  const { data, isPending, setLimit } = useGetPokemon();

  const handleClickButton = () => {
    if (isPending) {
      return;
    }

    setLimit((prev) => prev + 20);
  };

  if (!data.length) {
    return null;
  }

  return (
    <div className="w-4/6 bg-white rounded-lg p-4 flex flex-col my-10">
      <div className="grow grid grid-cols-5 gap-4">
        {data.map((pokemon: any) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <button
        className="p-4 mt-10 text-lg bg-cyan-500 rounded-md text-white disabled:bg-cyan-100  disabled:text-cyan-400 hover:bg-cyan-600 active:hover:bg-cyan-700 transition-colors duration-150"
        disabled={isPending}
        onClick={handleClickButton}
      >
        Load more
      </button>

      <div className="fixed bottom-0 left-0">
        Current number of Pokémon: {data.length}
      </div>
    </div>
  );
};
