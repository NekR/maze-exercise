import { ContentBox, ImageBox, Image, InfoBox, InfoItem } from './style.css';

const keyNames = {
  name: 'Name',
  classification: 'Classification',
  types: 'Types',
  resistant: 'Resistant',
  weaknesses: 'Weaknesses',
  fleeRate: 'Flee rate',
  maxCP: 'Max CP',
  maxHP: 'Max HP',
};

export default function({ pokemon }) {
  return (
    <ContentBox>
      <ImageBox>
        <Image tag="img" src={pokemon.image} alt={pokemon.name} />
      </ImageBox>
      <InfoBox>
        {Object.keys(keyNames).map(key => {
          return (
            <InfoItem key={key}>
              {keyNames[key]}:{' '}
              {Array.isArray(pokemon[key])
                ? pokemon[key].join(', ')
                : pokemon[key]}
            </InfoItem>
          );
        })}
      </InfoBox>
    </ContentBox>
  );
}
