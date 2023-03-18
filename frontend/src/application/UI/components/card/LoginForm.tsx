import {
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Anchor,
  Button,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';

const useStyles = createStyles(() => ({
  loginButton: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
  },
}));

export type LoginFormProps = {
  label: string;
  buttonColor: string;
  onSubmit: (values: any) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      value: '',
      password: '',
    },

    validate: {
      value: (value) => (value.length > 6 ? null : `${props.label}が間違っています`),
      password: (value) => (value.length > 5 ? null : '6桁以上入力してください'),
    },
  });

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(props.onSubmit)}>
        <TextInput
          withAsterisk
          label={props.label}
          placeholder="6桁のID"
          {...form.getInputProps('value')}
          required
        />
        <PasswordInput
          label="パスワード"
          placeholder="ご自身で設定したパスワード"
          required
          mt="md"
          {...form.getInputProps('password')}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="ログインしたままにする" sx={{ lineHeight: 1 }} />
          <Anchor<'a'>
            color={props.buttonColor}
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            {props.label}、パスワードを忘れた方
          </Anchor>
        </Group>
        <Button
          fullWidth
          type="submit"
          className={classes.loginButton}
          color={props.buttonColor}
          size="lg"
          mt={30}
        >
          ログイン
        </Button>
      </form>
    </Paper>
  );
};
