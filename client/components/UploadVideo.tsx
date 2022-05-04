import { Modal, Button, useMantineTheme, Group, Text, Progress, Stack, TextInput, Switch } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ArrowBigUpLine } from "tabler-icons-react";
import { useMutation } from "react-query";
import { updateVideo, uploadVideo } from "../api";
import { useForm } from "@mantine/hooks";
import { Video } from "../types";
import { AxiosError, AxiosResponse } from "axios";
import { useVideo } from "../context/videos";

function EditVideoForm({ 
    videoId,
    setOpened 
} : {
    videoId: string,
    setOpened: Dispatch<SetStateAction<boolean>>
}){

    const { refetch } = useVideo();

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            published: true
        }
    });

    type input = Parameters<typeof updateVideo>;

    const mutation = useMutation<
        AxiosResponse<Video>,
        AxiosError,
        input["0"]
    >
    (updateVideo, {
        onSuccess: () => { setOpened(false); refetch(); }
    });

    return (
        <form onSubmit={form.onSubmit((values) => mutation.mutate({ videoId, ...values }) )}>
            <Stack>
                <TextInput 
                    label="Title"
                    required
                    placeholder="My awesome video"
                    {...form.getInputProps('title')}
                />
                <TextInput 
                    label="Description"
                    required
                    placeholder="My awesome video description"
                    {...form.getInputProps('description')}
                />
                <Switch 
                    label="Published"
                    {...form.getInputProps('published')}
                />
                <Button type="submit"> Save </Button>
            </Stack>
        </form>
    )
}

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

                {mutation.data && (
                    <EditVideoForm 
                        setOpened={setOpened}
                        videoId={mutation.data.videoId}
                    />
                )}
                
            </Modal>

            <Button color="red" ml="lg" mr="lr" onClick={() => setOpened(true)}>
                Upload a video
            </Button>
        </>
    )

}

export default UploadVideo;