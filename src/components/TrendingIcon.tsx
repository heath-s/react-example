import React from 'react';

import { TrendingDown, TrendingFlat, TrendingUp } from '@material-ui/icons';

export default function TrendingIcon(
  { classes, value }: { classes: Record<"minus" | "plus", string>, value: number },
) {
  if (value < 0) {
    return <TrendingDown className={classes.minus} />;
  } else if (value > 0) {
    return <TrendingUp className={classes.plus} />;
  } else {
    return <TrendingFlat />;
  }
};
