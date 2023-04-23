import { components } from 'react-select';
import { getLabel, getAmountOfType } from '../../utils';

export const ValueContainer = ({ children, ...props }) => {
  const style = {
    gridArea: '1/1/2/3',
    margin: '0 2px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  };

  let [values, input] = children;
  const { getValue } = props;
  const selectedOptions = getValue();
  const numSurveys = getAmountOfType(selectedOptions, 'survey');
  const numParticipants = getAmountOfType(selectedOptions, 'participant');

  let result = '';
  if (numSurveys > 0) {
    result += getLabel(numSurveys, 'survey');
  }
  if (numParticipants > 0) {
    if (result) result += ', ';
    result += getLabel(numParticipants, 'participant');
  }

  if (Array.isArray(values)) {
    values = result;
  }
  return (
    <components.ValueContainer {...props}>
      <div style={style}>{values}</div>
      {input}
    </components.ValueContainer>
  );
};
