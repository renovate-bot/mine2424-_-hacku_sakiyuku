import { AssessmentHomeCon } from 'src/features/assessment/UI/Screens/Container/assessmentHomeCon';
import TeacherLoginPage from 'src/pages/login/teacher';

interface TeacherLoginPreProps {
  isLoggedIn: boolean;
}

export const TeacherLoginPre = (props: TeacherLoginPreProps) => (
  <>{props.isLoggedIn ? <AssessmentHomeCon /> : <TeacherLoginPage />}</>
);
