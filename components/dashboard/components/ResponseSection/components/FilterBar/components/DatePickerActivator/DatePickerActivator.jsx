import { DatePicker } from './components';
import { useState } from 'react';
import styles from './DatePickerActivator.module.css';

const DatePickerActivator = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePicker = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 600) {
      if (isOpen) {
        document.getElementById('dark-overlay').classList.remove('show');
        document.body.classList.remove('no-scroll');
      } else {
        document.getElementById('dark-overlay').classList.add('show');
        document.body.classList.add('no-scroll');
      }
    }
    setIsOpen((oldState) => !oldState);
  };

  return (
    <div className='d-flex flex-column w-100 position-relative'>
      <div className={styles.Activator} onClick={togglePicker}>
        <div>Apr 4, 23 - Apr 5, 23</div>
        <div>
          <i className='fa-regular fa-calendar' />
        </div>
      </div>
      <DatePicker isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default DatePickerActivator;
