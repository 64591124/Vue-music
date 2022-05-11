import { computed, ref } from 'vue'

export default function useShortcut(props, groupRef) {
    const scrollRef = ref(null)
    const ANCHOR_HEIGHT = 18

    const shortcutList = computed(() => {
        return props.data.map((group) => {
            return group.title
        })
    })

    const touch = {}
    function onShortcutTouchStart(e) {
        const anchorIndex = parseInt(e.target.dataset.index)

        touch.y1 = e.touches[0].pageY
        touch.anchorIndex = anchorIndex
        scrollTo(anchorIndex)
    }
    function onShortcutTouchMove(e) {
        touch.y2 = e.touches[0].pageY
        //  | 0 正数向下取整 类似于floor
        const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
        const anchorIndex = touch.anchorIndex + delta
        scrollTo(anchorIndex)
    }
    // 相同逻辑代码的封装 滚动
    function scrollTo(index) {
        if (isNaN(index)) {
            return
        }
        index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
        const targetEl = groupRef.value.children[index]
        const scroll = scrollRef.value.scroll
        scroll.scrollToElement(targetEl)
    }
    return {
        shortcutList,
        onShortcutTouchStart,
        scrollRef,
        onShortcutTouchMove
    }
}