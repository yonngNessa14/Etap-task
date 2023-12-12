import React, {FC} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {SlideInRight} from 'react-native-reanimated';
import {Text} from '@components';
import {colors, palette} from '@theme';

interface Props {
  sateliteMode: boolean;
  changeMapType: () => void;
}

export const MapType: FC<Props> = ({sateliteMode, changeMapType}) => {
  return (
    <Animated.View style={$container} entering={SlideInRight.delay(200)}>
      <TouchableOpacity onPress={changeMapType}>
        <Text
          text={`View ${sateliteMode ? 'Standard' : 'Satelite'} Mode`}
          size="md"
          color={colors.primary}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const $container: ViewStyle = {
  position: 'absolute',
  right: 0,
  backgroundColor: palette.neutral,
  padding: 15,
  marginTop: 10,
  borderRadius: 4,
};
