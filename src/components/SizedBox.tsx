import React from 'react';
import {View} from 'react-native';

interface SizedBoxProps {
  height?: number | string;
  width?: number | string;
  backgroundColor?: any;
  flex?: number;
  borderColor?: string;
  style?: any;
}
export const SizedBox = ({
  width,
  height,
  flex,
  backgroundColor,
  style,
}: SizedBoxProps) => {
  return (
    <View
      style={[
        {
          width,

          height,
          flex,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};
