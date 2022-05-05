import React, { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Group } from '@mantine/core';
import {
  Icon as TablerIcon,
  Home2,
  Star,
  DeviceTv,
  ThumbUp,
  AlignJustified,
  History,
  Settings,
  Logout,
} from 'tabler-icons-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
//import { MantineLogoSmall } from '../../shared/MantineLogo';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.black,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.colors.red[8],
      color: theme.white,
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.colors.red[8],
      color: theme.white,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: Home2, label: 'Home', to: '/' },
  { icon: Star, label: 'Trending', to: '/' },
  { icon: DeviceTv, label: 'Subscriptions', to: '/' },
  { icon: AlignJustified, label: 'History', to: '/' },
  { icon: History, label: 'Watch later', to: '/' },
  { icon: ThumbUp, label: 'Liked videos', to: '/' },
];

const useNavbarStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.white,
  },
}));

export function Sidebar() {
  const [active, setActive] = useState(0);
  const { classes } = useNavbarStyles();
  
  const router = useRouter();
  
  const links = mockdata.map((link, index) => (

    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index),
        router.push(link.to)
      }}
    />
  ));

  return (
    <>
      {/* <Center>
        <MantineLogoSmall variant="white" />
      </Center> */}
      <Navbar.Section grow mt={50}>
        <Group direction="column" align="center" spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
          {/* <NavbarLink icon={Settings} label="Settings" /> */}
          {/* <NavbarLink icon={Logout} label="Logout" /> */}
        </Group>
      </Navbar.Section>
      </>
  );
}