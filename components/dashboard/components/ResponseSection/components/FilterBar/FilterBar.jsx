import { MultiSelect, DatePicker, DatePickerActivator } from './components';
import { FilterButton } from '../FilterButton';
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
    type: 'survey',
  }));

  const participantOptions = participants.map((p) => ({
    value: p.participant_identifier,
    label: `${p.demographics.first_name} ${p.demographics.last_name}`,
    type: 'participant',
  }));

  const onChangeFromDatePicker = (e) => setStartTime(e.target.value);
  const onChangeToDatePicker = (e) => setEndTime(e.target.value);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.FilterOptions}>
          <div className={styles.Col}>
            <MultiSelect
              className={styles.Select}
              optionsOne={surveyOptions}
              optionsTwo={participantOptions}
              placeholder='Select surveys...'
              type='survey'
              onChange={setSelectedSurveys}
            />
          </div>
          <div className={styles.Col}>
            <DatePickerActivator />
          </div>
        </div>
        <FilterButton />
      </div>
    </>
  );
};
