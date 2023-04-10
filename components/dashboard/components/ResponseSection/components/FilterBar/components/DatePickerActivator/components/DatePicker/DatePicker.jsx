import { useFilterBar } from '@/components/dashboard/components/ResponseSection/hooks';
import { useState, useEffect, useRef, useContext } from 'react';
import { DatePickerContext } from '../../context';
import { DateRange } from 'react-date-range';
import {
  hideWhenClickedOutside,
  getResponseFilterFromSession,
} from '@/core/utils';
import { Button } from 'react-bootstrap';
import { disableOverlay, getShortDate } from '../../utils';
import styles from './DatePicker.module.css';

export const DatePicker = () => {
  const { setStartTime, setEndTime } = useFilterBar();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 600);

  const {
    isOpen,
    setIsOpen,
    dateRange: state,
    setDateRange: setState,
  } = useContext(DatePickerContext);

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
      disableOverlay();
    }
    setIsOpen(false);
  };

  const handleRangeChange = ({ selection }) => {
    const { startDate, endDate } = selection;
    setState([selection]);
    setStartTime(startDate.toLocaleDateString('en-CA'));
    setEndTime(endDate.toLocaleDateString('en-CA'));
  };

  const pickerRef = useRef();
  hideWhenClickedOutside(pickerRef, closePicker);

  const { start, end } = getResponseFilterFromSession();

  return (
    <div
      className={`flex-column me-auto ${styles.PickerWrapper} ${
        isOpen ? styles.Top : styles.Bottom
      }`}
      style={isWideScreen ? { display: isOpen ? 'flex' : 'none' } : {}}
      ref={pickerRef}
    >
      <DateRange
        startDatePlaceholder={getShortDate(start, 'numeric') || 'Early'}
        endDatePlaceholder={getShortDate(end, 'numeric') || 'Continuous'}
        className={styles.DateRange}
        onChange={handleRangeChange}
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
