import { Container, Title, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { LoginForm } from 'src/application/UI/components/card/LoginForm';
import { AssessmentHeader } from 'src/features/assessment/UI/Components/Header';
import { studentLogin } from 'src/features/login/Domain/DomainServices/studentLoginDomService';
import { pagesPath } from 'src/lib/$path';

export default function StudentLoginPage() {
  const router = useRouter();
  return (
    <>
      <AssessmentHeader rightButton={undefined} />
      <Container size={600} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          mt={100}
        >
          さきゆくへようこそ
        </Title>
        <Text size="lg" align="center" mt={10}>
          将来のための学習をしましょう
        </Text>

        <LoginForm
          label="生徒ID"
          buttonColor="pink"
          onSubmit={async (val: any) => {
            const id = val.value;
            const { password } = val;
            // firebase authの処理
            const isLogin = await studentLogin(id, password);
            if (isLogin) {
              router.push(pagesPath.curriculum.$url());
            } else {
              // eslint-disable-next-line no-alert
              alert(
                'ログインに失敗しました。\n IDとパスワードが間違っていないか確認してください。'
              );
            }
          }}
        />
      </Container>
    </>
  );
}
