import { getResponseFilterFromSession } from '@/core/utils';
import { ValueContainer } from './components';
import { useMemo } from 'react';
import Select from 'react-select';

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
  const { participant_ids, survey_ids } = getResponseFilterFromSession();
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

export default MultiSelect;
