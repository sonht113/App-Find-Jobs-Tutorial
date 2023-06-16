import React from 'react';
import { Redirect } from 'expo-router';
import { registerRootComponent } from 'expo';

export default function Index() {
  return <Redirect href="/home" />;
}
