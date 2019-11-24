<template>
    <nb-container v-if="loaded" :style="{backgroundColor: '#fff'}">
        <nb-content padder>
            <view :style="{marginTop:50}">
                <nb-button class="btn" block :on-press="login">
                    <nb-text class="btn-text">Start Survey </nb-text>
                </nb-button>
            </view>
            <view :style="{marginTop:10}">
                <nb-text class="text">Don’t yet have an account? <nb-text class="signup-label" :on-press="login">Login</nb-text></nb-text>
            </view>
        </nb-content>
    </nb-container>
  <nb-spinner v-else></nb-spinner>
</template>

<script>
import { Dimensions, Platform, AsyncStorage } from "react-native";
import { NavigationActions } from 'vue-native-router';
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
          alignSelf: "center"
        },
      }
    };
  },
  created() {
    this.loaded = true
  },
  methods: {    
    login(){
        this.navigation.navigate('Login')
    },
  }
};
</script>
<style>
    .logoContainer {
        flex: 1;
        margin-bottom: 30;
    }

    .logo {
        width: 200;
        height: 200;
    }
    .btn {        
        background-color: #4285F4;
        /* box-shadow: 0 2 2 rgba(0, 0, 0, 0.24), 0 0 4 rgba(0, 0, 0, 0.05); */
        border-radius: 2;
    }
    .btn-text {

        /* font-family: Lato; */
        font-style: normal;
        font-weight: 500;
        font-size: 16;
        line-height: 19;
        text-align: center;

        color: #FFFFFF;
    }

    .text {
        /* font-family: ; */
        font-style: normal;
        font-weight: normal;
        font-size: 14;
        line-height: 17;
        text-align: center;

        color: #000000;        

    }

    .signup-label {
        color: #4285F4;
    }
    

</style>

