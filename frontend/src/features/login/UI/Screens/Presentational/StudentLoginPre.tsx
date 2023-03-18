import { CurriculumHome } from 'src/features/curriculum/UI/Screens/Container/curriculumHome';
import StudentLoginPage from 'src/pages/login/student';

interface StudentLoginPreProps {
  isLoggedIn: boolean;
}

export const StudentLoginPre = (props: StudentLoginPreProps) => (
  <>{props.isLoggedIn ? <CurriculumHome /> : <StudentLoginPage />}</>
);
