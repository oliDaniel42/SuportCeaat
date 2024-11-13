import { ImageSourcePropType } from 'react-native';

export type ImageSliderType = {
  title: string;
  image: ImageSourcePropType;
  description: string;
};

export const ImageSlider = [
  {
    title: 'Depressão',
    image: require('../assets/images/shinji.jpg'),
    description: 'A depressão é um transtorno de humor caracterizado por uma tristeza profunda e persistente, perda de interesse em atividades, falta de energia e alterações no sono e apetite. Esse estado pode levar a sentimentos de inutilidade, desesperança e até pensamentos suicidas. A depressão é tratável, e o tratamento pode envolver terapia, medicamentos ou uma combinação dos dois, auxiliando na recuperação e na melhoria da qualidade de vida'
  },
  {
    title: 'Ansiedade',
    image: require('../assets/images/1263369140-ansiedade.webp'),
    description: 'A ansiedade é uma reação natural ao estresse, mas pode se tornar um transtorno quando é intensa, duradoura e interfere na vida cotidiana. Os sintomas incluem preocupação excessiva, medo constante, irritabilidade, dificuldade de concentração e sintomas físicos, como tensão muscular e batimentos cardíacos acelerados. A ansiedade pode ser tratada com terapias e, em alguns casos, medicamentos, ajudando a pessoa a gerenciar o impacto no dia a dia'
  },
];