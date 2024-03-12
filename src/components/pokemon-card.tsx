import { Attribute } from "@/components/attribute";
import { capitalize } from "@/utils/tools";
import { useState } from "react";

export const PokemonCard = ({ pokemon }: { pokemon: any }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const pokemonTypes = pokemon.types
    .map((type: any) => capitalize(type.type.name))
    .join(", ");

  return (
    <div
      className="p-4 bg-slate-200 rounded-lg flex flex-col  justify-start cursor-pointer"
      onClick={() => setShowMoreInfo((prev) => !prev)}
    >
      <img
        src={pokemon.sprites.front_default}
        className="object-contain h-48"
      />
      <Attribute name="Name" value={capitalize(pokemon.name)} />
      <Attribute name="Types" value={pokemonTypes} />

      {showMoreInfo ? (
        <>
          <Attribute name="Weight" value={pokemon.weight} />
          <Attribute name="Height" value={pokemon.height} />
        </>
      ) : null}
    </div>
  );
};
