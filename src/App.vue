<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle" v-slot= "{ Component }">
    <keep-alive>
        <component :is="Component"/>
    </keep-alive>
  </router-view>
  <router-view  :style="viewStyle" name="user" v-slot= "{ Component }">
      <transition appear name="slide">
        <keep-alive>
        <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view>
  <player></player>
</template>
<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
import { mapState } from 'vuex'

export default {
  components: {
    MHeader: Header,
    Tab,
    Player
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? '60px' : 0
      return {
        bottom
      }
    },
    ...mapState([
      'playlist'
    ])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
