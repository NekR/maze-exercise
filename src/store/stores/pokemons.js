import { apiQuery } from 'off-thread';
import gql from 'graphql-tag';

export default {
  state: {
    pokemonsMap: null,
    pokemonsIndex: null,
    hasDetail: {},
  },
  effects: {
    async getPokemons(_, { pokemons }) {
      if (pokemons.pokemonsIndex) {
        return;
      }

      const { data, networkStatus } = await queryPokemons();

      if (networkStatus === 8) {
        throw new Error('Network error');
      }

      this.setPokemons(data);
    },

    async getPokemonDetail(name, { pokemons }) {
      if (pokemons.hasDetail[name]) {
        return;
      }

      const { data, networkStatus } = await queryPokemon(name);

      if (networkStatus === 8) {
        throw new Error('Network error');
      }

      if (data.pokemon) {
        this.setPokemon(data);
      } else {
        throw new Error('Network error');
      }
    },
  },
  reducers: {
    setPokemons(state, { pokemons }) {
      const pokemonsMap = {
        ...state.pokemonsMap,
      };

      const pokemonsIndex = pokemons.map(pokemon => {
        if (!pokemonsMap[pokemon.name]) {
          pokemonsMap[pokemon.name] = pokemon;
        }

        return pokemon.name;
      });

      return {
        ...state,
        pokemonsMap,
        pokemonsIndex,
      };
    },

    setPokemon(state, { pokemon }) {
      return {
        ...state,
        hasDetail: {
          ...state.hasDetail,
          [pokemon.name]: true,
        },
        pokemonsMap: {
          ...state.pokemonsMap,
          [pokemon.name]: pokemon,
        },
      };
    },
  },
};

function queryPokemons() {
  return apiQuery({
    query: gql`
      {
        pokemons(first: 5000) {
          id
          name
          image
        }
      }
    `,
  });
}

function queryPokemon(name) {
  return apiQuery({
    query: gql`
      {
        pokemon(name: "${name}") {
          id,
          name,
          image,
          classification,
          types,
          resistant,
          weaknesses,
          fleeRate,
          maxCP,
          maxHP
        }
      }
    `,
  });
}
