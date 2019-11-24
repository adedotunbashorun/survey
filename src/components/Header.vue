<template>
    <!-- <view class="container"> -->
        
        <nb-header class="container" hasTabs>
            <nb-left :style="{top: 0}">
                <nb-button
                    transparent
                    :on-press="() => navigation.navigate('DrawerOpen')"
                >
                    <nb-icon name="list" />
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-text class="text"> {{ name }} </nb-text>                
            </nb-body>
            <nb-right :style="{top: 0}" v-if="right">
                <nb-icon type="FontAwesome" :style="{color: '#ffffff'}" name="plus" :on-press="() => navigation.navigate(routeName)"/>
            </nb-right>
            <nb-right :style="{top: 0}">
                <touchable-opacity>
                    <nb-icon  type="FontAwesome" :style="{color: '#ffffff'}" name="bell" :on-press="() => navigation.navigate('Notification')"/>
                </touchable-opacity>
            </nb-right>        
        </nb-header>
    <!-- </view> -->
</template>
<script>
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
            //  drawerImage: drawerImage,     
        }
    }
}
</script>
<style>
 .container {
    background-color: #4285f4;
    /* height: 80; */
 }
 .contain {
    background-color: #4285f4;
    opacity: 0.9;
    /* height: 80; */
 }
 .text{
    font-style: normal;
    font-weight: bold;
    font-size: 25;
    color: #FFFFFF;
 }
</style>

