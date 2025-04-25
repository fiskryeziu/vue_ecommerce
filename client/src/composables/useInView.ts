import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useInView(target: Ref<HTMLElement | null>, options = {}) {
  const isInView = ref(false)

  let observer: IntersectionObserver

  const cb = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries

    isInView.value = entry.isIntersecting
  }

  onMounted(() => {
    if (target.value) {
      observer = new IntersectionObserver(cb, options)

      observer.observe(target.value)
    }
  })
  onUnmounted(() => {
    if (target.value && observer) {
      observer.unobserve(target.value)
    }
  })

  return { isInView }
}
