import React, { ReactElement } from 'react';
import HomePageLayout from "../layout/Home";

const Home = () => {
  return <div className="app"></div>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;