import React from 'react';
import { StatusBar } from 'react-native';
import RootNavigatorNew from './src/navigation/RootNavigatorNew'; // Updated import
import { colors } from './src/theme/colors';

function AppNew(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
      />
      <RootNavigatorNew /> {/* Updated component */}
    </>
  );
}

export default AppNew;
