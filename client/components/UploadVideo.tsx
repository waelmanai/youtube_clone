import { Modal, Button, useMantineTheme, Group, Text, Progress } from "@mantine/core";
import { useState } from "react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ArrowBigUpLine } from "tabler-icons-react";
import { useMutation } from "react-query";
import { uploadVideo } from "../api";

function UploadVideo(){

    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const mutation = useMutation(uploadVideo);
    const [progress, setProgress] = useState(0);

    const config = {
        onUploadProgress: (progressEvent: any) => {
            const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );

            setProgress(percent);
        }
    }

    function upload(files: File[]){
        const formData = new FormData();

        formData.append('video', files[0]);

        mutation.mutate({ formData, config })
    }

    return(
        <>
            <Modal
                closeOnClickOutside={true}
                onClose={() => setOpened(false)}
                opened={opened}
                title="Upload video"
                size="xl"
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                {progress === 0 && <Dropzone
                     onDrop={(files) => {
                        upload(files);
                    }}
                    accept={[MIME_TYPES.mp4]}
                    multiple={false}
                >
                    {(status) => {
                        return(
                            <Group
                                position="center"
                                spacing="xl"
                                style={{
                                    minHeight: "50vh",
                                    justifyContent: "center"
                                }}
                                direction="column"
                            >
                                <ArrowBigUpLine />
                                <Text>Drag video here or click to find</Text>
                            </Group>
                        )
                    }}
                </Dropzone>}

                {progress > 0 && <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />}
                
            </Modal>

            <Button color="red" ml="lg" mr="lr" onClick={() => setOpened(true)}>
                Upload a video
            </Button>
        </>
    )

}

export default UploadVideo;