import { useAuthContext } from 'src/application/ApplicationService/authContext';
import { StudentLoginPre } from '../Presentational/StudentLoginPre';

export const StudentLoginCon = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  return <StudentLoginPre isLoggedIn={isLoggedIn} />;
};
