import { DateRange } from 'react-date-range';
import styles from './DatePicker.module.css';
import { Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { hideWhenClickedOutside } from '@/core/utils';

export const DatePicker = ({ isOpen, setIsOpen }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 600);

  useEffect(() => {
    function handleResize() {
      setIsWideScreen(window.innerWidth > 600);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closePicker = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 600) {
      document.body.classList.remove('no-scroll');
      document.getElementById('dark-overlay').classList.remove('show');
    }
    setIsOpen(false);
  };

  const pickerRef = useRef();
  hideWhenClickedOutside(pickerRef, closePicker);

  return (
    <div
      className={`flex-column me-auto ${styles.PickerWrapper} ${
        isOpen ? styles.Top : styles.Bottom
      }`}
      style={isWideScreen ? { display: isOpen ? 'flex' : 'none' } : {}}
      ref={pickerRef}
    >
      <DateRange
        className={styles.DateRange}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      <div
        className={`d-flex flex-row-reverse p-2 border-top-1 ${styles.Footer}`}
      >
        <Button onClick={closePicker} className={styles.CloseButton}>
          Close
        </Button>
      </div>
    </div>
  );
};
