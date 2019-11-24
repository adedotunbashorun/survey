<template>
    <nb-container class="container">
        <Header :name="name" :navigation="navigation" :details="details" :data="data" class="header"/>        
        <nb-content>
          <nb-spinner v-if="loaded"></nb-spinner>                
          <view>
            <nb-text>Dashboard</nb-text>
          </view>
        </nb-content>
        <Footer :name="name" :navigation="navigation"/> 
    </nb-container>
</template>

<script>
import React from 'react';
import { Dimensions,AsyncStorage  } from 'react-native';
import store from '../../store';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default {  
  props: {
      navigation: Object
  },
  data: function(){
    return {      
      loaded: true,
      data: {},
      token: '',
      details: {},
    }
  },
  computed:{    
    name(){
      return 'Dashboard'
    }
  },
  created(){
    AsyncStorage.getItem('token').then((val) => {
      if (val) {
        this.token = val
        this.loaded = true
      } else {
        this.loaded = true
        this.navigation.navigate('Login')
      }
    })
  },
  mounted(){
    this.getUserDetails()
  },
  methods: {
    getUserDetails(){
      AsyncStorage.getItem('user').then((val) => {
          if (val) {
            this.loaded = false
            this.data = JSON.parse(val)
          } 
      })
    },
  },
  components: {
      Header: () => import('../../components/Header'),
      Footer: () => import('../../components/Footer')
  }
};
</script>
<style>
  .container{
    flex: 1;
    /* flex-direction: row; */
    padding-top: 23;
    
    background-color: #E5E5E5;
  }
  .header {
    z-index: 1;
  }

  .content {
    z-index: -1;
  }
  
</style>
