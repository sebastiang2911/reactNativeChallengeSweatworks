import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { MetaInfoRow, MetaInfoText } from './styles';

type MetaInfoProps = {
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  text: string | number;
  textStyle?: StyleProp<TextStyle>;
};

function MetaInfo({ icon, style, text, textStyle }: MetaInfoProps) {
  return (
    <MetaInfoRow style={style}>
      {icon}
      <MetaInfoText style={textStyle}>{text}</MetaInfoText>
    </MetaInfoRow>
  );
}

export { MetaInfo };
