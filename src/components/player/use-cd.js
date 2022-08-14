import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

export default function useCd() {
    const cdRef = ref(null)
    const cdImageRef = ref(null)

    const store = useStore()
    const playing = computed(() => store.state.playing)

    const cdCls = computed(() => {
        return playing.value ? 'playing' : ''
    })
    watch(playing, (newPlaying) => {
        if (!newPlaying) {
            syncTransform(cdRef.value, cdImageRef.value)
        }
    })
    function syncTransform(wrapper, inner) {
        const wrapperTransform = getComputedStyle(wrapper).transform
        // 动态获取内层图片角度
        const innerTransform = getComputedStyle(inner).transform
        wrapper.style.transform = wrapperTransform === 'none'
            ? innerTransform : innerTransform.concat(' ', wrapperTransform) // 角度叠加
    }

    return {
        cdCls,
        cdRef,
        cdImageRef
    }
}