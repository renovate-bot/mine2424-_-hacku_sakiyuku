import { Title } from '@mantine/core';
import { FC } from 'react';

type PropsType = {
  children: string;
};

export const TitleCon: FC<PropsType> = (props) => {
  const { children } = props;
  return (
    <Title
      sx={(theme) => ({
        '&::after': {
          content: '""',
          display: 'block',
          backgroundColor: theme.fn.primaryColor(),
          width: 45,
          height: 2,
          marginTop: theme.spacing.sm,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      })}
    >
      {children}
    </Title>
  );
};
