import { MultiSelect, DatePickerActivator } from './components';
import { FilterButton } from '../FilterButton';
import { useDashboard } from '@/lib/re/dashboard';
import { useFilterBar } from '../../hooks';
import styles from './FilterBar.module.css';

export const FilterBar = () => {
  const { setSelectedItems } = useFilterBar();
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

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.FilterOptions}>
          <div className={styles.Col}>
            <MultiSelect
              className={styles.Select}
              surveyOptions={surveyOptions}
              participantOptions={participantOptions}
              onChange={setSelectedItems}
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
