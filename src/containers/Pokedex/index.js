import { connect } from 'react-redux';

import PokedexLoading from 'components/Pokedex/Loading';
import PokedexError from 'components/Pokedex/Error';
import PokedexContent from 'components/Pokedex/Content';

class Pokedex extends Component {
  state = {
    error: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { pokemons, getPokemons } = this.props;

    this.setState({ error: false });

    if (!pokemons.pokemonsIndex) {
      getPokemons().catch((e) => {
        console.error(e);
        this.setState({ error: true });
      });
    }
  }

  render() {
    const { pokemonsMap, pokemonsIndex } = this.props.pokemons;
    const { navigate } = this.props;
    const { error } = this.state;

    if (!pokemonsIndex && !error) {
      return <PokedexLoading />;
    }

    if (error) {
      return <PokedexError onRetry={this.fetchData} />;
    }

    return <PokedexContent
      items={pokemonsIndex.map(key => pokemonsMap[key])}
      onSelected={(name) => {
        navigate(`/pokemon/${name}`);
      }}
    />
  }
}

export default connect(
  state => {
    return { pokemons: state.pokemons };
  },
  dispatch => {
    return {
      getPokemons: dispatch.pokemons.getPokemons,
      navigate: dispatch.router.navigate,
    };
  }
)(Pokedex);
