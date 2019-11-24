<template>
    <root>
      <app-navigation></app-navigation>
    </root>
</template>


<script>
import React from "react";
import { StackNavigator, DrawerNavigator, navigationService } from "vue-native-router";
import { Root } from "native-base";
import SplashScreen from "./screen/splash.vue";
import LoginScreen from "./screen/authentication/login.vue";
import HomeScreen from "./screen/dashboard/index.vue";
import Sidebar from "./screen/sidebar/index.vue";
import WelcomeScreen  from "./screen/welcome.vue";
import ActivityScreen from './screen/activity/index.vue';

const Drawer = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Activity: { screen: ActivityScreen },
  },
  {
    initialRouteName: "Home",
    drawerType: 'back',
    drawerPosition: 'left',
    activeColor: '#ffffff',
    activeBackgroundColor: "#4285f4",
    contentOptions: {
      activeTintColor: "#ffffff",      
    },
    contentComponent: props => <Sidebar {...props} />
  }
);
const AppNavigation = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Drawer: { screen: Drawer },
    Splash: { screen: SplashScreen},
    Welcome: { screen: WelcomeScreen},
  },
  {
    initialRouteName: "Splash",
    headerMode: "none"
  }
);
export default {
  components: { Root, AppNavigation }
};
</script> 