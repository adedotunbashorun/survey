import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {config} from './../config'

const PUSH_REGISTRATION_ENDPOINT = config.apiUrl+'/api/token';
const MESSAGE_ENPOINT = config.apiUrl+'/api/push_message';

const user =  async () => {
    let data = await AsyncStorage.getItem('user');
    let user = JSON.parse(data)
    return user
}

const sendMessage = async (title="", message, user_id = '') => {
    let userdata = await user();
    let data = {
        message: message,
        title: title,
        user_id: (user_id === "") ? userdata._id : user_id
    }
    fetch(MESSAGE_ENPOINT,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    message = ''
}

const askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return false;
    }
    return true;
}
  
const registerForPushNotifications = async () => {
    const enabled = await askPermissions();
    if (!enabled) {
      return Promise.resolve();
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    let userdata = await user();
    let data = {
        token: {
            value: token,
        },
        user_id: userdata._id
    }
    fetch(PUSH_REGISTRATION_ENDPOINT,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    // return token;
}

const enablePushNotifications = async () => {
    let token = await registerForPushNotifications();
    if (token) {
      return token;
    }
}

const sendNotificationImmediately = async (title, message) => {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: title,
      body: message,
      vibrate: true,
      sound: true,
      android:{
        sound: true,
      },
      ios: {
        sound: true,
      },
      priority: 'max'
    });
    console.log(notificationId);
}

const renderNotification = (title,message) => {
    return(
      <View style={styles.container}>
        <Text style={styles.label}>{title}</Text>
        <Text>{message}</Text>
      </View>
    )
 }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#474747',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      height: 50,
      width: 300,
      borderColor: '#f6f6f6',
      borderWidth: 1,
      backgroundColor: '#fff',
      padding: 10
    },
    button: {
      padding: 10
    },
    buttonText: {
      fontSize: 18,
      color: '#fff'
    },
    label: {
      fontSize: 18
    }
});

export {
    enablePushNotifications,
    registerForPushNotifications,
    askPermissions,
    sendMessage,
    renderNotification,
    sendNotificationImmediately,
    user,
    config
}