import { useMemo } from 'react';
import Select, { components } from 'react-select';
import styles from './MultiSelect.module.css';

const ValueContainer = ({ children, ...props }) => {
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
      <div className={styles.ValueContainer}>{values}</div>
      {input}
    </components.ValueContainer>
  );
};

const MultiSelect = ({
  surveyOptions,
  participantOptions,
  className,
  onChange,
}) => {
  const customStyles = useMemo(
    () => ({
      control: (provided) => ({
        ...provided,
        borderRadius: '0.375rem',
        borderColor: '#ced4da',
      }),
      valueContainer: (provided) => ({
        ...provided,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flexWrap: 'nowrap',
        textOverflow: 'ellipsis',
      }),
      placeholder: (provided) => ({
        ...provided,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        svg: {
          fill: 'black',
        },
      }),
    }),
    []
  );

  const groupedOptions = [
    {
      label: 'Surveys',
      options: surveyOptions,
    },
    {
      label: 'Participants',
      options: participantOptions,
    },
  ];
  const { participant_ids, survey_ids } = getFromSession();
  const defaultValue = groupedOptions.flatMap((group) => {
    const selectedIds =
      group.label === 'Surveys' ? survey_ids : participant_ids;
    if (!selectedIds) {
      return [];
    }
    return group.options
      .filter((option) => selectedIds.includes(option.value))
      .map((option) => ({ ...option, group: group.label }));
  });

  return (
    <Select
      components={{
        ValueContainer,
      }}
      defaultValue={defaultValue || []}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      options={groupedOptions}
      className={className}
      isMulti
      placeholder='Select respondents...'
      styles={customStyles}
      onChange={onChange}
    />
  );
};

const getFromSession = () => {
  const dataFromSession = sessionStorage.getItem('response_filter');
  const responseQuery = dataFromSession ? JSON.parse(dataFromSession) : {};
  return responseQuery;
};

const getAmountOfType = (arr, type) => {
  const amount = arr.filter((obj) => obj.type === type).length;
  return amount;
};

const getLabel = (amount, type) => {
  const plural = amount === 1 ? '' : 's';
  const label = `${amount} ${type}${plural} selected`;
  return label;
};

export default MultiSelect;
