import { Card, Flex, Container, Title, Text, SimpleGrid, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { CurriculumHeader } from '../../Components/Header';

interface CurriculumHomePreProps {
  mockData: any[];
}

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },

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
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
    cursor: 'pointer',
  },
}));

export const CurriculumHomePre = (props: CurriculumHomePreProps) => {
  const { classes, theme } = useStyles();
  const router = useRouter();
  const features = props.mockData.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
      onClick={() => {
        router.push(feature.path);
      }}
    >
      <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
        <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
        <Text size="xl" weight={700} mt="md">
          {feature.title}
        </Text>
      </Flex>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <>
      <CurriculumHeader
        user={{
          name: 'ririka',
          image: 'https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269',
        }}
      />
      <Container size="lg" py="md">
        <Title order={2} className={classes.title} align="center" mt="sm">
          自分の人生を見つめ直して夢を実現しよう
        </Title>

        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
    </>
  );
};
