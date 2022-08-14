import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective(Comp) {
  return {
    mounted(el, binding) {
      // 创建app对象 根组件是Comp（loading）组件
      const app = createApp(Comp)
      // 动态创建一个vue对象 loading组件是要挂到el上  mount返回的是根组件实例
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name
      if (!el[name]) {
        el[name] = {}
      }
      // 保留一下instance对象
      el[name].instance = instance
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }
      //
      if (binding.value) {
        append(el)
      }
      // console.log('v-loading', binding.instance)
    },
    updated(el, binding) {
      const title = binding.arg
      const name = Comp.name
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      // 组件更新后 loading变化 动态添加删除
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }
  // 挂载
  function append(el) {
    const name = Comp.name
    const style = getComputedStyle(el)
    // 优化 添加相对定位样式
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      // dom.js里面封装的addClass
      addClass(el, relativeCls)
    }
    // el[name].instance loading组件对应的实例
    // el[name].instance.$el loading组件对应的dom对象
    // 挂载到参数el（就是v-loading作用的dom上）上
    el.appendChild(el[name].instance.$el)
  }

  function remove(el) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
