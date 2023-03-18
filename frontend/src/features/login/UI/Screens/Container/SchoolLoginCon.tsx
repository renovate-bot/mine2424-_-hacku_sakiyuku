import { useAuthContext } from 'src/application/ApplicationService/authContext';
import { SchoolLoginPre } from '../Presentational/SchooLoginPre';

export const SchoolLoginCon = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  return <SchoolLoginPre isLoggedIn={isLoggedIn} />;
};
