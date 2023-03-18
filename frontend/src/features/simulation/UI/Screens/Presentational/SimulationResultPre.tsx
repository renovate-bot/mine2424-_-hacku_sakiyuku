import { Card, Container, Grid, Group, Slider, Stack, Title } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AnswerDataState } from 'src/features/simulation/Hook/AnswerDataState';
import { LearningCandidState } from 'src/features/simulation/Hook/LearningCandidState';
import { SelectYearState } from 'src/features/simulation/Hook/SelectYearState';
import { SimulationResultState } from 'src/features/simulation/Hook/SimulationResultState';
import { CurriculumHeader } from '../../../../curriculum/UI/Components/Header';
import { DataDispCon } from '../Container/DataDispCon';
import { DoughnutChartCon } from '../Container/DoughnutChartCon';
import { LearningCandidateCon } from '../Container/LearningCandidateCon';
import { LineChartCon } from '../Container/LineChartCon';
import { TitleCon } from '../Container/TitleCon';

export const SimulationResultPre: FC = () => {
  const LearningCandid = useRecoilValue(LearningCandidState);
  const [SelectYear, setSelectYear] = useRecoilState(SelectYearState);
  const AnswerData = useRecoilValue(AnswerDataState);
  const SimulationResult = useRecoilValue(SimulationResultState);

  return (
    <>
      <CurriculumHeader
        user={{
          name: 'ririka',
          image: 'https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269',
        }}
      />
      <Container size="lg" py="xl" mb={100}>
        <Stack align="center" justify="flex-start" mt={40}>
          <TitleCon>あなたの人生シミュレーションの結果は...</TitleCon>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            mt={80}
            py={40}
            px={150}
            sx={{
              borderWidth: '1px',
              borderRadius: '10px',
              border: 'solid',
              backgroundColor: SimulationResult.resultStatus ? '#F2F9F3' : '#FEF6F9',
              borderColor: SimulationResult.resultStatus ? '#81c784' : '#F5B5CB',
            }}
          >
            <Title order={1} sx={{ fontWeight: 'inherit' }}>
              {SimulationResult.resutlText}
            </Title>
            <Group position="center" mt={40}>
              <Title order={3} sx={{ fontWeight: 'inherit' }}>
                {SimulationResult.resultStatus
                  ? '結果を見てみましょう'
                  : ' 何が問題だったか考えてみましょう'}
              </Title>
              <IconChevronDown />
            </Group>
          </Card>
        </Stack>
        <Grid mt={130} mx={30}>
          <Grid.Col span={8}>
            <LineChartCon />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stack align="center" justify="flex-start" ml={30} mt={20}>
              <DoughnutChartCon />
              <Title order={4} mt={20} sx={{ fontWeight: 'inherit' }}>
                {`${SelectYear + AnswerData.myAge}歳のあなた`}
              </Title>
              <DataDispCon />
              <Group mt={5}>
                <Title order={4} sx={{ fontWeight: 'inherit' }}>
                  内訳を見る
                </Title>
                <IconChevronRight />
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        <Slider
          value={SelectYear}
          onChange={setSelectYear}
          size="lg"
          min={AnswerData.myAge}
          max={100 - AnswerData.myAge}
          marks={[
            { value: 20, label: '20年後' },
            { value: 30, label: '30年後' },
            { value: 40, label: '40年後' },
            { value: 50, label: '50年後' },
            { value: 60, label: '60年後' },
            { value: 70, label: '70年後' },
            { value: 80, label: '80年後' },
          ]}
          mt={80}
          mx={150}
        />
        <Stack align="center" mt={150}>
          <Title>貯蓄の増やし方について学んでみましょう</Title>
          <Stack mt={30} spacing={30}>
            <LearningCandidateCon data={LearningCandid} />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
