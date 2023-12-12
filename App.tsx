import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppNavigator} from '@navigators/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <GestureHandlerRootView style={{flex: 1}}>
        <AppNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
