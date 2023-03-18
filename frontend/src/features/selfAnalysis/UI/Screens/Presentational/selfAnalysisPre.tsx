import {
  Container,
  Card,
  Title,
  Box,
  Button,
  Space,
  createStyles,
  Flex,
  Stack,
} from '@mantine/core';
import { NextRouter } from 'next/router';
import { CurriculumHeader } from 'src/features/curriculum/UI/Components/Header';
import {
  MBTIDescription,
  MBTIJobs,
  MBTITitle,
} from 'src/features/selfAnalysis/Domain/Entity/MBTIType';
import { SelfAnalysisQuestionEntity } from 'src/features/selfAnalysis/Domain/Entity/SelfAnalysisQuestionEntity';
import { SelfAnalysisResultEntity } from 'src/features/selfAnalysis/Domain/Entity/SelfAnalysisResultEntity';
import { SelfAnalysisUserAnswerEntity } from 'src/features/selfAnalysis/Domain/Entity/SelfAnalysisUserAnswerEntity';
import { pagesPath } from 'src/lib/$path';

interface SelfAnalysisPreProps {
  qInd: number;
  selected: SelfAnalysisUserAnswerEntity;
  selectedJobIndex: number;
  mockData: SelfAnalysisQuestionEntity[];
  resultData: SelfAnalysisResultEntity;
  router: NextRouter;
  handleSelected: (val: number) => void;
  handleQInd: (val: number) => void;
  handleCalculation: () => void;
  handleJobIndex: (val: number) => void;
}

const useStyles = createStyles(() => ({
  qestionBox: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  questionTitle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  selectButtonBox: {
    display: 'flex',
    flexFlow: 'column',
  },
  selectButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  jobSelectButton: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    width: 250,
  },
  stepBox: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  navigateBox: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    paddingTop: 50,
  },
}));

export const SelfAnalysisPre = ({
  qInd,
  selected,
  selectedJobIndex,
  mockData,
  resultData,
  router,
  handleSelected,
  handleQInd,
  handleCalculation,
  handleJobIndex,
}: SelfAnalysisPreProps) => {
  const { classes } = useStyles();
  /** If the question is last, change the label. */
  const nextLabel = qInd === mockData.length - 1 ? '結果を見る' : '次へ';

  return (
    <>
      {(selected !== undefined || qInd !== 0) && (
        <>
          <CurriculumHeader
            user={{
              name: 'ririka',
              image: 'https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269',
            }}
          />
          <Container size="lg" py="xl">
            {qInd === mockData.length ? (
              <>
                <Card shadow="lg" radius="md" p="xl">
                  <Title order={2} align="center" mt="sm">
                    結果
                  </Title>
                  <Box className={classes.qestionBox}>
                    <Title style={{ fontWeight: 'bold', fontSize: 24, paddingBottom: 10 }}>
                      あなたの性格
                    </Title>
                    <Flex style={{ paddingLeft: 15 }}>
                      <Title style={{ fontWeight: 'bold', fontSize: 30 }}>{resultData.mbti}</Title>
                      <Title style={{ fontSize: 30, fontWeight: 'normal', paddingLeft: 15 }}>
                        {`(${MBTITitle.get(resultData.mbti)})`}
                      </Title>
                    </Flex>
                    <Title
                      style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        paddingTop: 40,
                        paddingBottom: 10,
                      }}
                    >
                      説明
                    </Title>
                    <Title style={{ fontSize: 16, fontWeight: 'normal', paddingLeft: 15 }}>
                      {MBTIDescription.get(resultData.mbti)}
                    </Title>
                    <Title
                      style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        paddingTop: 40,
                        paddingBottom: 10,
                      }}
                    >
                      おすすめの職業
                    </Title>
                    <Stack style={{ margin: 0, paddingLeft: 10 }}>
                      {MBTIJobs.get(resultData.mbti)?.map((job, index) => (
                        <Button
                          key={index}
                          className={classes.jobSelectButton}
                          variant={selectedJobIndex === index + 1 ? 'filled' : 'outline'}
                          color="pink"
                          radius="md"
                          size="lg"
                          onClick={() => handleJobIndex(index)}
                        >
                          {job.title}
                        </Button>
                      ))}
                    </Stack>
                  </Box>
                </Card>
                <Box className={classes.navigateBox}>
                  <Button
                    variant="filled"
                    color="blue"
                    radius="md"
                    size="lg"
                    onClick={() => router.push(pagesPath.$url())}
                  >
                    ホームに戻る
                  </Button>
                  <Space w="xl" />
                  <Button
                    variant="filled"
                    color="pink"
                    radius="md"
                    size="lg"
                    onClick={() => router.push(pagesPath.$url())}
                  >
                    人生設計に進む
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Card key={mockData[qInd].question} shadow="lg" radius="md" p="xl">
                  <Title order={2} align="center" mt="sm">
                    質問{mockData[qInd].id}
                  </Title>
                  <Box className={classes.qestionBox}>
                    <Title className={classes.questionTitle} size="md" weight={600} mt="sm">
                      {mockData[qInd].question}
                    </Title>
                    <Box className={classes.selectButtonBox}>
                      <Button
                        className={classes.selectButton}
                        variant={selected.answer === 1 ? 'filled' : 'outline'}
                        color="purple"
                        radius="md"
                        size="lg"
                        onClick={() => handleSelected(1)}
                      >
                        {mockData[qInd].answers[0].text}
                      </Button>
                      <Button
                        className={classes.selectButton}
                        variant={selected.answer === 2 ? 'filled' : 'outline'}
                        color="gray"
                        radius="md"
                        size="lg"
                        onClick={() => handleSelected(2)}
                      >
                        {mockData[qInd].answers[1].text}
                      </Button>
                      <Button
                        className={classes.selectButton}
                        variant={selected.answer === 3 ? 'filled' : 'outline'}
                        color="orange"
                        radius="md"
                        size="lg"
                        onClick={() => handleSelected(3)}
                      >
                        {mockData[qInd].answers[2].text}
                      </Button>
                      <Button
                        className={classes.selectButton}
                        variant={selected.answer === 4 ? 'filled' : 'outline'}
                        color="indigo"
                        radius="md"
                        size="lg"
                        onClick={() => handleSelected(4)}
                      >
                        {mockData[qInd].answers[3].text}
                      </Button>
                    </Box>
                  </Box>
                </Card>
                <Box className={classes.stepBox}>
                  {qInd === 0 ? (
                    <Button variant="filled" color="blue" radius="md" size="lg" disabled>
                      戻る
                    </Button>
                  ) : (
                    <Button
                      variant="filled"
                      color="blue"
                      radius="md"
                      size="lg"
                      onClick={() => handleQInd(qInd - 1)}
                    >
                      戻る
                    </Button>
                  )}
                  {qInd === mockData.length || selected.answer === 0 ? (
                    <Button variant="filled" color="red" radius="md" size="lg" disabled>
                      {nextLabel}
                    </Button>
                  ) : (
                    <Button
                      variant="filled"
                      color="red"
                      radius="md"
                      size="lg"
                      onClick={() => {
                        if (qInd === mockData.length - 1) {
                          // If last...
                          handleCalculation();
                        }
                        handleQInd(qInd + 1);
                      }}
                    >
                      {nextLabel}
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
};
