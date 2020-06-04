import React from 'react';

import NumberFormat, { NumberFormatProps } from 'react-number-format';

export default function NumberPipe(props: NumberFormatProps) {
  return <NumberFormat decimalScale={2} defaultValue="-" displayType="text" thousandSeparator={true}
    {...props} />;
}
