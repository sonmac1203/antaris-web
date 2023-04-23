import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

export const CurrentParticipantListSkeleton = () => {
  return (
    <Card>
      <Card.Body>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as={Card.Text} animation='glow'>
          <Placeholder xs={7} bg='secondary' />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};
