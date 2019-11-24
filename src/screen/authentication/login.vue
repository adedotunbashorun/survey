<template>
  <keyboard-avoiding-view behavior="padding" class="container" enabled>     
    <nb-icon :style="{marginLeft: 15, marginTop:3, color:'#ffffff'}" name="arrow-back" :on-press="() => navigation.goBack()" />
    <view class="container-top">
      <nb-text class="container-text">Login</nb-text>
      <nb-text class="container-text2" note :numberOfLines="1">Good to have you back.</nb-text>
    </view>
    <nb-content class="login-container" :style="{ shadowOffset: {width: 0, height: 2}}"> 
      <nb-form :style="{marginTop: 50}">
          <nb-item :error="(!$v.emailValue.required || !$v.emailValue.email ) && $v.emailValue.$dirty">
            <nb-input keyboardType="email-address" placeholder="Email Address" class="input" v-model="emailValue" auto-capitalize="none" :on-blur="() => $v.emailValue.$touch()"/>
              <nb-icon  type="FontAwesome" class="input-icon" name="envelope" />
          </nb-item>
          <nb-item last :error="!$v.password.required && $v.password.$dirty" :style="{marginTop: 10}" >
            <nb-input placeholder="Password" class="input" v-model="password" auto-capitalize="none" secure-text-entry :on-blur="() => $v.password.$touch()" />
              <nb-icon  type="FontAwesome" class="input-icon"  name="lock" />
          </nb-item>         
      </nb-form>         
      <view :style="{marginTop:20}">
        <nb-grid>
            <nb-col>
            </nb-col>
            <nb-col>
              <touchable-opacity :on-press="forgetPassword"><text class="forget-text">Forget Password?</text></touchable-opacity>
            </nb-col>                  
          </nb-grid>
      </view>
      <view>
        <nb-button class="login-btn" :on-press="login">
          <nb-spinner v-if="logging_in" size="small" />
          <nb-text class="login-text">Login</nb-text>
        </nb-button>
      </view>
    </nb-content>    
    <view class="container-bottom"></view>      
  </keyboard-avoiding-view>
</template>

<script>
import {config} from '../../config'
import { Dimensions, Platform, AsyncStorage, Keyboard } from "react-native";
import { Toast } from 'native-base';
import { NavigationActions } from 'vue-native-router';
import { required, email } from 'vuelidate/lib/validators';
import store from '../../store';
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
  computed: {
  },
  validations: {
    emailValue: {
      required,
      email
    },
    password: {
      required
    }
  },
  data: function() {
    return {
      emailValue: '',
      password: '',
      apiUrl: '',
      logging_in: false,
      user: {},
      stylesObj: {
        logoContainerStyle: {
          // marginTop: Dimensions.get("window").height / 14,          
          alignSelf: "center"
        },
      }
    };
  },
  created() {
    this.apiUrl = config.apiUrl
    AsyncStorage.getItem('user').then((val) => {
      if (val) {
        val = JSON.parse(val)
        this.user = val 
        this.emailValue = val.email 
      } else {
        this.user = ''
      }
    })
    
  },
  methods: {
    login() {
      if (this.emailValue && this.password && !this.$v.emailValue.$invalid) {
        this.logging_in = true,
        store.dispatch('login', {email: this.emailValue, password: this.password}).then(data =>{
          if(data.error || data.name){
            Toast.show({
                text: JSON.stringify(data.msg),
                duration: 5000,
                buttonText: 'Okay',
                type: "danger"       
            })
            this.logging_in = false
          }else{  
              Keyboard.dismiss            
              this.logging_in = false
              this.navigation.navigate('Home')
              Toast.show({
                text: data.msg,
                buttonText: 'Okay',                  
                type: "success"          
              })
          }
        }).catch(err => {
          Toast.show({
              text: err.message,
              buttonText: 'Okay',
              type: "danger"              
          })
          this.logging_in = false
        });
      } else {
        Toast.show({
          text: 'Invalid Email or Password',          
          buttonText: 'Okay',
          type: 'warning'          
        })
      }
    },
    forgetPassword(){
        this.navigation.navigate('ForgetPassword')
    },
    logout() {
      store.dispatch('logout', store.state.headers).then(data => {
        if(data.error || data.name){
          Toast.show({
              text: data.message,
              buttonText: 'Okay',
              type: 'danger'         
          })
        }else{
            Toast.show({
              text: data.msg,
              buttonText: 'Okay',
              type: 'success'          
            })
            
          this.navigation.dispatch(resetAction)
        }
      }).catch(err =>{
        Toast.show({
            text: err.message,
            buttonText: 'Okay',
            type: 'danger'         
        })
      })
    },
  }
};
</script>
<style>

  .container{
    flex:1;
    background-color: #4285F4;
    padding-top: 30;
  }

  .container-text{
    font-style: normal;
    font-weight: bold;
    margin-top: 30;
    font-size: 36;
    line-height: 55;
    color: #ffffff;
    align-self: center;
  }

  .container-text2 {
    font-style: normal;
    font-weight: normal;
    color: #ffffff;
    font-size: 14;
    line-height: 21;
    align-self: center;
  }
  /* .container-top{
    flex: 4.5;
    background-color: #4285F4;
  }
  .container-bottom{
    background-color: #4285F4;
    flex: 8;    
  } */
  
  .login-container{
    /* position: absolute; */
    background-color: #ffffff;
    width: 90%;
    margin-top: 50;
    border-radius: 20;
    margin-left: 5%;
    margin-right: 5%; 
    padding-left: 15;
    padding-right: 15;
    margin-bottom: 50;    
    shadow-opacity: 0.8;
    shadow-radius: 2;
    shadow-color: rgba(0, 0, 0, 0.25);
    /* z-index: 1; */
  }

  .input {
    color: #9D9D9D;
    font-style: normal;
    font-weight: bold;
    font-size: 14;
    line-height: 21;
  }

  .input-icon {
    color: #4285F4;
    font-style: normal;
    font-weight: bold;
    font-size: 14;
    line-height: 21;
  }
  .login-btn {
    background-color: #4285F4;
    border-radius: 10;
    margin-top: 30;
    margin-top: 40;
    padding: 10;
    justify-content: center;
    shadow-color: rgba(0, 0, 0, 0.25);
  }

  .login-text{
      font-style: normal;
      font-weight: normal;
      font-size: 14;
      align-self: center;
      line-height: 17;
  }

  .forget-text {
    /* font-family: Open Sans Hebrew; */
    font-style: normal;
    font-weight: bold;
    font-size: 11;
    line-height: 15;
    align-self: flex-end;
    color: #4285F4;
  }
  .register-text {
    /* font-family: Open Sans Hebrew; */
    font-style: normal;
    font-weight: bold;
    font-size: 14;
    line-height: 19;
    color: #4285F4;
  }

  .social{
    color: #4285F4;
    height: 100;
    width: 100;
  }
  .social2{
    color: #f44242;
    height: 100;
    width: 100;
  }

  .signuptext {
    font-style: normal;
    font-weight: normal;
    font-size: 14;
    font-weight: bold;
    line-height: 19;
    color: #9F9C9C;
  }
  

  
</style>
