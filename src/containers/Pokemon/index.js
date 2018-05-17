import { connect } from 'react-redux';
import PokemonContent from 'components/Pokemon/Content';
import PokemonError from 'components/Pokemon/Error';
import PokemonLoading from 'components/Pokemon/Loading';

class Pokemon extends Component {
  state = {
    error: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { pokemon, getPokemonDetail, name } = this.props;

    this.setState({ error: false });

    if (!pokemon) {
      getPokemonDetail(name).catch(err => {
        this.setState({ error: true });
      });
    }
  }

  render() {
    const { pokemon } = this.props;
    const { error } = this.state;

    if (error) {
      return <PokemonError />;
    }

    if (pokemon) {
      return <PokemonContent pokemon={pokemon} />;
    }

    return <PokemonLoading />;
  }
}

export default connect(
  (state, ownProps) => {
    const { pokemonsMap, hasDetail } = state.pokemons;

    return {
      pokemon: hasDetail[ownProps.name] ? pokemonsMap[ownProps.name] : null,
    };
  },
  dispatch => {
    return { getPokemonDetail: dispatch.pokemons.getPokemonDetail };
  }
)(Pokemon);
