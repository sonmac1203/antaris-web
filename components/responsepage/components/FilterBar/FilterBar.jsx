import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { MultiSelect, DatePicker } from './components';
import { useResponse } from '@/core/hooks';
import styles from './FilterBar.module.css';

export const FilterBar = () => {
  const {
    filterData,
    surveysData: surveys,
    participantsData: participants,
    setSelectedParticipants,
    setSelectedSurveys,
    setStartTime,
    setEndTime,
  } = useResponse();

  const surveyOptions = surveys.map((s) => ({
    value: s.mdh_id,
    label: s.display_name,
  }));

  const participantOptions = participants.map((p) => ({
    value: p.participant_identifier,
    label: `${p.demographics.first_name} ${p.demographics.last_name}`,
  }));

  const onChangeFromDatePicker = (e) => setStartTime(e.target.value);
  const onChangeToDatePicker = (e) => setEndTime(e.target.value);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Col}>
          <MultiSelect
            className={styles.Select}
            options={surveyOptions}
            placeholder='Select surveys...'
            type='survey'
            onChange={setSelectedSurveys}
            defaultValue={filterData.defaultSurveys}
          />
          <MultiSelect
            className={styles.Select}
            options={participantOptions}
            placeholder='Select participants...'
            type='person'
            onChange={setSelectedParticipants}
            defaultValue={filterData.defaultParticipants}
          />
        </div>
        <div className={styles.Col}>
          <DatePicker
            className={styles.Form}
            onChange={onChangeFromDatePicker}
            defaultValue={filterData.defaultStartTime}
          />
          <DatePicker
            className={styles.Form}
            onChange={onChangeToDatePicker}
            defaultValue={filterData.defaultEndTime}
          />
        </div>
      </div>
    </>
  );
};
