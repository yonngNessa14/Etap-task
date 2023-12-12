import {SizedBox, Text} from '@components';
import React, {forwardRef, useMemo} from 'react';
import {Switch, TouchableOpacity, View, ViewStyle} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {colors, palette} from '@theme';
import {API_KEY} from '@env';

interface Props {
  /**
   * Value of the Switch component
   */
  switchVal: boolean;

  /**
   * Snappoints for the bottom sheet
   */
  snapPoints: string[];

  /**
   * onValueChange of the Switch component
   */
  onValueChange: (val: boolean) => void;

  /**
   * Function to select address from googleAutoComplete
   */
  onPress: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void;

  /**
   *
   */
  onDonePress: () => void;

  /**
   *
   */
  onClose: () => void;
}

type Ref = BottomSheet;

export const BottomSheetFooter = forwardRef<Ref, Props>(
  (
    {switchVal, snapPoints, onValueChange, onPress, onDonePress, onClose},
    ref,
  ) => {
    const $styles = useMemo(() => {
      return {
        container: {
          flex: 0,
        },
        textInput: {
          height: 45,
          fontSize: 16,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: colors.primary,
        },
      };
    }, []);
    return (
      <BottomSheet
        ref={ref}
        keyboardBehavior="fillParent"
        index={2}
        snapPoints={snapPoints}
        onClose={onClose}
        style={$container}>
        <SizedBox height={10} />
        <Text text="Add new Marker" weight="bold" size="lg" />
        <SizedBox height={10} />
        <GooglePlacesAutocomplete
          fetchDetails={true}
          debounce={400}
          keyboardShouldPersistTaps="always"
          styles={$styles}
          placeholder="Search"
          onPress={onPress}
          query={{
            key: API_KEY,
            language: 'en',
            components: 'country:ng',
          }}
        />
        <SizedBox height={20} />
        <Text text="Map Settings" weight="bold" size="lg" />
        <SizedBox height={10} />
        <View style={$row}>
          <Text text="Stop Tracking" weight="500" size="sm" />
          <Switch
            trackColor={{true: colors.primary}}
            value={switchVal}
            onValueChange={onValueChange}
          />
        </View>
        <SizedBox height={40} />
        <TouchableOpacity style={$btn} onPress={onDonePress}>
          <Text text="Done" color={palette.neutral} weight="bold" size="md" />
        </TouchableOpacity>
      </BottomSheet>
    );
  },
);

const $container: ViewStyle = {
  paddingHorizontal: 18,
};

const $row: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const $btn: ViewStyle = {
  alignItems: 'center',
  backgroundColor: colors.primary,
  paddingVertical: 12,
  borderRadius: 10,
};
