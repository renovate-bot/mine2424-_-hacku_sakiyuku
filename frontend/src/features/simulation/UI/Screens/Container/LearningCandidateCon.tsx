import { Card, Group, ThemeIcon, Title } from '@mantine/core';
import { IconCurrencyYen } from '@tabler/icons-react';
import { LearningCandidacyType } from 'src/features/simulation/Hook/LearningCandidState';

type propsType = {
  data: LearningCandidacyType;
};

export const LearningCandidateCon = (props: propsType) => (
  <>
    {props.data.map((item) => (
      <Card key={item.title} shadow="sm" radius="md" withBorder py={40} px={200}>
        <Group>
          {item.icon === 'currency-yen' && (
            <ThemeIcon size={30}>
              <IconCurrencyYen />
            </ThemeIcon>
          )}
          <Title order={2} align="center" sx={{ fontWeight: 'inherit' }}>
            {item.title}
          </Title>
        </Group>
      </Card>
    ))}
  </>
);
