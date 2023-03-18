import { Anchor, Container, Title, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { LoginForm } from 'src/application/UI/components/card/LoginForm';
import { AssessmentHeader } from 'src/features/assessment/UI/Components/Header';
import { studentLogin } from 'src/features/login/Domain/DomainServices/studentLoginDomService';
import { pagesPath } from 'src/lib/$path';

export default function TeacherLoginPage() {
  const router = useRouter();
  return (
    <>
      <AssessmentHeader rightButton={undefined} backgroundColor="blue" />
      <Container size={600} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          mt={100}
        >
          さきゆく評価システムへようこそ
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={10}>
          先生用のアカウントをお持ちでないですか? <br />
          <Anchor<'a'> color="blue" href="#" size="sm" onClick={(event) => event.preventDefault()}>
            学校へお問い合わせください
          </Anchor>
        </Text>
        <LoginForm
          label="先生ID"
          buttonColor="blue"
          onSubmit={async (val: any) => {
            const id = val.value;
            const { password } = val;
            // firebase authの処理
            const isLogin = await studentLogin(id, password);
            if (isLogin) {
              router.push(pagesPath.assessment.$url());
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
