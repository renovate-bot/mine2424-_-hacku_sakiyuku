import { useRecoilValue } from 'recoil';
import { navigationState } from 'src/features/assessment/Hooks/navigation_state';
import { AssessmentStudentList } from 'src/features/student/UI/Screens/list';
import AssessmentStudentCreatePage from 'src/pages/student/create';
import { AssessmentHomePre } from '../Presentational/assessmentHomePre';

export const AssessmentHomeCon = () => {
  const navigationIndex = useRecoilValue(navigationState);

  const pages = [
    <AssessmentStudentList />,
    <AssessmentStudentCreatePage />,
    <div>test</div>,
    <div>test</div>,
    <div>test</div>,
    <div>test</div>,
  ];

  return <AssessmentHomePre pages={pages} navigationIndex={navigationIndex} />;
};
