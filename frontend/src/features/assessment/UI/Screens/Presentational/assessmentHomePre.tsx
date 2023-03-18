import { AppShell, Container } from '@mantine/core';
import { FC } from 'react';
import { AssessmentHeader } from '../../Components/Header';
import { AssessmentNavbar } from '../../Components/Navbar';

interface AssessmentHomePreProps {
  pages: any[];
  navigationIndex: number;
}

export const AssessmentHomePre: FC<AssessmentHomePreProps> = (props) => (
  <AppShell
    padding="md"
    header={<AssessmentHeader rightButton={undefined} />}
    navbar={<AssessmentNavbar />}
  >
    <Container size="lg" py="xl">
      {props.pages[props.navigationIndex]}
    </Container>
  </AppShell>
);
