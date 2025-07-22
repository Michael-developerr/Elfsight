import { StyledCard, CardImg, CardInfo } from './card/StyledCard';

import { CardStatus } from './card/CardStatus';
import { CardTitle } from './card/CardTitle';

export function MultCard({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) {
  return (
    <StyledCard onClick={onClickHandler}>
      <CardImg src={image} alt={name} />
      <CardInfo>
        <CardTitle name={name} gender={gender} />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </StyledCard>
  );
}
