import './styles/index.scss';
import Layout from './components/Layout/Layout';
import MainBanner from './components/MainBanner/MainBanner';
import GetRequestSection from './components/GetRequestSection/GetRequestSection';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostRequestSection from './components/PostRequestSection/PostRequestSection';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MainBanner />
        <GetRequestSection />
        <PostRequestSection />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
