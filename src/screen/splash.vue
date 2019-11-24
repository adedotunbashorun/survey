<template>
    <nb-container v-if="loaded" :style="{backgroundColor: '#fff'}">
        <nb-content padder>
            <view>
                <nb-text class="btn-text">Start Survey </nb-text>
            </view>
        </nb-content>
    </nb-container>
</template>

<script>
import { Dimensions, Platform,AsyncStorage } from "react-native";
import { NavigationActions } from 'vue-native-router';
import { Toast } from 'native-base';
import store from '../store';
const SCREEN_WIDTH = Dimensions.get('window').width;
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: "Login"})]
})
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data: function() {
    return {
      loaded: false,
      stylesObj: {
        logoContainerStyle: {
          marginTop: Dimensions.get("window").height / 4,
          alignItems: 'center',
        },
        logoStyle: {
          left: Platform.OS === "android" ? 40 : 50,
          top: Platform.OS === "android" ? 35 : 60
        },
      }
    };
  },
  created() {
    AsyncStorage.getItem('token').then((val) => {
      if (val) {        
        this.loaded = true
        setTimeout(() => {
            this.navigation.navigate("Home");
        }, 6000)
        
      } else {
        AsyncStorage.getItem('user').then((val) => {
          if (val) {        
            this.loaded = true
            this.navigation.navigate("Login");
          }
          this.loaded = true
          setTimeout(() =>{
            this.navigation.navigate("Welcome");
          }, 5000);
        })
      }
    })
    
  },
};
</script>
<style>
  .overlay{
    background-color:transparent;
    opacity: 0.6
  }
  .text{
    margin-top: 10;
    font-size: 18;
    color: #FFFFFF;
    /* font-weight: bold; */
    align-self: center;
  }
</style>