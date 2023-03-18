import { Table, Title } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { SelectYearState } from 'src/features/simulation/Hook/SelectYearState';
import { SimulationResultDataState } from 'src/features/simulation/Hook/SimulationResultDataState';

export const DataDispCon = () => {
  const SelectYear = useRecoilValue(SelectYearState);
  const SimulationResultData = useRecoilValue(SimulationResultDataState);

  const SelectYearData = SimulationResultData.filter((item) => item.yearLater === SelectYear)[0];

  const DispList = [
    {
      text: '収入',
      color: '#3DA5EB',
      num: SelectYearData.income,
    },
    {
      text: '支出',
      color: '#FF6A8A',
      num: SelectYearData.spending,
    },
    {
      text: '貯蓄比率',
      color: '#FFD777',
      num: Number.isNaN(SelectYearData.savings / (SelectYearData.income + SelectYearData.spending))
        ? 0
        : Math.round(
            (SelectYearData.savings / (SelectYearData.income + SelectYearData.spending)) * 100
          ),
    },
  ];

  return (
    <Table verticalSpacing="lg" mt={10}>
      <tbody>
        {DispList.map((item) => (
          <tr key={item.text}>
            <td>
              <Title
                suppressHydrationWarning
                order={4}
                align="left"
                sx={{ fontWeight: 'inherit', color: item.color }}
              >
                {item.text}
              </Title>
            </td>
            <td>
              <Title
                suppressHydrationWarning
                order={4}
                align="right"
                sx={{ fontWeight: 'inherit' }}
              >
                {item.text === '貯蓄比率' ? `${item.num}%` : `${item.num}万円`}
              </Title>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
