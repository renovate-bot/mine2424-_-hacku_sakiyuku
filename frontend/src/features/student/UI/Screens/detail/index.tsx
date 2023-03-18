import {
  AppShell,
  Badge,
  Button,
  Card,
  Container,
  createStyles,
  Flex,
  Group,
  Title,
  Text,
  Avatar,
  Box,
  ScrollArea,
  Table,
  ActionIcon,
  ThemeIcon,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { AssessmentHeader } from 'src/features/assessment/UI/Components/Header';
import { AssessmentNavbar } from 'src/features/assessment/UI/Components/Navbar';

const useStyles = createStyles((theme) => ({
  titleBox: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    paddingLeft: theme.spacing.md,
  },
  studentName: {
    // fontSize: 24,
    paddingLeft: theme.spacing.md,
    textAlign: 'center',
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 300,
    width: 300,
  },
  profileFlex: {
    alignItems: 'center',
  },
  profileCardDescription: {
    display: 'block',
  },
  profileEditButton: {
    marginTop: 'auto',
  },
  tr: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.pink[0],
    },
  },
}));

const mockData = [
  {
    lectureId: 1,
    curriculumId: 1,
    curriculumName: 'キャリア教育',
    assessmentId: 1,
    period: 1,
    lectureDate: new Date('2021-09-01'),
    assessmentDate: new Date('2021-09-02'),
    completedAssessment: true,
    feedbackDate: new Date('2021-09-02'),
    completedFeedback: true,
  },
  {
    lectureId: 2,
    curriculumId: 1,
    curriculumName: 'キャリア教育',
    assessmentId: 2,
    period: 2,
    lectureDate: new Date('2021-09-01'),
    assessmentDate: new Date('2021-09-02'),
    completedAssessment: false,
    feedbackDate: new Date('2021-09-02'),
    completedFeedback: false,
  },
];

export const AssessmentStudentDetail: FC = () => {
  const { classes, theme } = useStyles();
  const router = useRouter();
  // const [records, setRecords] = useState(mockData);
  // const studentId = router.query.studentId as string;

  const rows = mockData.map((item) => (
    <tr
      className={classes.tr}
      key={item.lectureId}
      onClick={() => {
        // router.push({pathname: './assessment/student/detail', query: { lectureId: item.lectureId } });
      }}
    >
      <td>
        <Group spacing="sm">
          <Text size="sm" weight={500}>
            {item.curriculumName}
          </Text>
        </Group>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.period}
        </Text>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.lectureDate.getDate().toString()}
        </Text>
      </td>

      <td>
        <Badge
          // color={jobColors[item.job.toLowerCase()]}
          color="blue"
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {item.completedAssessment ? '評価済' : 'まだ評価していない'}
        </Badge>
      </td>
      <td>
        <Badge
          // color={jobColors[item.job.toLowerCase()]}
          color="blue"
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {item.completedFeedback ? 'フィードバック済' : 'まだフィードバックしていない'}
        </Badge>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <ThemeIcon size={16}>
              <IconPencil />
            </ThemeIcon>
          </ActionIcon>
          <ActionIcon color="red" size={16}>
            <IconTrash />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <AppShell
      padding="md"
      header={<AssessmentHeader rightButton={undefined} />}
      navbar={<AssessmentNavbar />}
    >
      <Container size="lg" py="md">
        <Flex className={classes.titleBox}>
          <Button
            variant="outline"
            radius="md"
            size="xs"
            onClick={() => {
              router.back();
            }}
          >
            ← 戻る
          </Button>
          <Title className={classes.title}>生徒情報詳細</Title>
        </Flex>
        <Flex>
          <Box p={0}>
            <Card className={classes.profileCard} shadow="sm" p="lg" radius="md" withBorder>
              <div>
                <Card.Section>
                  <Flex className={classes.profileFlex}>
                    <Avatar
                      m={10}
                      src="https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269"
                      alt="image"
                      radius="xl"
                      size={60}
                    />
                    <Text ta="center" weight={500}>
                      りりか
                    </Text>
                  </Flex>
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>1年3組23番</Text>
                  <Badge color="pink" variant="light">
                    何か？
                  </Badge>
                </Group>

                <Group className={classes.profileCardDescription}>
                  <Text size="sm" color="dimmed">
                    住所: 〒000-0000
                  </Text>
                  <Text size="sm" color="dimmed">
                    住所: 〒000-0000
                  </Text>
                  <Text size="sm" color="dimmed">
                    住所: 〒000-0000
                  </Text>
                </Group>
              </div>

              <Button
                className={classes.profileEditButton}
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                編集する
              </Button>
            </Card>
            <Card mt={20} shadow="sm" p="lg" radius="md" withBorder>
              <Group className={classes.profileCardDescription}>
                <Text size="sm" color="dimmed">
                  前回の授業記録
                </Text>
              </Group>
            </Card>
          </Box>
          <Card h={1000} shadow="sm" p="lg" radius="md" ml={10} withBorder>
            <Container fluid>
              <Text weight={500}>過去の授業記録</Text>

              <ScrollArea>
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                  <thead>
                    <tr>
                      <th>カリキュラム</th>
                      <th>時間目</th>
                      <th>授業日</th>
                      <th>評価</th>
                      <th>フィードバック</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </ScrollArea>
            </Container>
          </Card>
        </Flex>
      </Container>
    </AppShell>
  );
};
