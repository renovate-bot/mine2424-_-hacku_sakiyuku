/**
 * Attribution
 * <a href="https://www.freepik.com/free-vector/illustration-concept-with-multitasking_6372121.htm#query=man%20pc&position=6&from_view=search&track=popular">Image by pikisuperstar</a> on Freepik
 */

import { Button, Flex, Image, Stack } from '@mantine/core';
import { FC, useState } from 'react';
import { CurriculumHeader } from 'src/features/curriculum/UI/Components/Header';
import SimulationIntroImage from 'src/features/simulation/assets/simulation_intro.jpg';
import FadeIn from 'react-fade-in';
import Link from 'next/link';

export const SimulationIntroductionPre: FC = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <CurriculumHeader
        user={{
          name: 'ririka',
          image: 'https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269',
        }}
      />
      <Stack
        style={{
          width: '80%',
          height: '100%',
          margin: 'auto',
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>ライフプランシミュレーション 使い方</h1>
        <Flex style={{ width: '100%', height: '100%' }}>
          <div style={{ width: '65%', padding: 30, fontSize: 26 }}>
            <FadeIn transitionDuration={1500} delay={1700} onComplete={() => setDisabled(false)}>
              <p>
                高校生がライフプランシミュレーションを行うことの意義は、将来のお金の管理と貯蓄の大切さを学ぶことだけでなく、
              </p>
              <p>
                将来の自分のライフプランを立てるために、必要なスキルや知識を身につけることもできる点です。
              </p>
              <p style={{ paddingTop: 25 }}>
                自分自身の将来の予定や、そのために必要な貯蓄や投資などを考え、そのデータを入力することで
              </p>
              <p>
                このライフプランシミュレーションソフトウェアが自動で将来のお金の状況を予測してくれます。
              </p>
              <p style={{ paddingTop: 25 }}>
                これにより、将来のお金の状況を把握し、必要に応じてライフプランの見直しや修正を行うことができます。
              </p>
            </FadeIn>
          </div>
          <div style={{ width: '35%', height: '100%' }}>
            <Image
              height="80vh"
              src={SimulationIntroImage.src}
              radius={40}
              alt="With default placeholder"
              withPlaceholder
            />
          </div>
        </Flex>
        <Button
          variant="filled"
          color="red"
          radius="md"
          size="lg"
          style={{ width: 300, margin: 'auto', marginBottom: 50 }}
          component={Link}
          href="/simulation"
          disabled={disabled}
        >
          シミュレーションをする
        </Button>
      </Stack>
    </>
  );
};
