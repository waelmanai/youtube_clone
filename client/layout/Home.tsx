import { Anchor, AppShell, Box, Button, Header, Navbar, Indicator, Avatar, Menu } from "@mantine/core";
import React from "react";
import Image from 'next/image';
import Link from "next/link";
import { useMe } from "../context/me";
import UploadVideo from "../components/UploadVideo";
import { VideosContextProvider } from "../context/videos";
import { Sidebar } from "../components/Sidebar";

function HomePageLayout({ children }: { children: React.ReactNode }){

    const {user, refetch} = useMe();

    return (
        <VideosContextProvider>
            <AppShell
                padding="md"
                navbar={
                    <Navbar width={{ base: 80 }} height="89vh" p="xs">
                        <Sidebar />
                    </Navbar>
                }
                header={
                    <Header height={60} p="xs">
                        <Box sx={() => ({ display: "flex" })}>
                            <Box sx={() => ({ flex: "1" })}>
                                <Link href="/" passHref>
                                    <Image src="/logo.png" alt="logo" width="100px" height="40px" className="logo" />
                                </Link>
                            </Box>
                            {!user && (
                                <>
                                    <Link href="/auth/login" passHref>
                                        <Button color="red" ml="lg" mr="lr">Login</Button>
                                    </Link>
                                    <Link href="/auth/register" passHref>
                                        <Button variant="outline" color="red" ml="lg" mr="lr">Register</Button>
                                    </Link>
                                </>
                            )}
                            {user && (
                                <>
                                    {console.log(user)}
                                    <UploadVideo />
                                    <Menu ml="lg" mr="lr" control={
                                        <Indicator inline size={16} offset={7} position="top-end" color="red" withBorder>
                                            <Avatar
                                                size="md"
                                                radius="xl"
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                                            />
                                        </Indicator>
                                    }>
                                        <Menu.Label>{user.username}</Menu.Label>
                                        <Menu.Item>Logout</Menu.Item>
                                    </Menu>
                                    
                                </>
                            )}
                        </Box>
                    </Header>
                }
            >
                
                {children}
                
            </AppShell>
        </VideosContextProvider>
    )
}

export default HomePageLayout;