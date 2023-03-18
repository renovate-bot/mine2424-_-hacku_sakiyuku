import { Anchor, Container, Title, Text } from '@mantine/core';
import { LoginForm } from 'src/application/UI/components/card/LoginForm';
import { AssessmentHeader } from 'src/features/assessment/UI/Components/Header';

export default function SchoolLoginPage() {
  return (
    <>
      <AssessmentHeader rightButton={undefined} backgroundColor="green" />
      <Container size={600} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          mt={100}
        >
          さきゆく評価システムへようこそ
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={10}>
          学校用のアカウントをお持ちでないですか? <br />
          <Anchor<'a'> href="#" size="sm" color="green" onClick={(event) => event.preventDefault()}>
            運営等へお問い合わせください
          </Anchor>
        </Text>
        <LoginForm label="学校ID" buttonColor="green" onSubmit={() => {}} />
      </Container>
    </>
  );
}
