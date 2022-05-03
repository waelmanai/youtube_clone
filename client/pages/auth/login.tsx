import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { loginUser } from '../../api'

function LoginPage(){

    const router = useRouter();

    const form = useForm({
        initialValues: {
          email: "",
          password: "",
        },
    });

    const mutation = useMutation<string, AxiosError, Parameters<typeof loginUser>["0"]>(loginUser, {
        onMutate: () => {
            showNotification({
                id: 'login',
                title: 'Auth',
                message: 'Please wait ..',
                loading: true
            });
        },
        onSuccess: () => {
            updateNotification({
                id: 'login',
                title: 'Success',
                message: 'Successfully logged in',
                color: 'green',
                className: 'my-notification-class',
                loading: false,
            });

            router.push('/');
        },
        onError: () => {
            updateNotification({
                id: 'login',
                title: 'Error',
                message: 'Request failed: User not found',
                color: 'red',
                className: 'my-notification-class',
                loading: false,
            });
        },
    })

    return(
        <>
            <Head>
                <title>Login user</title>
            </Head>
            <Container>
                <Title>Sign In</Title>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
                        <Stack>
                            <TextInput 
                                label="Email"
                                placeholder="wael@example.com"
                                required
                                {...form.getInputProps("email")}
                                />

                            <PasswordInput 
                                label="Password"
                                placeholder="Your strong password"
                                required
                                {...form.getInputProps("password")}
                            />

                            <Button type="submit">Login</Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default LoginPage;