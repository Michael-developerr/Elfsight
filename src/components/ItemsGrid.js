import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { MultCard } from './MultCard';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const handlersMap = useMemo(() => {
    const map = new Map();
    characters.forEach((character) => {
      map.set(character.id, () => {
        setPopupSettings({
          visible: true,
          content: { ...character }
        });
      });
    });

    return map;
  }, [characters]);

  if (!characters.length) return null;

  return (
    <Container>
      {characters.map((props) => (
        <MultCard
          key={props.id}
          onClickHandler={handlersMap.get(props.id)}
          {...props}
        />
      ))}
      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
