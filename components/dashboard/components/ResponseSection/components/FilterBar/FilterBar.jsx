import { MultiSelect, DatePicker } from './components';
import { useDashboard } from '@/core/hooks';
import { useFilterBar } from '../../hooks';
import styles from './FilterBar.module.css';

export const FilterBar = () => {
  const {
    setSelectedParticipants,
    setSelectedSurveys,
    setStartTime,
    setEndTime,
  } = useFilterBar();

  const { responseSectionData } = useDashboard();

  const { participants, surveys } = responseSectionData;

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
          />
          <MultiSelect
            className={styles.Select}
            options={participantOptions}
            placeholder='Select participants...'
            type='participant'
            onChange={setSelectedParticipants}
          />
        </div>
        <div className={styles.Col}>
          <DatePicker
            className={styles.Form}
            onChange={onChangeFromDatePicker}
            type='from'
          />
          <DatePicker
            className={styles.Form}
            onChange={onChangeToDatePicker}
            type='to'
          />
        </div>
      </div>
    </>
  );
};
