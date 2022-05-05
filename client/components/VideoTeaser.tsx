import { Card, Text } from "@mantine/core";
import Link from "next/link";
import { Video } from "../types";
import Image from 'next/image';

function VideoTeaser({video}:{video: Video}){
    return (
        <Link 
            //href={`/watch/${video.videoId}`} 
            passHref
            href={{
                pathname: `/watch/${video.videoId}`,
                query: {
                    id: video.videoId,
                    title: video.title,
                    description: video.description
                },
                
            }}
            as={`watch/${video.videoId}`}
        >
            <Card 
                shadow="sm" 
                p="xl" 
                component="a" 
                //href={`/watch/${video.videoId}`}
            >
                <img src="/thumb.png" alt="thumb" className="thumb" width="100%" height="250px" />
                <Text weight={500} size="lg">
                    {video.title}
                </Text>
                <Text size="sm">
                    {video.description}
                </Text>
            </Card>
        </Link>
    )
}

export default VideoTeaser