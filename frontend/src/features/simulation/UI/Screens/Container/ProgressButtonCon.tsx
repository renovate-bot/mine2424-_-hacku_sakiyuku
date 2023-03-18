import { Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { AnswerProgressState } from 'src/features/simulation/Hook/AnswerProgressState';

type PropsType = {
  children: string;
  isPrimary?: boolean;
  forward?: boolean;
  icon?: boolean;
};

export const ProgressButtonCon: FC<PropsType> = (props) => {
  const { children, isPrimary, forward, icon } = props;
  const [AnswerProgress, setAnswerProgress] = useRecoilState(AnswerProgressState);

  return (
    <Button
      size="lg"
      radius={10}
      variant={isPrimary === undefined || isPrimary === true ? 'filled' : 'outline'}
      rightIcon={(icon !== undefined || icon === true) && <IconChevronDown />}
      onClick={() => {
        setAnswerProgress(AnswerProgress + (forward === undefined || forward === true ? 1 : -1));
      }}
    >
      {children}
    </Button>
  );
};
