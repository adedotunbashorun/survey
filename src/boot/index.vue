<template>
    <view class="container">
      <!-- <text class="text-color-primary">{{JSON.stringify(notification.data)}}</text> -->
      <app-loading v-if="!isAppReady"> </app-loading>
      <app v-if="isAppReady"></app>
    </view>
</template>


<script>
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";
import Vuelidate from 'vuelidate';
import { AppLoading } from "expo";
import * as Font  from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import App from "../index.vue";
import { Notifications } from 'expo';
import { user,enablePushNotifications, sendMessage, renderNotification, sendNotificationImmediately, config } from "../scripts/pushNotifications";
import store from "../store";
// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);
Vue.use(Vuelidate);
export default {
  components: { App ,AppLoading},
  data: function() {
    return {
      isAppReady: false,
      notification: {}
    };
  },
  created: function() {
    this.loadFonts();
    // enablePushNotifications();
    // sendNotificationImmediately("Test Notification","Hello from test user");
    // sendMessage("Test Notification","Hello from test user","");
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  },
  methods: {
    loadFonts: async()  => {
      try {
        this.isAppReady = false;
        await Font.loadAsync({
          'Roboto': require('../../node_modules/native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });       
        this.isAppReady = true;
      } catch (error) {
        console.log("some error occured", error); 
        this.isAppReady = true;

      }
    },
    _handleNotification:  async(notification) => {
      this.notification = notification;
      let data = await user();
      if(this.notification.data.user_id ===  data._id){        
        renderNotification(this.notification.title,this.notification.body);
      }
    },
  },
};
</script>

<style>
.container {
  flex: 1;
  /* background-color: #282E68; */
}
.text-color-primary {
  color: blue;
}
</style>