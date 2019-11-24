<template>
  <nb-container>
    <nb-content class="sidebar-content-wrapper" :bounces="false">
      <view class="drawer-cover" :style="stylesObj.drawerCoverObj">
        <image :source="drawerImage" class="drawer-image" :style="stylesObj.drawerImageObj"/>
        <nb-text class="drawer-text">Welcome back!</nb-text>
        <nb-text class="drawer-text1">{{ userData.first_name +' '+ userData.last_name}}</nb-text>
      </view>
      <view :style="{ marginLeft: 20,borderBottomColor: '#4285F4',borderBottomWidth: 1}"/>
      <nb-list>
        <nb-list-item v-for="data in routes" :key="data.route" button noBorder :on-press="() => handleListItemClick(data)">
          <nb-left style="margin-left: 10">
            <nb-icon
              active
              :name="data.icon"              
              :type="(data.type) ? data.type : 'Ionicons'"
              :style="{ color: data.color, fontSize: 30, width: 40 }"
            />
            <nb-text :style="{marginLeft: 10, color: data.bg}">
              {{data.name}}
            </nb-text>
          </nb-left>
          <nb-right v-if="data.types" :style="{flex: 1}">
            <nb-badge class="list-item-badge-container" :style="{backgroundColor: data.bg}">
              <nb-text class="list-item-badge-text" :style="stylesObj.badgeText">
                {{`${data.types} Types`}}
              </nb-text>
            </nb-badge>
          </nb-right>
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Platform , AsyncStorage} from "react-native";
import drawerCover from "../../../assets/drawer-cover.png";
import { NavigationActions } from 'vue-native-router';
import drawerImage from "../../../assets/Avatar.png";
import { Toast } from 'native-base';
import store from '../../store';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
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
  data: function(){
    return {      
      loaded: false,
      drawerCover: drawerCover,
      drawerImage: drawerImage,
      userData: {},
      check: false,
      stylesObj: {
        drawerCoverObj: {
          height: deviceHeight / 4.0
        },
        drawerImageObj: {
          left: Platform.OS === "android" ? deviceWidth / 14 : deviceWidth / 13,
          top:
            Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
          resizeMode: "cover"
        },
        badgeText: {
          fontSize: Platform.OS === "android" ? 11 : 13,
          marginTop: Platform.OS === "android" ? -3 : 0,
          fontWeight: "400"
        }
      },
      routes: [
            {
              name: "Dashboard",
              route: "Home",
              icon: "home",
              type: "FontAwesome",
              bg: "#9D9D9D",
              color: "#4285F4"
            },
          ]
    }
  },
  created() {
    this.getUserDetails() 
  },
  methods: {
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
      handleListItemClick: function(dataObj) {
        this.navigation.navigate(dataObj.route);
      },
      getUserDetails(){

        AsyncStorage.getItem('user').then((val) => {
            if (val) {
              this.userData = JSON.parse(val)
              if(this.userData.user_type == 'vendor')  {
                this.check = true
              }                
            } 
        })
      }
  },
};
</script>
<style>
  .sidebar-content-wrapper {
    flex: 1;
    background-color: #FFFFFF;
    left: 0;
    top: 0;
  }
  .drawer-cover {
    /* flex: 1;
    align-self: stretch;
    position: relative;
    margin-bottom: 10; */
  }
  .drawer-image {
    position: absolute;
    height: 100;
    width: 100;
    /* left: 26; */
    top: 48;
  }
  .drawer-text {
    align-self: center;
    position: absolute;
    color: #C8C8C8;
    margin-top: 60;
    padding-left: 100;
    font-size: 18;
    font-weight: 200;
  }
  .drawer-text1 {
    align-self: center;
    position: absolute;
    color: #4285F4;
    top: 80;
    padding-left: 100;
    font-size: 25;
    text-transform: capitalize;
    font-weight: bold;
    font-style: normal;
  }
  .list-item-badge-container {
    border-radius: 3;
    height: 25;
    width: 72;
  }
  .list-item-badge-text {
    /* font-weight: 400; // not-working  */
    font-weight: bold; 
    text-align: center;
  }
</style>
