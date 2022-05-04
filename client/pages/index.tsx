import { SimpleGrid } from '@mantine/core';
import React, { ReactElement } from 'react';
import VideoTeaser from '../components/VideoTeaser';
import { useVideo } from '../context/videos';
import HomePageLayout from "../layout/Home";

const Home = () => {
  const { videos } = useVideo();
  return <div className="app">
    <SimpleGrid 
      cols={3}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      { (videos || []).map((video) => {
        return <VideoTeaser key={video.videoId} video={video} />
      }) }
    </SimpleGrid>
    
  </div>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;