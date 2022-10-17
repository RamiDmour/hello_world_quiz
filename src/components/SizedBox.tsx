import React from 'react';
import { View } from 'react-native';

export const SizedBox = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => <View style={{ width, height }} />;
