import { Text, Progress, Card, createStyles } from '@mantine/core';

export type ProggressBarCardProps = {
  title: string;
  description: string;
  value: number;
  backgroundCardColor?: string;
};

// TODO: propsでcolorを受け取れるようにする
export const ProggressBarCard = (props: ProggressBarCardProps) => {
  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: props.backgroundCardColor ?? theme.colors.pink[5],
      margin: 10,
    },

    title: {
      color: theme.fn.rgba(theme.white, 0.65),
    },

    stats: {
      color: theme.white,
    },

    progressBar: {
      backgroundColor: theme.white,
    },

    progressTrack: {
      backgroundColor: theme.fn.rgba(theme.white, 0.4),
    },
  }));
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text size="xs" transform="uppercase" weight={700} className={classes.title}>
        {props.title}
      </Text>
      <Text size="lg" weight={500} className={classes.stats}>
        {props.description}
      </Text>
      <Progress
        value={props.value}
        mt="md"
        size="lg"
        radius="xl"
        classNames={{
          root: classes.progressTrack,
          bar: classes.progressBar,
        }}
      />
    </Card>
  );
};
