<template>
  <div class="singer" v-loading="!singers.length">
    <index-list
    :data= "singers"
    @select="selectSinger"
    ></index-list>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '../components/base/index-list/index-list'
export default {
    name: 'singer',
    components: {
      IndexList
    },
    data() {
      return {
        singers: []
      }
    },
    async created() {
      const result = await getSingerList()
      this.singers = result.singers
      console.log(result)
    },
    methods: {
      selectSinger(singer) {
        this.selectedSinger = singer
        this.$router.push({
          path: `/singer/${singer.mid}`
        })
      }
    }
}
</script>

<style lang='scss' scope>
.singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>