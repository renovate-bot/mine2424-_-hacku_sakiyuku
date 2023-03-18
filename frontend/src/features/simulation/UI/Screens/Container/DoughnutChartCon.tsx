import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
} from 'chart.js';
import { useRecoilValue } from 'recoil';
import { SelectYearState } from 'src/features/simulation/Hook/SelectYearState';
import { SimulationResultDataState } from 'src/features/simulation/Hook/SimulationResultDataState';

export const DoughnutChartCon = () => {
  const SelectYear = useRecoilValue(SelectYearState);
  const SimulationResultData = useRecoilValue(SimulationResultDataState);

  const SelectYearData = SimulationResultData.filter((item) => item.yearLater === SelectYear)[0];

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title);
  const circleData = {
    labels: ['支出', '貯蓄比率'],
    datasets: [
      {
        data: [SelectYearData.spending, SelectYearData.savings],
        backgroundColor: ['#FFE0E6', '#FFF5DD'], //'#D7ECFB',
        borderColor: ['#FF6A8A', '#FFD777'], //'#3DA5EB'
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '収入に対する支出・貯蓄の内訳',
      },
    },
  };

  return <Doughnut data={circleData} options={options} />;
};
