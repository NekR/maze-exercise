import Pokemon from 'containers/Pokemon';

export default class PokemonPage extends Component {
  render() {
    return <Pokemon name={this.props.params.name} />
  }
}