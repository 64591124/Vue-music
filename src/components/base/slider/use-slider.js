import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)

export default function usrSlider(wrapperRef) {
    const slider = ref(null)// 外部定义
    const currentPageIndex = ref(0)

    onMounted(() => {
        const sliderVal = slider.value = new BScroll(wrapperRef.value, {
            click: true,
            scrollY: false,
            scrollX: true,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: true
        })

        sliderVal.on('slideWillChange', (page) => {
            currentPageIndex.value = page.pageX
        })
    })
    onUnmounted(() => {
        slider.value.destroy()
    })
    return {
        slider,
        currentPageIndex
    }
}