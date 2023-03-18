/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionIcon,
  Avatar,
  Badge,
  createStyles,
  Group,
  ScrollArea,
  Table,
  Title,
  Text,
  useMantineTheme,
  ThemeIcon,
} from '@mantine/core';
import { useState, useEffect, FC } from 'react';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { StudentHeader } from 'src/features/student/Domain/Entity/StudentHeader';
import { StudentList } from 'src/features/student/Domain/Entity/StudentList';
import { pagesPath } from 'src/lib/$path';
import { StudentRepository } from 'src/features/student/Domain/Repository/StudentRepository';

// DataTableではidを必須としているため、idを追加する
const mockData = [
  new StudentHeader(
    '1',
    '山田太郎',
    1,
    '1年1組',
    'https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269'
  ),
  new StudentHeader(
    '2',
    '山田花子',
    2,
    '1年1組',
    'https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269'
  ),
  new StudentHeader(
    '3',
    '山田次郎',
    3,
    '1年2組',
    'https://img.fril.jp/img/387511906/l/1093396377.jpg?1607948269'
  ),
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 24,
    paddingBottom: theme.spacing.md,
  },
  tr: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.pink[0],
    },
  },
}));

export const AssessmentStudentList: FC = () => {
  const { classes } = useStyles();
  const [records, setRecords] = useState(new StudentList(mockData));
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const theme = useMantineTheme();

  useEffect(() => {
    setFetching(true);
    // TODO: APIからデータを取得する
    (async () => {
      await new StudentRepository().getAll();
    })();

    // TODO: loadingUIを表示する
    setTimeout(() => {
      setFetching(false);
    }, 1000);
  }, []);

  const rows = records.students.map((item) => (
    <tr
      className={classes.tr}
      key={item.studentId}
      onClick={() => {
        router.push(pagesPath.student._id(item.studentId).$url());
      }}
    >
      <td>
        <Text size="sm" color="dimmed">
          {item.studentId}
        </Text>
      </td>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          // color={jobColors[item.job.toLowerCase()]}
          color="blue"
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {item.gradeGroup}
        </Badge>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {item.studentNumber}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <ThemeIcon size={16}>
              <IconPencil />
            </ThemeIcon>
          </ActionIcon>
          <ActionIcon color="red">
            <ThemeIcon size={16}>
              <IconTrash />
            </ThemeIcon>
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Title className={classes.title}>生徒一覧</Title>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>生徒ID</th>
              <th>氏名</th>
              <th>学年組</th>
              <th>出席番号</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
