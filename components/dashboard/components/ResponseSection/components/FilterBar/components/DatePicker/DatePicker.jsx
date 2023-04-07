import { Form } from 'react-bootstrap';

const DatePicker = ({ className, onChange, type }) => {
  const filterData = getFromSession();

  let defaultValue = '';

  if (type === 'from' && Object.keys(filterData).includes('start')) {
    defaultValue = filterData.start;
  } else if (type === 'to' && Object.keys(filterData).includes('end')) {
    defaultValue = filterData.end;
  }

  return (
    <Form.Group controlId='datetimePickerTwo' className={className}>
      <Form.Control
        type='date'
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Form.Group>
  );
};

const getFromSession = () => {
  const dataFromSession = sessionStorage.getItem('response_filter');
  const responseQuery = dataFromSession ? JSON.parse(dataFromSession) : {};
  return responseQuery;
};

export default DatePicker;
