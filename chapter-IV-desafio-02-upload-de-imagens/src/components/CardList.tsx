import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  const handleViewImage = (url: string): void => {
    setSelectedImageUrl(url);
    onOpen();
  };

  return (
    <>
      {
        /* TODO CARD GRID */
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
          {cards.map(card => {
            return (
              <Card key={card.id} data={card} viewImage={handleViewImage} />
            );
          })}
        </SimpleGrid>
      }

      {
        /* TODO MODALVIEWIMAGE */
        <ModalViewImage
          imgUrl={selectedImageUrl}
          isOpen={isOpen}
          onClose={onClose}
        />
      }
    </>
  );
}
