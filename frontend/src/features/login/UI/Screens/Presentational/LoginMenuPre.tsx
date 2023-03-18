import {
  Container,
  Text,
  SimpleGrid,
  Title,
  createStyles,
  Card,
  Flex,
  ThemeIcon,
} from '@mantine/core';
import { IconAffiliate } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { AssessmentHeader } from 'src/features/assessment/UI/Components/Header';
import { pagesPath } from 'src/lib/$path';

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

  student_card: {
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
  teacher_card: {
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: 'blue',
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
    cursor: 'pointer',
  },
  school_card: {
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: 'green',
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
    cursor: 'pointer',
  },
}));

export const LoginMenuPre = () => {
  const { classes, theme } = useStyles();
  const router = useRouter();

  return (
    <>
      <AssessmentHeader rightButton={undefined} />
      <Container size="lg" py="lg" mt={30}>
        <Title order={2} className={classes.title} align="center" mt="sm">
          ログインページ
        </Title>

        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          <Card
            shadow="md"
            radius="md"
            className={classes.student_card}
            p="xl"
            onClick={() => {
              router.push(pagesPath.login.student.$url());
            }}
          >
            <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
              <ThemeIcon size={50} color={theme.fn.primaryColor()}>
                <IconAffiliate />
              </ThemeIcon>
              <Text size="xl" weight={700} mt="md">
                生徒ログイン
              </Text>
            </Flex>
            <Text size="sm" color="dimmed" mt="sm">
              生徒の方はこちらからログインしてください。
            </Text>
          </Card>
          <Card
            shadow="md"
            radius="md"
            className={classes.teacher_card}
            p="xl"
            onClick={() => {
              router.push(pagesPath.login.teacher.$url());
            }}
          >
            <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
              <ThemeIcon size={50} color="blue">
                <IconAffiliate />
              </ThemeIcon>
              <Text size="xl" weight={700} mt="md">
                教員ログイン
              </Text>
            </Flex>
            <Text size="sm" color="dimmed" mt="sm">
              教員の方はこちらからログインしてください。
            </Text>
          </Card>
          <Card
            shadow="md"
            radius="md"
            className={classes.school_card}
            p="xl"
            onClick={() => {
              router.push(pagesPath.login.school.$url());
            }}
          >
            <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
              <ThemeIcon size={50} color="green">
                <IconAffiliate />
              </ThemeIcon>
              <Text size="xl" weight={700} mt="md">
                学校ログイン
              </Text>
            </Flex>
            <Text size="sm" color="dimmed" mt="sm">
              学校全体の管理者、主任等の方は
              <br />
              こちらからログインしてください。
            </Text>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  );
};
