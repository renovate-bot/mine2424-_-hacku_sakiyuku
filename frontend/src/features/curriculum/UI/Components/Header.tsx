import { useState } from 'react';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Image,
  ThemeIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import { staticPath } from 'src/lib/$path';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: `1px solid ${
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background
    }`,
    marginBottom: 20,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1
    ),
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: 38,
    color: theme.white,
    backgroundColor: 'transparent',
    borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
    },

    '&[data-active]': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
      borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    },
  },
}));

interface HeaderTabsProps {
  user: { name: string; image: string };
}

export const CurriculumHeader = ({ user }: HeaderTabsProps) => {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Image width={80} src={staticPath.images.sakiyuku_slim_logo_png} alt="sakiyuku logo" />

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color={theme.white}
          />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right', duration: 150 }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={26} />
                  <Text weight={600} size="md" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
                    {user.name}
                  </Text>
                  <ThemeIcon size={12}>
                    <IconChevronDown />
                  </ThemeIcon>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={
                  <ThemeIcon size={14} color={theme.colors.red[6]}>
                    <IconHeart />
                  </ThemeIcon>
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                icon={
                  <ThemeIcon size={14} color={theme.colors.yellow[6]}>
                    <IconStar />
                  </ThemeIcon>
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                icon={
                  <ThemeIcon size={14} color={theme.colors.blue[6]}>
                    <IconMessage />
                  </ThemeIcon>
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                icon={
                  <ThemeIcon size={14}>
                    <IconSettings />
                  </ThemeIcon>
                }
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                icon={
                  <ThemeIcon size={14}>
                    <IconSwitchHorizontal />
                  </ThemeIcon>
                }
              >
                Change account
              </Menu.Item>
              <Menu.Item
                icon={
                  <ThemeIcon size={14}>
                    <IconLogout />
                  </ThemeIcon>
                }
              >
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                icon={
                  <ThemeIcon size={14}>
                    <IconPlayerPause />
                  </ThemeIcon>
                }
              >
                Pause subscription
              </Menu.Item>
              <Menu.Item
                color="red"
                icon={
                  <ThemeIcon size={14}>
                    <IconTrash />
                  </ThemeIcon>
                }
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
};
