import { useMemo, useState, useRef, createRef } from 'react';
import { ParticipantSectionContext } from '../../context';
import { ParticipantsListItem } from '../ParticipantsListItem';

export const Provider = ({ children, value }) => {
  const inputCardKey = useRef(0);
  const [inputCards, setInputCards] = useState([]);

  const getInputCard = (key) => {
    const participantRef = createRef();
    const projectRef = createRef();
    return {
      participantRef,
      projectRef,
      card: (
        <ParticipantsListItem
          participantRef={participantRef}
          projectRef={projectRef}
          key={key}
        />
      ),
    };
  };

  const handleAddNewParticipant = () => {
    const newInputCard = getInputCard(inputCardKey.current);
    inputCardKey.current += 1;
    setInputCards([...inputCards, newInputCard]);
  };

  const handleRemoveMostRecentParticipant = () => {
    if (!inputCards || inputCards.length === 0) {
      return;
    }
    const newInputCards = [...inputCards];
    newInputCards.pop();
    setInputCards(newInputCards);
  };

  const memoObject = value
    ? {
        ...value,
        inputCards,
        handleAddNewParticipant,
        handleRemoveMostRecentParticipant,
      }
    : {
        inputCards,
        handleAddNewParticipant,
        handleRemoveMostRecentParticipant,
      };

  const memoArray = value
    ? [
        inputCards,
        handleAddNewParticipant,
        handleRemoveMostRecentParticipant,
        value.refreshKey,
      ]
    : [inputCards, handleAddNewParticipant, handleRemoveMostRecentParticipant];

  const participantSectionContextValue = useMemo(() => memoObject, memoArray);

  return (
    <ParticipantSectionContext.Provider value={participantSectionContextValue}>
      {children}
    </ParticipantSectionContext.Provider>
  );
};
