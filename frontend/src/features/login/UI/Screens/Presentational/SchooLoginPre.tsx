import { AssessmentHomeCon } from 'src/features/assessment/UI/Screens/Container/assessmentHomeCon';
import SchoolLoginPage from 'src/pages/login/school';

interface SchoolLoginPreProps {
  isLoggedIn: boolean;
}

export const SchoolLoginPre = (props: SchoolLoginPreProps) => (
  <>{props.isLoggedIn ? <AssessmentHomeCon /> : <SchoolLoginPage />}</>
);
