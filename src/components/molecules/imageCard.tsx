import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import { Card } from '@material-ui/core';

type Props = {
  src: string;
  order?: number;
};

const useStyles = makeStyles<Theme, { order: number }>(() => ({
  root: {
    padding: '5px',
    '-webkit-column-break-inside': 'avoid',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
    order: ({ order }) => order,
  },
  image: {
    width: '100%',
  },
}));

const ImageCard: FC<Props> = ({ src, order }) => {
  const classes = useStyles({ order: order || 0 });

  return (
    <Box className={classes.root}>
      <Card>
        <CardMedia component="img" image={src} />
      </Card>
    </Box>
  );
};

export default ImageCard;
