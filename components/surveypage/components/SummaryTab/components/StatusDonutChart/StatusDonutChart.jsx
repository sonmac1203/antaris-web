import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CompContainer } from '../CompContainer';
import { LegendItem } from './components';
import { useSurvey } from '@/lib/re/surveyoverview';
import { Doughnut } from 'react-chartjs-2';
import styles from './StatusDonutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const StatusDonutChart = () => {
  const { surveyData } = useSurvey();

  const totalAssignments = surveyData.assigned_to.length;

  const analysis = surveyData.assigned_to.reduce(
    (acc, obj) => {
      if (obj.progress === 100) {
        acc.completedCount++;
      } else if (obj.progress > 0 && obj.progress < 100) {
        acc.pendingCount++;
      } else if (obj.progress === 0) {
        acc.notStartedCount++;
      }
      return acc;
    },
    { completedCount: 0, pendingCount: 0, notStartedCount: 0 }
  );

  const chartData = [
    {
      label: 'Completed',
      value: analysis.completedCount,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
    },
    {
      label: 'Pending',
      value: analysis.pendingCount,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
    },
    {
      label: 'Not started',
      value: analysis.notStartedCount,
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
    },
  ];

  let accumulatePercentage = 0;
  chartData.forEach((type, index) => {
    if (index === 2) {
      type.percentage = 100 - accumulatePercentage;
    } else {
      type.percentage = Math.round((type.value / totalAssignments) * 100);
      accumulatePercentage += type.percentage;
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: chartData.map((d) => d.label),
    datasets: [
      {
        label: 'assignments',
        data: chartData.map((d) => d.value),
        backgroundColor: chartData.map((d) => d.backgroundColor),
        borderColor: chartData.map((d) => d.borderColor),
        borderWidth: 1,
      },
    ],
  };

  return (
    <CompContainer title='Assignment status overview' subtitle='All time data'>
      <div className={styles.ChartContainer}>
        <Doughnut data={data} options={options} />
      </div>
      <div className='d-flex flex-column gap-2'>
        {chartData.map((d, key) => (
          <LegendItem
            key={key}
            text={d.label}
            borderColor={d.borderColor}
            backgroundColor={d.backgroundColor}
            percentage={d.percentage}
          />
        ))}
      </div>
    </CompContainer>
  );
};
