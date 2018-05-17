import { ContentBox } from './style.css';
import Item from './Item';

export default function({ items, onSelected }) {
  return (
    <ContentBox>
      {items.map(({ name, id, image }) => {
        return (
          <Item
            key={name + id}
            name={name}
            id={id}
            image={image}
            onSelected={onSelected}
          />
        );
      })}
    </ContentBox>
  );
}
