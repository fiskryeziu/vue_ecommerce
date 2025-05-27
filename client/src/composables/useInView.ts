import { ref, onUnmounted, type Ref, watch } from 'vue'

export function useInView(target: Ref<HTMLElement | null>, options = {}) {
  const isInView = ref(false)

  let observer: IntersectionObserver

  const cb = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries

    isInView.value = entry.isIntersecting
  }

  const stopWatching = watch(
    target,
    (el) => {
      if (observer) {
        observer.disconnect()
      }
      if (el) {
        observer = new IntersectionObserver(cb, options)
        observer.observe(el)
      }
    },
    { immediate: true },
  )
  onUnmounted(() => {
    if (observer) observer.disconnect()
    stopWatching()
  })

  return { isInView }
}
