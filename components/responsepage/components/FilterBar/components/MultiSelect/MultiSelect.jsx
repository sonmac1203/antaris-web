import { useMemo } from 'react';
import Select, { components } from 'react-select';

const MultiSelect = ({
  options,
  className,
  placeholder,
  type,
  onChange,
  defaultValue,
}) => {
  const ValueContainer = ({ children, ...props }) => {
    let [values, input] = children;
    if (Array.isArray(values)) {
      const plural = values.length === 1 ? '' : 's';
      values = `${values.length} ${type || 'item'}${plural} selected`;
    }

    return (
      <components.ValueContainer {...props}>
        <div
          style={{
            gridArea: '1/1/2/3',
            marginLeft: '2px',
            marginRight: '2px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {values}
        </div>
        {input}
      </components.ValueContainer>
    );
  };

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
    }),
    []
  );

  return (
    <Select
      components={{
        ValueContainer,
      }}
      defaultValue={defaultValue || []}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      options={options}
      className={className}
      isMulti
      placeholder={placeholder || 'Select...'}
      styles={customStyles}
      onChange={onChange}
    />
  );
};

export default MultiSelect;
