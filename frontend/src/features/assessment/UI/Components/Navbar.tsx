import { useState } from 'react';
import { createStyles, getStylesRef, Navbar, ThemeIcon } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  IconDatabaseImport,
  IconReceipt2,
  IconLogout,
} from '@tabler/icons-react';
import { useSetRecoilState } from 'recoil';
import { navigationState } from '../../Hooks/navigation_state';

const useStyles = createStyles((theme) => {
  const icon = getStylesRef('icon');
  return {
    navbar: {
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: Number(theme.spacing.md) * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      )}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: 0, label: '生徒一覧', icon: IconBellRinging },
  { link: 1, label: '生徒情報登録', icon: IconReceipt2 },
  { link: 2, label: '担当授業一覧', icon: IconFingerprint },
  { link: 3, label: '担当授業登録', icon: IconKey },
  { link: 4, label: '運営へお問い合わせ', icon: IconDatabaseImport },
  { link: 5, label: '設定', icon: IconSettings },
];

export const AssessmentNavbar = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');
  const setNavigationIndex = useSetRecoilState(navigationState);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href=""
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setNavigationIndex(item.link);
      }}
    >
      <ThemeIcon className={classes.linkIcon}>
        <item.icon />
      </ThemeIcon>
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar height="auto" width={{ sm: 240 }} p="xs" className={classes.navbar}>
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="./home" className={classes.link} onClick={(event) => event.preventDefault()}>
          <ThemeIcon className={classes.linkIcon}>
            <IconLogout />
          </ThemeIcon>
          <span>ログアウト</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};
