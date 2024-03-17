import { Attribute } from "@/components/attribute";
import { capitalize } from "@/utils/tools";
import { Pokemon } from "@/utils/types";
import { useState } from "react";

type Props = {
  pokemon: Pokemon;
};

export const PokemonCard = ({ pokemon }: Props) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const { types, sprites, name, weight, height } = pokemon;

  const pokemonTypes = types
    .map(({ type }) => capitalize(type.name))
    .join(", ");

  return (
    <div
      className="p-4 bg-slate-200 rounded-lg flex flex-col justify-start cursor-pointer shadow-md"
      onClick={() => setShowMoreInfo((prev) => !prev)}
    >
      <img src={sprites.front_default} className="object-contain h-48" />

      <div className="flex justify-between">
        <div>
          <Attribute name="Name" value={capitalize(name)} />
          <Attribute name="Types" value={pokemonTypes} />
        </div>

        <div
          className={`transition-opacity duration-150 ${
            showMoreInfo ? "opacity-100" : "opacity-0"
          }`}
        >
          <Attribute name="Weight" value={weight} />
          <Attribute name="Height" value={height} />
        </div>
      </div>
    </div>
  );
};
