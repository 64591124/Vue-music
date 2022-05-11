<template>
  <div
  class="progress-bar"
  @click="onClick"
  >
    <div class="bar-inner"
    >
      <div class="progress"
      :style="progressStyle"
      ref="progress"
      ></div>
      <div
      class="progress-btn-wrapper"
      :style="btnStyle"
      @touchstart.prevent="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16

export default {
  name: 'progress-bar',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  emits: ['progress-changing', 'progress-changed'],
  data() {
    return {
      offset: 0
    }
  },
  computed: {
    progressStyle() {
      return `width:${this.offset}px`
    },
    btnStyle() {
      return `transform:translate3d(${this.offset}px,0,0)`
    }
  },
  watch: {
      // 用computed的话第一次拿不到$el.clientWidth 但是也可以用 逻辑操作用watch
    progress(newProgress) {
      this.setOffset(newProgress)
    }
  },
  created() {
    // 为了methods中的方法共享 但是不需要响应式
    this.touch = {}
  },
  methods: {
    onTouchStart(e) {
      // 获取开始横坐标
      this.touch.x1 = e.touches[0].pageX
      // 获取左侧进度条初始宽度
      this.touch.beginWidth = this.$refs.progress.clientWidth
    },
    onTouchMove(e) {
      const delta = e.touches[0].pageX - this.touch.x1
      // 位移过后进度条应该到的宽度
      const tempWidth = this.touch.beginWidth + delta
      // 进度条总长
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
      // 最终位置
      this.offset = barWidth * progress
      this.$emit('progress-changing', progress)
    },
    onTouchEnd() {
      const barWidth = this.$el.clientWidth - progressBtnWidth
      const progress = this.$refs.progress.clientWidth / barWidth
      this.$emit('progress-changed', progress)
    },
    onClick(e) {
        const rect = this.$el.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        const barWidth = this.$el.clientWidth - progressBtnWidth
        const progress = offsetWidth / barWidth
        this.$emit('progress-changed', progress)
    },
    setOffset(progress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth
      this.offset = barWidth * progress
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
