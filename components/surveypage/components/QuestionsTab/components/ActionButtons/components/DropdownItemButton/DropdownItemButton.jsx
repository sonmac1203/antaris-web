import { Dropdown, Spinner } from 'react-bootstrap';

export const DropdownItemButton = ({
  error,
  errorText,
  loading,
  loadingText,
  success,
  successText,
  children,
  disabled,
  onClick,
  icon,
}) => {
  return (
    <Dropdown.Item disabled={disabled} onClick={onClick} className='py-2'>
      {!loading ? (
        <i className={`${icon} me-2`} />
      ) : (
        <Spinner
          as='span'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
          className='me-2'
        />
      )}
      {success
        ? successText
        : error
        ? errorText
        : loading
        ? loadingText
        : children}
    </Dropdown.Item>
  );
};
