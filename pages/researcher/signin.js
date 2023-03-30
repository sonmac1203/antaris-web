import { AuthLayout } from '@/components/layouts';
import { ResearcherSignInCard } from '@/components/authorization';

const ResearcherSignInIndex = () => {
  return <ResearcherSignInCard />;
};

ResearcherSignInIndex.Layout = AuthLayout;

export default ResearcherSignInIndex;
