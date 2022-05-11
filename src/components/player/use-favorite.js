import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from './array-store'
import { FAVORITE_KEY } from '../../assets/js/constant'

export default function useFavorite() {
    const store = useStore()
    const favoriteList = computed(() => store.state.favoriteList)
    const maxLen = 100

    function getFavoriteIcon(song) {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    }

    function toggleFavorite(song) {
        let list
        if (isFavorite(song)) {
            // remove
            list = remove(FAVORITE_KEY, compare)
        } else {
            // save  利用本地存储  返回的是整个列表
            list = save(song, FAVORITE_KEY, compare, maxLen)
        }
        store.commit('setFavoriteList', list)

        function compare(item) {
            return item.id === song.id
        }
    }
    // 判断歌曲是否在收藏列表中
    function isFavorite(song) {
        return favoriteList.value.findIndex((item) => {
          return item.id === song.id
        }) > -1
      }
    return {
        getFavoriteIcon,
        toggleFavorite
    }
}