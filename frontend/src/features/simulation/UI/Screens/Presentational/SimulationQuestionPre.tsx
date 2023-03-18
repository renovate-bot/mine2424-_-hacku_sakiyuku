import {
  ActionIcon,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  NativeSelect,
  NumberInput,
  Progress,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { FC } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CurriculumHeader } from 'src/features/curriculum/UI/Components/Header';
import { AnswerProgressState } from 'src/features/simulation/Hook/AnswerProgressState';
import { AnswerDataState } from 'src/features/simulation/Hook/AnswerDataState';
import { IconSquareX } from '@tabler/icons-react';
import {
  SimulationResultDataState,
  SimulationResultDataType,
} from 'src/features/simulation/Hook/SimulationResultDataState';
import {
  SimulationResultState,
  SimulationResultType,
} from 'src/features/simulation/Hook/SimulationResultState';
import { ProgressButtonCon } from '../Container/ProgressButtonCon';
import { TitleCon } from '../Container/TitleCon';

export const SimulationQuestionPre: FC = () => {
  const [AnswerProgress, setAnswerProgress] = useRecoilState(AnswerProgressState);
  const [AnswerData, setAnswerData] = useRecoilState(AnswerDataState);
  const setSimulationResultData = useSetRecoilState(SimulationResultDataState);
  const setSimulationResult = useSetRecoilState(SimulationResultState);

  const CreateResult = () => {
    // -------------------------共通変数---------------------------
    const result = [] as SimulationResultDataType;
    let resutlStatus = {} as SimulationResultType;
    // 働き始める"年後"
    const workBeginYearLater =
      (AnswerData.workBegin === 1 ? 23 : AnswerData.workBegin === 2 ? 19 : 16) - AnswerData.myAge;
    //収入に対する支出割合
    const lifeStyleSpending = (style: number) => (style === 1 ? 0.7 : style === 2 ? 0.8 : 0.85);
    //車（何年ローン・1年当たりのローン額・ローンカウント）
    const carLoanYear = 5;
    const carLoanNum =
      AnswerData.carType === 1
        ? 200 / carLoanYear
        : AnswerData.carType === 2
        ? 300 / carLoanYear
        : 500 / carLoanYear;
    let carYearCount = 0;

    // eslint-disable-next-line array-callback-return
    [...Array(101 - AnswerData.myAge)].map((_, i) => {
      // -------------------------共通関数---------------------------
      const carCost = () => {
        if (AnswerData.carExists) {
          carYearCount += 1;
          if (carYearCount < 5) {
            return carLoanNum;
          }
          if (carYearCount === 7) {
            carYearCount = 0;
          }
        }
        return 0;
      };
      const hobbyCost = () => {
        let yearHobbyCost = 0;
        // eslint-disable-next-line array-callback-return
        AnswerData.hobby.map((item) => {
          yearHobbyCost += Math.round(item.hobbyCostNum * 12);
        });
        return yearHobbyCost;
      };

      const marriageCost = () => {
        let value = 0;
        switch (AnswerData.partnerJob) {
          case 1:
            value = 0; // 専業主婦・専業主夫
            break;
          case 2:
            value = 0.3; // 非正規雇用
            break;
          case 3:
            value = 0.8; // 正規雇用
            break;
        }

        const isMarried = i + AnswerData.myAge > AnswerData.marriageAge;
        return AnswerData.marriageExists && isMarried ? 1 + value : 1;
      };

      // -------------------------初年度-------------------------
      const workingStartIncome = () =>
        AnswerData.workBegin === 1 ? 250 : AnswerData.workBegin === 2 ? 200 : 180;
      const workingStartSpending = () =>
        Math.round(workingStartIncome() * lifeStyleSpending(AnswerData.lifeStyleEarly));

      // -------------------------働き中-------------------------
      const workingIncome = () => Math.round(result[i - 1].income * 1.02);
      const workingSpending = () =>
        Math.round(
          workingIncome() * lifeStyleSpending(AnswerData.lifeStyleEarly) * marriageCost() +
            carCost() +
            hobbyCost()
        );
      const workingDeposit = () =>
        Math.round(result[i - 1].deposit * 1.01 + (workingIncome() - workingSpending()));

      // -------------------------退職後-------------------------
      const workingFinishIncome = () => 140;
      const workingFinishBonus = () => (AnswerData.workBegin === 1 ? 1118.9 : 1031.4);
      const workingFinishSpending = () =>
        Math.round(
          workingFinishIncome() * lifeStyleSpending(AnswerData.lifeStyleLate) * marriageCost() +
            carCost() +
            hobbyCost()
        );
      const workingFinishDeposit = () =>
        result[i - 1].deposit -
        (workingFinishIncome() - workingFinishSpending() > 0
          ? workingFinishIncome() - workingFinishSpending()
          : Math.abs(workingFinishIncome() - workingFinishSpending()));

      // --------------------------------------------------
      const resultTemp =
        i < workBeginYearLater
          ? {
              //働き始めるまで
              yearLater: i,
              deposit: 0,
              income: 0,
              spending: 0,
              savings: 0,
              investment: 0,
            }
          : i === workBeginYearLater
          ? {
              // 新卒初年度
              yearLater: i,
              deposit: workingStartIncome() - workingStartSpending(),
              income: workingStartIncome(),
              spending: workingStartSpending(),
              savings: workingStartIncome() - workingStartSpending(),
              investment: 0,
            }
          : i + AnswerData.myAge < AnswerData.jobRetirementAge
          ? {
              // 初年度以降
              yearLater: i,
              deposit: workingDeposit(),
              income: workingIncome(),
              spending: workingSpending(),
              savings: workingIncome() - workingSpending(),
              investment: 0,
            }
          : i + AnswerData.myAge === AnswerData.jobRetirementAge
          ? {
              // 退職
              yearLater: i,
              deposit: workingFinishDeposit() + workingFinishBonus(),
              income: workingFinishIncome() + workingFinishBonus(),
              spending: workingFinishSpending(),
              savings: workingFinishIncome() + workingFinishBonus() - workingFinishSpending(),
              investment: 0,
            }
          : {
              // 退職後
              yearLater: i,
              deposit: workingFinishDeposit(),
              income: workingFinishIncome(),
              spending: workingFinishSpending(),
              savings: workingFinishIncome() - workingFinishSpending(),
              investment: 0,
            };

      result.push(resultTemp);
      resutlStatus =
        resultTemp.deposit < 0
          ? {
              resultStatus: false,
              resutlText: '貯金が底をついてしましました...',
            }
          : {
              resultStatus: true,
              resutlText: '素敵な人生を送ることができそうです！',
            };
    });

    resutlStatus =
      result[AnswerData.jobRetirementAge - AnswerData.myAge].deposit < 2000
        ? !resutlStatus.resultStatus
          ? {
              resultStatus: false,
              resutlText: '貯金が底をついてしましました...',
            }
          : {
              resultStatus: false,
              resutlText: '老後2000万円に未到達です...',
            }
        : {
            resultStatus: true,
            resutlText: '素敵な人生を送ることができそうです！',
          };

    setSimulationResult(resutlStatus);
    setSimulationResultData([...result]);
    setAnswerProgress(AnswerProgress + 1);
  };

  // eslint-disable-next-line consistent-return
  const progresFunc = () => {
    switch (AnswerProgress) {
      case 1:
        return (
          <>
            <Title order={1}>あなたと家族ついて教えてください</Title>
            <Title order={4} mt={20}>
              あなたの年齢
            </Title>
            <NumberInput
              min={0}
              size="md"
              value={AnswerData.myAge}
              onChange={(e) => {
                setAnswerData({ ...AnswerData, myAge: e === undefined || e === '' ? 0 : e });
              }}
            />
            <Group mt={20}>
              <Title order={4} mr={20}>
                ご両親の年齢
              </Title>
              <Group>
                <Checkbox
                  label="母親"
                  size="sm"
                  checked={AnswerData.matherExists}
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      matherExists: e.currentTarget.checked,
                    });
                  }}
                />
                <Checkbox
                  label="父親"
                  size="sm"
                  checked={AnswerData.fatherExists}
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      fatherExists: e.currentTarget.checked,
                    });
                  }}
                />
              </Group>
            </Group>
            {AnswerData.matherExists && (
              <NumberInput
                min={0}
                label="母親の年齢"
                size="md"
                value={AnswerData.matherAge}
                onChange={(e) => {
                  setAnswerData({ ...AnswerData, matherAge: e === undefined || e === '' ? 0 : e });
                }}
              />
            )}
            {AnswerData.fatherExists && (
              <NumberInput
                min={0}
                label="父親の年齢"
                size="md"
                value={AnswerData.fatherAge}
                onChange={(e) => {
                  setAnswerData({ ...AnswerData, fatherAge: e === undefined || e === '' ? 0 : e });
                }}
              />
            )}
          </>
        );
      case 2:
        return (
          <>
            <Title order={1}>今後の人生について考えてみましょう</Title>
            <Title order={2} mt={20}>
              仕事
            </Title>
            <Title order={4}>あなたの夢や目標は何ですか？</Title>
            <TextInput
              placeholder="例）教師になりたい"
              size="md"
              value={AnswerData.dreamText}
              onChange={(e) => {
                setAnswerData({ ...AnswerData, dreamText: e.target.value });
              }}
            />
            <Title order={4} mt={10}>
              働き始める年齢・学歴
            </Title>
            <NativeSelect
              data={['大卒', '高卒']}
              size="md"
              onChange={(e) => {
                setAnswerData({
                  ...AnswerData,
                  workBegin: e.target.value === '大卒' ? 1 : 2,
                });
              }}
            />
            <Title order={2} mt={30}>
              貯金・投資
            </Title>
            <Checkbox
              label="貯金をする"
              mt={10}
              checked={AnswerData.depositExists}
              onChange={(e) => {
                setAnswerData({ ...AnswerData, depositExists: e.currentTarget.checked });
              }}
            />
            {AnswerData.depositExists && (
              <>
                <Title order={5}>毎月どれぐらいの金額を貯金しますか？（単位：万円）</Title>
                <NumberInput
                  min={0}
                  size="md"
                  value={AnswerData.depositNum}
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      depositNum: e === undefined || e === '' ? 0 : e,
                    });
                  }}
                />
              </>
            )}
            <Checkbox
              label="NISA・iDeCoを運用する"
              mt={10}
              checked={AnswerData.nisaExists}
              onChange={(e) => {
                setAnswerData({ ...AnswerData, nisaExists: e.currentTarget.checked });
              }}
            />
            {AnswerData.nisaExists && (
              <>
                <Title order={5}>
                  Nisa・iDeCoで毎月どれぐらいの金額を運用しますか？（単位：万円）
                </Title>
                <NumberInput
                  min={0}
                  size="md"
                  value={AnswerData.nisaNum}
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      nisaNum: e === undefined || e === '' ? 0 : e,
                    });
                  }}
                />
              </>
            )}
            <Checkbox
              label="株式を運用する"
              mt={10}
              checked={AnswerData.stockExists}
              onChange={(e) => {
                setAnswerData({ ...AnswerData, stockExists: e.currentTarget.checked });
              }}
            />
            {AnswerData.stockExists && (
              <>
                <Title order={5}>株式で毎月どれぐらいの金額を運用しますか？（単位：万円）</Title>
                <NumberInput
                  min={0}
                  size="md"
                  value={AnswerData.stockNum}
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      stockNum: e === undefined || e === '' ? 0 : e,
                    });
                  }}
                />
              </>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Title order={1}>今後の生活について考えてみましょう</Title>
            <Title order={2} mt={20}>
              生活
            </Title>
            <Title order={4}>生活スタイル</Title>
            <NativeSelect
              data={['節約した生活', 'メリハリをつけた生活', '旅行や趣味を楽しむ生活']}
              size="md"
              onChange={(e) => {
                setAnswerData({
                  ...AnswerData,
                  lifeStyleEarly:
                    e.target.value === '節約した生活'
                      ? 1
                      : e.target.value === 'メリハリをつけた生活'
                      ? 2
                      : 3,
                });
              }}
            />
            <Title order={4}>生活圏</Title>
            <NativeSelect
              data={['関東圏', '関西圏', '地方']}
              size="md"
              onChange={(e) => {
                setAnswerData({
                  ...AnswerData,
                  liveArea: e.target.value === '関東圏' ? 1 : e.target.value === '関西圏' ? 2 : 3,
                });
              }}
            />
            <Title order={4}>住居</Title>
            <NativeSelect
              data={['一軒家', '賃貸', 'マンション購入']}
              size="md"
              onChange={(e) => {
                setAnswerData({
                  ...AnswerData,
                  homeType: e.target.value === '一軒家' ? 1 : e.target.value === '賃貸' ? 2 : 3,
                });
              }}
            />
            <Title order={4}>車</Title>
            <Checkbox
              label="車を購入する"
              size="md"
              checked={AnswerData.carExists}
              onChange={(e) => {
                setAnswerData({
                  ...AnswerData,
                  carExists: e.currentTarget.checked,
                });
              }}
            />
            {AnswerData.carExists && (
              <>
                <NativeSelect
                  data={['軽自動車', '普通車', '高級車']}
                  size="md"
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      carType:
                        e.target.value === '軽自動車' ? 1 : e.target.value === '普通車' ? 2 : 3,
                    });
                  }}
                />
              </>
            )}
            <Title order={2} mt={20}>
              趣味
            </Title>
            {AnswerData.hobby.map((item) => (
              <div key={item.hobbyKey}>
                <Group>
                  <Title order={4}>{`趣味${item.hobbyKey}`}</Title>
                  {AnswerData.hobby.length === item.hobbyKey && (
                    <ActionIcon
                      onClick={() => {
                        const hobbyTemp = AnswerData.hobby.filter(
                          (filterItem) => filterItem.hobbyKey !== item.hobbyKey
                        );
                        setAnswerData({
                          ...AnswerData,
                          hobby: [...hobbyTemp],
                        });
                      }}
                    >
                      <IconSquareX color="black" />
                    </ActionIcon>
                  )}
                </Group>
                <TextInput
                  placeholder="例）キャンプ"
                  size="md"
                  value={item.hobbyText}
                  onChange={(e) => {
                    const hobbyTemp = AnswerData.hobby.map((mapItem) =>
                      mapItem.hobbyKey === item.hobbyKey
                        ? {
                            hobbyKey: AnswerData.hobby[mapItem.hobbyKey - 1].hobbyKey,
                            hobbyText: e.target.value,
                            hobbyCostNum: AnswerData.hobby[mapItem.hobbyKey - 1].hobbyCostNum,
                          }
                        : AnswerData.hobby[mapItem.hobbyKey - 1]
                    );
                    setAnswerData({ ...AnswerData, hobby: [...hobbyTemp] });
                  }}
                />
                <Title order={5}>その趣味に毎月いくら使いますか？（単位：円）</Title>
                <NumberInput
                  min={0}
                  size="md"
                  step={1000}
                  value={item.hobbyCostNum * 10000}
                  onChange={(e) => {
                    const hobbyTemp = AnswerData.hobby.map((mapItem) =>
                      mapItem.hobbyKey === item.hobbyKey
                        ? {
                            hobbyKey: AnswerData.hobby[mapItem.hobbyKey - 1].hobbyKey,
                            hobbyText: AnswerData.hobby[mapItem.hobbyKey - 1].hobbyText,
                            hobbyCostNum: e === undefined || e === '' ? 0 : e / 10000,
                          }
                        : AnswerData.hobby[mapItem.hobbyKey - 1]
                    );
                    setAnswerData({ ...AnswerData, hobby: [...hobbyTemp] });
                  }}
                />
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                if (AnswerData.hobby.length + 1 < 6) {
                  const hobbyTemp = {
                    hobbyKey: AnswerData.hobby.length + 1,
                    hobbyText: '',
                    hobbyCostNum: 0.3,
                  };
                  setAnswerData({ ...AnswerData, hobby: [...AnswerData.hobby, hobbyTemp] });
                }
              }}
            >
              趣味を追加
            </Button>
            <Title order={6} mt={-10} sx={{ fontWeight: 'initial' }}>
              ※趣味は5つまで登録できます
            </Title>
          </>
        );
      case 4:
        return (
          <>
            <Title order={1}>今後の人生について考えてみましょう</Title>
            <Title order={4} mt={20}>
              将来結婚を考えていますか？
            </Title>
            <Checkbox
              label="結婚したい"
              size="md"
              checked={AnswerData.marriageExists}
              onChange={(e) => {
                setAnswerData({
                  ...AnswerData,
                  marriageExists: e.currentTarget.checked,
                });
              }}
            />
            {AnswerData.marriageExists && (
              <>
                <Title order={5}>結婚する年齢</Title>
                <NumberInput
                  min={0}
                  size="md"
                  value={AnswerData.marriageAge}
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      marriageAge: e === undefined || e === '' ? 0 : e,
                    });
                  }}
                />
                <Title order={4}>パートナーの働き方</Title>
                <NativeSelect
                  data={['専業主婦・専業主夫', '非正規雇用', '正規雇用']}
                  size="md"
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      homeType:
                        e.target.value === '専業主婦・専業主夫'
                          ? 1
                          : e.target.value === '非正規雇用'
                          ? 2
                          : 3,
                    });
                  }}
                />
                <Title order={2} mt={20}>
                  子ども
                </Title>
                <Checkbox
                  label="子どもをもちたい"
                  size="md"
                  checked={AnswerData.childrenExists}
                  onChange={(e) => {
                    setAnswerData({
                      ...AnswerData,
                      childrenExists: e.currentTarget.checked,
                    });
                  }}
                />
                {AnswerData.childrenExists && (
                  <>
                    <Title order={5}>子どもの人数</Title>
                    <NumberInput
                      min={0}
                      size="md"
                      value={AnswerData.childrenNum}
                      onChange={(e) => {
                        setAnswerData({
                          ...AnswerData,
                          childrenNum: e === undefined || e === '' ? 0 : e,
                        });
                      }}
                    />
                    <Title order={4}>子どもの教育について</Title>
                    <NativeSelect
                      data={[
                        '国立大',
                        '私立大',
                        '私立高校まで',
                        '公立高校まで',
                        '私立中学まで',
                        '公立中学まで',
                      ]}
                      size="md"
                      onChange={(e) => {
                        setAnswerData({
                          ...AnswerData,
                          childrenEducation:
                            e.target.value === '国立大'
                              ? 1
                              : e.target.value === '私立大'
                              ? 2
                              : e.target.value === '私立高校まで'
                              ? 3
                              : e.target.value === '公立高校まで'
                              ? 4
                              : e.target.value === '私立中学まで'
                              ? 5
                              : 6,
                        });
                      }}
                    />
                    <Title order={4}>学習塾について</Title>
                    <Checkbox
                      label="学習塾に通わせる"
                      size="md"
                      checked={AnswerData.childrenCramSchool}
                      onChange={(e) => {
                        setAnswerData({
                          ...AnswerData,
                          childrenCramSchool: e.currentTarget.checked,
                        });
                      }}
                    />
                    <Title order={4}>子どもの習い事について</Title>
                    <NativeSelect
                      data={[
                        '通わせない',
                        '英会話',
                        'ピアノ',
                        'バレエ',
                        '書道',
                        '空手',
                        'プログラミング',
                        'その他',
                      ]}
                      size="md"
                      onChange={(e) => {
                        setAnswerData({
                          ...AnswerData,
                          childrenCultureLesson:
                            e.target.value === '通わせない'
                              ? 1
                              : e.target.value === '英会話'
                              ? 2
                              : e.target.value === 'ピアノ'
                              ? 3
                              : e.target.value === 'バレエ'
                              ? 4
                              : e.target.value === '書道'
                              ? 5
                              : e.target.value === '空手'
                              ? 6
                              : e.target.value === 'プログラミング'
                              ? 7
                              : e.target.value === 'その他'
                              ? 8
                              : 9,
                        });
                      }}
                    />
                    <Title order={4}>出産後の社会復帰について</Title>
                    <NativeSelect
                      data={['復帰しない', '非正規雇用', '正規雇用']}
                      size="md"
                      onChange={(e) => {
                        setAnswerData({
                          ...AnswerData,
                          childrenCultureLesson:
                            e.target.value === '復帰しない'
                              ? 1
                              : e.target.value === '非正規雇用'
                              ? 2
                              : 3,
                        });
                      }}
                    />
                  </>
                )}
              </>
            )}
          </>
        );
      case 5:
        return (
          <>
            <Title order={1}>老後の生活について考えてみましょう</Title>
            <Title order={5} mt={20}>
              退職する年齢
            </Title>
            <NumberInput
              min={0}
              size="md"
              value={AnswerData.jobRetirementAge}
              onChange={(e) => {
                setAnswerData({
                  ...AnswerData,
                  jobRetirementAge: e === undefined || e === '' ? 0 : e,
                });
              }}
            />
            <Title order={4}>退職後の生活スタイル</Title>
            <NativeSelect
              data={['節約した生活', 'メリハリをつけた生活', '旅行や趣味を楽しむ生活']}
              size="md"
              onChange={(e) => {
                setAnswerData({
                  ...AnswerData,
                  lifeStyleLate:
                    e.target.value === '節約した生活'
                      ? 1
                      : e.target.value === 'メリハリをつけた生活'
                      ? 2
                      : 3,
                });
              }}
            />
          </>
        );
    }
  };

  return (
    <>
      <CurriculumHeader
        user={{
          name: 'ririka',
          image: 'https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269',
        }}
      />
      <Container size="lg" py="xl" mb={100}>
        {AnswerProgress === 0 ? (
          <Stack align="center" justify="flex-start" mt={40}>
            <TitleCon>人生シミュレーション</TitleCon>
            <Title order={4} my={50}>
              自身の将来について考え、シミュレーションしてみましょう
            </Title>
            <ProgressButtonCon icon>シミュレーションを開始</ProgressButtonCon>
          </Stack>
        ) : AnswerProgress !== 6 ? (
          <>
            <Progress size="lg" striped value={(AnswerProgress - 1) * 20} mt={40} />
            <Stack
              align="flex-start"
              justify="flex-start"
              mt={40}
              py={50}
              px={60}
              sx={{
                border: 'solid',
                borderWidth: 0.5,
                borderRadius: 10,
              }}
            >
              {progresFunc()}
            </Stack>
            <Grid mt={20}>
              <Grid.Col span={4}>
                <ProgressButtonCon isPrimary={false} forward={false}>
                  戻る
                </ProgressButtonCon>
              </Grid.Col>
              <Grid.Col span={4} />
              <Grid.Col span={4}>
                <Group position="right">
                  <ProgressButtonCon>次へ</ProgressButtonCon>
                </Group>
              </Grid.Col>
            </Grid>
          </>
        ) : (
          <>
            <Stack align="center" justify="flex-start" mt={40}>
              <TitleCon>設問は以上です</TitleCon>
              <Title order={4} my={50}>
                あなたのシミュレーションした人生を見てみましょう
              </Title>
              <Button size="lg" radius={10} onClick={CreateResult}>
                結果を見る
              </Button>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};
