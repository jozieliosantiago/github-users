import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Main" component={Main} options={Main.options} />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({ title: route.params.user.name })}
        />
        <Stack.Screen
          name="Repository"
          component={Repository}
          options={({ route }) => ({
            title: route.params.repository.full_name,
            headerTitleContainerStyle: {
              marginHorizontal: 50,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
