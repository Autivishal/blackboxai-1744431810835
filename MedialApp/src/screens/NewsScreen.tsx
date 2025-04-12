import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme/colors';

const NewsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>News Screen</Text>
    </View>
  );
};

export default NewsScreen;
