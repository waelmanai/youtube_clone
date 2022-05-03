import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { registerUser } from '../../api'

function RegisterPage(){

    const router = useRouter();

    const form = useForm({
        initialValues: {
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        },
    });

    const mutation = useMutation<string, AxiosError, Parameters<typeof registerUser>["0"]>(registerUser, {
        onMutate: () => {
            showNotification({
                id: 'register',
                title: 'Creating account',
                message: 'Please wait ..',
                loading: true
            });
        },
        onSuccess: () => {
            updateNotification({
                id: 'register',
                title: 'Success',
                message: 'Successfully created account',
                color: 'green',
                className: 'my-notification-class',
                loading: false,
            });

            router.push('/auth/login');
        },
        onError: () => {
            updateNotification({
                id: 'register',
                title: 'Error',
                message: 'Could not create account',
                color: 'red',
                className: 'my-notification-class',
                loading: false,
            });
        },
    })

    return(
        <>
            <Head>
                <title>Register user</title>
            </Head>
            <Container>
                <Title>Sign Up</Title>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
                        <Stack>
                            <TextInput 
                                label="Email"
                                placeholder="wael@example.com"
                                required
                                {...form.getInputProps("email")}
                                />

                            <TextInput 
                                label="Username"
                                placeholder="wael_manai"
                                required
                                {...form.getInputProps("username")}
                            />

                            <PasswordInput 
                                label="Password"
                                placeholder="Your strong password"
                                required
                                {...form.getInputProps("password")}
                            />

                            <PasswordInput 
                                label="Confirm Password"
                                placeholder="Your strong password"
                                required
                                {...form.getInputProps("confirmPassword")}
                            />

                            <Button type="submit">Register</Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default RegisterPage;