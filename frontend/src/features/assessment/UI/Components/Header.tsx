import { createStyles, Container, Group, Header, Image } from '@mantine/core';
import { staticPath } from 'src/lib/$path';

interface HeaderTabsProps {
  rightButton: React.ReactNode;
  backgroundColor?: any;
}

export const AssessmentHeader = (props: HeaderTabsProps) => {
  const useStyles = createStyles((theme) => ({
    header: {
      paddingTop: theme.spacing.sm,
      backgroundColor: theme.fn.variant({
        variant: 'filled',
        color: props.backgroundColor ?? theme.primaryColor,
      }).background,
      borderBottom: `1px solid ${
        theme.fn.variant({ variant: 'filled', color: props.backgroundColor ?? theme.primaryColor })
          .background
      }`,
    },

    mainSection: {
      paddingBottom: theme.spacing.sm,
    },
  }));
  const { classes } = useStyles();

  return (
    <Header className={classes.header} height={60}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Image width={80} src={staticPath.images.sakiyuku_slim_logo_png} alt="sakiyuku logo" />

          {props.rightButton}
        </Group>
      </Container>
    </Header>
  );
};
