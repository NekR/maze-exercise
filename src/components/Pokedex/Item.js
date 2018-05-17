import { ItemBox, ItemTitle, ItemImageBox, ItemImage } from './style.css';

export default class Item extends Component {
  state = {
    imageLoaded: false,
  };

  onImageLoaded = () => {
    this.setState({ imageLoaded: true });
  };

  render() {
    const { name, id, image, onSelected } = this.props;
    const { imageLoaded } = this.state;

    return (
      <ItemBox onClick={() => onSelected(name)}>
        <ItemImageBox>
          <ItemImage
            tag="img"
            src={image}
            hidden={!imageLoaded}
            alt={name}
            onLoad={this.onImageLoaded}
          />
        </ItemImageBox>
        <ItemTitle>{name}</ItemTitle>
      </ItemBox>
    );
  }
}
