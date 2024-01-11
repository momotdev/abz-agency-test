import './styles/index.scss';
import Layout from "./components/Layout/Layout";
import MainBanner from "./components/MainBanner/MainBanner";
import GetRequestSection from "./components/GetRequestSection/GetRequestSection";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

// TODO: FIX INDENTS
function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Layout>
          <MainBanner/>
          <GetRequestSection/>
        </Layout>
      </QueryClientProvider>
  );
}

export default App;
