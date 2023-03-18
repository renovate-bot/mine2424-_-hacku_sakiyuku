import { useAuthContext } from 'src/application/ApplicationService/authContext';
import { TeacherLoginPre } from '../Presentational/TeacherLoginPre';

export const TeacherLoginCon = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  return <TeacherLoginPre isLoggedIn={isLoggedIn} />;
};
