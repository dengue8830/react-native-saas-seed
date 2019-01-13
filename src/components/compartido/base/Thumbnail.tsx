import * as React from 'react';
import { Thumbnail as NBThumbnail } from 'native-base';
import { ImageSourcePropType, ImageStyle, StyleProp, StyleSheet } from 'react-native';

interface IProps {
  source: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export function Thumbnail(props: IProps) {
  const {
    size = 64,
    style = {}
  } = props;

  return (
    <NBThumbnail
      source={props.source}
      square={true}
      style={{ borderRadius: 10, height: size, width: size, ...StyleSheet.flatten(style) }}
    />
  );
};