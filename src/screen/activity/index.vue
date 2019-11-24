<template>
    <nb-container class="containers">
      <Header :name="name" :navigation="navigation" :data="data" class="header"/>   
        <nb-spinner v-if="loaded"></nb-spinner> 
          <nb-content v-else>            
            <view  v-if="activities"> 
              <nb-list-item thumbnail v-for="(activity , index) in activities" :key="index">
                  <nb-left>
                    <nb-thumbnail :source="drawerImage" class="drawer-image" />
                  </nb-left>
                  <nb-body>
                      <nb-text :style="{ fontSize: 14, fontWeight: 'bolder' }">{{activity.description}}</nb-Text>
                      <nb-text note>{{ new Date(activity.createdAt).getDate() + '-' + months[new Date(activity.createdAt).getMonth()] + '-' + new Date(activity.createdAt).getFullYear()}}</nb-Text>
                  </nb-body>        
              </nb-list-item>
            </view>
          </nb-content>          
        <Footer :name="name" :navigation="navigation"/> 
    </nb-container>
</template>

<script>
import { Platform,Dimensions,AsyncStorage  } from 'react-native';
import { NavigationActions } from 'vue-native-router';
import drawerImage from "../../../assets/Avatar.png";
import store from '../../store';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default {  
  props: {
    navigation: {
      type: Object
    }
  },
  data: function(){
    return {      
      loaded: true,
      token: '',
      activities:[],
      drawerImage: drawerImage,
      data: {},
      months: ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    }
  },
  computed:{    
    name(){
      return 'Activity Log'
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
            this.data = JSON.parse(val)
            this.ActivityLog()
          } 
      })
    },
    ActivityLog(){
      store.dispatch('activity', [ this.data._id, this.token]).then(data =>{
          this.activities = data.activities
          this.loaded = false
        }).catch(err => {
          
        });
    },
    
  },
  components: {
      Header: () => import('../../components/Header'),
      Footer: () => import('../../components/Footer')
  }
};
</script>
<style>
  .containers{
    flex: 1;
    /* flex-direction: row; */
    padding-top: 23;
    /* background-color: #ffffff; */
  }
  .header {
    z-index: 1;
  }
  .container {
        flex: 1;
        flex-direction: row;        
        background-color: #ffffff;
        padding: 10;
        margin-left: 15;
        margin-right: 15;
        margin-bottom: 20;
        z-index: -1;
    }
    .text-color {
      color: #424242;    
    }
    .drawer-image {
      height: 80;
      width: 80;
      margin-top: 10;
      text-align:right;
      /* margin-right: 70; */
      align-self: flex-start;
  }
  

  .text4{
    font-style: normal;
    font-weight: normal;
    font-size: 7;
    line-height: 11;
    text-align: right;
    color: #afafaf;
  }
  
  .text6 {
    font-style: normal;
    font-weight: bold;
    font-size: 14;
    line-height: 17;
    color: #9d9d9d;
  }
  .card {
    background-color: #ffffff;
    border-radius: 5;
    /* padding: 15; */
  }
</style>
