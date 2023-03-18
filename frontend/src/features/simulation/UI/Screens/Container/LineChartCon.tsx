import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { useRecoilValue } from 'recoil';
import { SimulationResultDataState } from 'src/features/simulation/Hook/SimulationResultDataState';
import { AnswerDataState } from 'src/features/simulation/Hook/AnswerDataState';

export const LineChartCon = () => {
  const SimulationResultData = useRecoilValue(SimulationResultDataState);
  const AnswerData = useRecoilValue(AnswerDataState);

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

  //0-100の全部の”年後”を表示しちゃうからちょっとしょっぱい
  //10年ごととかで出したい
  const labels = [...Array(101 - AnswerData.myAge)].map((_, i) => `${i + AnswerData.myAge}歳`);
  const lineData = {
    labels,
    datasets: [
      {
        data: SimulationResultData.map((item) => item.deposit),
        borderColor: '#E64980',
        backgroundColor: '#E64980',
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
        text: '貯蓄残高の予測',
      },
    },
  };

  return <Line data={lineData} options={options} width={1} height={1} />;
};
