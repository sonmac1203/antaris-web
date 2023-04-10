import { useState, useMemo } from 'react';
import { DatePickerContext } from './context';
import { DatePicker, Activator } from './components';
import { enableOverlay, disableOverlay } from './utils';
import { getResponseFilterFromSession } from '@/core/utils';

const DatePickerActivator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { start, end } = getResponseFilterFromSession();
  const [dateRange, setDateRange] = useState([
    {
      startDate: start ? new Date(start) : null,
      endDate: end ? new Date(end) : null,
      key: 'selection',
    },
  ]);

  const togglePicker = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 600) {
      if (isOpen) disableOverlay();
      else enableOverlay();
    }
    setIsOpen((oldState) => !oldState);
  };

  const datePickerContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      dateRange,
      setDateRange,
      togglePicker,
    }),
    [dateRange, isOpen]
  );

  return (
    <DatePickerContext.Provider value={datePickerContextValue}>
      <div className='d-flex flex-column w-100 position-relative'>
        <Activator />
        <DatePicker />
      </div>
    </DatePickerContext.Provider>
  );
};

export default DatePickerActivator;
