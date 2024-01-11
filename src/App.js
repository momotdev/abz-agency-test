import './styles/index.scss';
import Layout from "./components/Layout/Layout";
import MainBanner from "./components/MainBanner/MainBanner";
import GetRequestSection from "./components/GetRequestSection/GetRequestSection";

// TODO: FIX INDENTS
function App() {
  return (
      <Layout>
        <MainBanner/>
        <GetRequestSection/>
      </Layout>
  );
}

export default App;
