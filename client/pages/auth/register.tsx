import { Button, Text, Paper, PasswordInput, TextInput, Title, createStyles, ThemeIcon  } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { registerUser } from '../../api'

const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: '100vh',
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://cdn.wallpapersafari.com/30/41/SX4JNp.png)',
    },

    form: {
        borderRight: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        minHeight: '100vh',
        maxWidth: 450,
        paddingTop: 80,
    
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          maxWidth: '100%',
        },
    },
    
    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    
}));

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

    const { classes } = useStyles();

    return(
        <>
            <Head>
                <title>Register user</title>
            </Head>

            <div className={classes.wrapper}>
                <Paper className={classes.form} radius={0} p={30}>
                    <Title order={2} className={classes.title} align="center" mt="md">
                        Welcome back to <br />
                    </Title>
                    <Title order={2} className={classes.title} align="center" mt={0}>Youtube clone!</Title>
                    <Text align="center" mt={20} mb={30}>Created by Wael Manai</Text>
                    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
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
                            mt="sm"
                            {...form.getInputProps("username")}
                        />

                        <PasswordInput 
                            label="Password"
                            placeholder="Your strong password"
                            required
                            mt="sm"
                            {...form.getInputProps("password")}
                        />

                        <PasswordInput 
                            label="Confirm Password"
                            placeholder="Your strong password"
                            required
                            mt="sm"
                            {...form.getInputProps("confirmPassword")}
                        />

                        <Button color="red" fullWidth mt="xl" size="md" type="submit">Register</Button>
                    </form>
                    
                </Paper>
            </div>

            {/* <Container>
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
            </Container> */}
        </>
    )
}

export default RegisterPage;