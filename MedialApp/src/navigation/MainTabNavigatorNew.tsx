import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { ROUTES } from '../constants/routes';
import { colors } from '../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { HomeScreen, NewsScreen, NotificationsScreen, ProfileScreenEnhanced } from '../screens';

// Temporary placeholder components
const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
    <Text style={{ color: colors.text }}>{name} Screen</Text>
  </View>
);

const ShowcaseScreen = () => <PlaceholderScreen name="Showcase" />;
const SearchScreen = () => <PlaceholderScreen name="Search" />;
const JobsScreen = () => <PlaceholderScreen name="Jobs" />;
const MessagesScreen = () => <PlaceholderScreen name="Messages" />;

const Tab = createBottomTabNavigator<MainTabParamList>();

const getTabIcon = (routeName: string, focused: boolean) => {
  let iconName = '';
  switch (routeName) {
    case ROUTES.HOME:
      iconName = focused ? 'home' : 'home-outline';
      break;
    case ROUTES.NEWS:
      iconName = focused ? 'newspaper' : 'newspaper-outline';
      break;
    case ROUTES.SHOWCASE:
      iconName = focused ? 'rocket' : 'rocket-outline';
      break;
    case ROUTES.SEARCH:
      iconName = focused ? 'search' : 'search-outline';
      break;
    case ROUTES.JOBS:
      iconName = focused ? 'briefcase' : 'briefcase-outline';
      break;
    case ROUTES.MESSAGES:
      iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
      break;
    case ROUTES.NOTIFICATIONS:
      iconName = focused ? 'notifications' : 'notifications-outline';
      break;
    case ROUTES.PROFILE:
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
  }
  return iconName;
};

export default function MainTabNavigatorNew() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabIcon(route.name, focused);
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.NEWS} component={NewsScreen} />
      <Tab.Screen name={ROUTES.SHOWCASE} component={ShowcaseScreen} />
      <Tab.Screen name={ROUTES.SEARCH} component={SearchScreen} />
      <Tab.Screen name={ROUTES.JOBS} component={JobsScreen} />
      <Tab.Screen name={ROUTES.MESSAGES} component={MessagesScreen} />
      <Tab.Screen name={ROUTES.NOTIFICATIONS} component={NotificationsScreen} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreenEnhanced} />
    </Tab.Navigator>
  );
}
