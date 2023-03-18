import {
  Button,
  Container,
  createStyles,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Student } from 'src/features/student/Domain/Entity/Student';
import { StudentRepository } from 'src/features/student/Domain/Repository/StudentRepository';
import { pagesPath } from 'src/lib/$path';

const useStyles = createStyles(() => ({
  loginButton: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
  },
}));

export const CreateStudentPre: FC = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState<Date | null>(null);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      grade: '',
      class: '',
      studentNumber: '',
      gender: '',
      birthday: '',
      password: '',
    },

    validate: {
      name: (inVal) => (inVal.length !== 0 ? null : '入力してください'),
      email: (inVal) => (inVal.length !== 0 ? null : '入力してください'),
      grade: (inVal) => (inVal.length !== 0 ? null : '入力してください'),
      class: (inVal) => (inVal.length !== 0 ? null : '入力してください'),
      studentNumber: (inVal) => (inVal.length !== 0 ? null : '入力してください'),
      gender: (inVal) => (inVal.length !== 0 ? null : '入力してください'),
      birthday: (inVal) => (inVal.length !== 0 ? null : '入力してください'),
      password: (inVal) => (inVal.length > 5 ? null : '6桁以上入力してください'),
    },
  });

  const formList = [
    {
      label: '生徒の名前',
      placeholder: 'さきゆく太郎',
      getInputProps: form.getInputProps('name'),
      required: true,
    },
    {
      label: '生徒のID（任意のメールアドレス）',
      placeholder: 'xxxx@mail.com',
      getInputProps: form.getInputProps('email'),
      required: true,
    },
    {
      label: 'パスワード',
      placeholder: 'ご自身で設定したパスワード',
      getInputProps: form.getInputProps('password'),
      required: true,
    },
    {
      label: 'パスワード（確認用）',
      placeholder: 'ご自身で設定したパスワード',
      getInputProps: form.getInputProps('password'),
      required: true,
    },
    {
      label: '生徒の学年',
      placeholder: '1年生',
      getInputProps: form.getInputProps('grade'),
      required: false,
    },
    {
      label: '生徒のクラス',
      placeholder: '1組',
      getInputProps: form.getInputProps('class'),
      required: false,
    },
    {
      label: '生徒の学籍番号',
      placeholder: '123456',
      getInputProps: form.getInputProps('studentNumber'),
      required: false,
    },
    {
      label: '生徒の性別',
      placeholder: '男性',
      getInputProps: form.getInputProps('gender'),
      required: false,
    },
    {
      label: '生徒の生年月日',
      placeholder: '2000/01/01',
      getInputProps: form.getInputProps('birthday'),
      required: false,
    },
  ];

  return (
    <Container size="lg" py="xl" mb={100}>
      <Stack justify="flex-start">
        <Text
          size="xl"
          mb={20}
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          生徒を追加する
        </Text>
        <form
          onSubmit={form.onSubmit(async (val) => {
            console.log(val);
            await new StudentRepository().create(new Student().fromObj(val));
            router.push(pagesPath.assessment.$url());
          })}
        >
          {formList.map((item) =>
            item.label === 'パスワード' || item.label === 'パスワード（確認用）' ? (
              <PasswordInput
                label={item.label}
                placeholder={item.placeholder}
                required={item.required}
                py="md"
                {...item.getInputProps}
              />
            ) : item.label === '生徒の生年月日' ? (
              <DateInput
                value={value}
                onChange={setValue}
                label="Date input"
                placeholder="Date input"
                mx="auto"
                py="md"
              />
            ) : (
              <TextInput
                withAsterisk
                label={item.label}
                placeholder={item.placeholder}
                {...item.getInputProps}
                required={item.required}
                py="md"
              />
            )
          )}
          <Button
            fullWidth
            type="submit"
            className={classes.loginButton}
            color="pink"
            size="lg"
            mt={30}
          >
            登録する
          </Button>
        </form>
      </Stack>
    </Container>
  );
};
