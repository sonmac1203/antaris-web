import { getResponseFilterFromSession } from '@/core/utils';
import { useContext } from 'react';
import { DatePickerContext } from '../../context';
import { getShortDate } from '../../utils';
import styles from './Activator.module.css';

export const Activator = () => {
  const { dateRange, togglePicker } = useContext(DatePickerContext);
  const filterData = getResponseFilterFromSession();

  const getLabel = (fromDate, toDate) => {
    const fromLabel = fromDate
      ? getShortDate(fromDate)
      : filterData?.start
      ? getShortDate(filterData.start)
      : 'From';
    const toLabel = toDate
      ? getShortDate(toDate)
      : filterData?.end
      ? getShortDate(filterData.end)
      : 'To';
    return `${fromLabel} - ${toLabel}`;
  };

  return (
    <div className={styles.Activator} onClick={togglePicker} role='button'>
      <div>{getLabel(dateRange[0]?.startDate, dateRange[0]?.endDate)}</div>
      <div>
        <i className='fa-regular fa-calendar' />
      </div>
    </div>
  );
};
