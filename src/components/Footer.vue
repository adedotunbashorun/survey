<template>
    <nb-footer class="footer">
      <nb-footer-tab class="footer">
        <nb-button class="footer" v-if="name !== 'Dashboard'" :on-press="() => handleListItemClick('Home')">
          <nb-icon type="FontAwesome" name="home" />
        </nb-button>
        <nb-button class="footer" v-else :on-press="() => handleListItemClick('Orders')">
          <nb-icon type="FontAwesome" name="list" />
        </nb-button>
        <nb-button v-if="user.user_type === 'client'" class="footer" :on-press="() => handleListItemClick('Home')">
          <nb-icon name="map"/>
        </nb-button>
        <nb-button class="footer" :on-press="() => handleListItemClick('Home')">
          <nb-icon name="person" />
        </nb-button>
      </nb-footer-tab>
    </nb-footer>
</template>
<script>
import { AsyncStorage } from "react-native";
export default {
  props: {
    name: String,
    navigation: Object,
    right: Boolean,
    routeName: String,
    routeText: String
  },  
  data: function(){
        return {
          user:{}
            //  drawerImage: drawerImage,     
        }
    },
    mounted() {
      this.getUser();
    },
    methods: {
        handleListItemClick: function(dataObj) {
            this.navigation.navigate(dataObj);
        },

        getUser(){
          AsyncStorage.getItem('user').then((val) => {
            if (val) {        
              this.user = JSON.parse(val);
            } 
          })
        }
    },
}
</script>
<style>
    .footer {
      background-color: #4285F4;
    }
</style>