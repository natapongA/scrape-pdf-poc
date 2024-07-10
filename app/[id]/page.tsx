import React from "react";
import Image from "next/image";

type Sprites = {
  front_default: string;
};

type Pokemon = {
  name: string;
  sprites: Sprites;
};

const getPokemon = async (id: string): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return data;
};

const Page = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const pokemon = await getPokemon(id);
  return (
    <div id="pdf-content">
      <style>
        {`    
        .wrapper{         
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .title{
            font-size: 5rem;
            font-weight: bold;
            margin-bottom: 16px;
            }

            .image-wrapper{
                position: relative;
                width: 200px;
                height: 200px;
            }
        `}
      </style>
      <div className="wrapper">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="title">{pokemon.name}</h1>
          <div className="image-wrapper">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
