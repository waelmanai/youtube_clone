import { useRouter } from "next/router";
import { Grid, SimpleGrid, Text, Title } from '@mantine/core';
import React, { ReactElement } from 'react';
import HomePageLayout from "../../layout/Home";
import Head from "next/head";

function WatchVideoPage(){

    const {query} = useRouter();

    return (
        <>
            {console.log(query)}
            <Head>  
                <title>Stream</title>
            </Head>
            <Grid>
                <Grid.Col sm={12} lg={8}>
                    <div>
                        <video
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
                            width="100%"
                            height="auto"
                            controls
                            autoPlay
                            id="video-player"
                        >

                        </video>
                        
                        <Title mt={20}>{query.title}</Title>
                        <Text mt={20}>{query.description}</Text>
                    </div>
                </Grid.Col>
                <Grid.Col sm={12} lg={4}>
                    <div></div>
                </Grid.Col>
            </Grid>
            
        </>
    )

}

WatchVideoPage.getLayout = function getLayout(page: ReactElement) {
    return <HomePageLayout>{page}</HomePageLayout>;
};

export default WatchVideoPage;

