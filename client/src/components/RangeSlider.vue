<template>
  <div class="slider" ref="slider" @click="onTrackClick">
    <span
      class="thumb left"
      :style="{ left: leftThumb + 'px' }"
      @mousedown.stop="startDrag('left', $event)"
    ></span>
    <span
      class="thumb right"
      :style="{ left: rightThumb + 'px' }"
      @mousedown.stop="startDrag('right', $event)"
    ></span>
    <div
      class="track"
      :style="{
        left: leftThumb + 'px',
        width: rightThumb - leftThumb + 'px',
      }"
    ></div>
  </div>
  <div class="filter__button">
    <button @click="queryFilter">Filter</button>

    <div class="labels">
      <span>{{ leftValue }}</span>
      <span>-</span>
      <span>{{ rightValue }}</span>
    </div>
  </div>
  <div class="filter__overlay" v-if="isOpen" @click="toggleFilter"></div>
</template>

<script setup lang="ts">
import type { IFilter } from '@/views/ShopView.vue'
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const filterContext = inject<IFilter>('filterIsOpen')

if (!filterContext) {
  throw new Error('filterIsOpen not provided!')
}

const { isOpen, toggleFilter } = filterContext

const slider = ref<HTMLElement | null>(null)
const leftThumb = ref(0)
const rightThumb = ref(0)

let dragging: 'left' | 'right' | null = null
let shiftX = 0
let sliderWidth = 0
const thumbSize = 10

const minVal = 20
const maxVal = 400

const router = useRouter()
const route = useRoute()
const queryFilter = () => {
  const current = { ...route.query }
  let min = String(leftValue.value)
  let max = String(rightValue.value)

  if (min) {
    current['min_price'] = min
  } else {
    delete current['min_price']
  }
  if (max) {
    current['max_price'] = max
  } else {
    delete current['max_price']
  }

  router.push({ query: current })
  toggleFilter()
}

const getValueFromPx = (px: number): number => {
  const percent = px / (sliderWidth - thumbSize)
  return Math.round(minVal + percent * (maxVal - minVal))
}

const getPxFromValue = (value: number): number => {
  const percent = (value - minVal) / (maxVal - minVal)
  return percent * (sliderWidth - thumbSize)
}

const leftValue = computed(() => getValueFromPx(leftThumb.value))
const rightValue = computed(() => getValueFromPx(rightThumb.value))

const startDrag = (thumb: 'left' | 'right', e: MouseEvent) => {
  dragging = thumb
  shiftX = e.clientX - (e.target as HTMLElement).getBoundingClientRect().left

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', stopDrag)
}

const onMouseMove = (e: MouseEvent) => {
  const sliderLeft = slider.value?.getBoundingClientRect().left as number
  let newLeft = e.clientX - sliderLeft - shiftX
  moveThumb(dragging, newLeft)
}

const stopDrag = () => {
  dragging = null
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDrag)
}

const moveThumb = (thumb: 'left' | 'right' | null, newLeft: number) => {
  if (thumb === 'left') {
    if (newLeft < rightThumb.value - 20) {
      newLeft = Math.max(0, newLeft)
      leftThumb.value = newLeft
    }
  } else {
    if (newLeft - 20 > leftThumb.value) {
      newLeft = Math.min(newLeft, sliderWidth - thumbSize)
      rightThumb.value = newLeft
    }
  }
}

const onTrackClick = (e: MouseEvent) => {
  if (!slider.value) return

  const sliderLeft = slider.value.getBoundingClientRect().left
  const clickX = e.clientX - sliderLeft
  const leftDist = Math.abs(clickX - leftThumb.value)
  const rightDist = Math.abs(clickX - rightThumb.value)
  const closestThumb = leftDist < rightDist ? 'left' : 'right'

  moveThumb(closestThumb, clickX - thumbSize / 2)
}

onMounted(() => {
  const updateSlider = () => {
    if (!slider.value) return
    sliderWidth = slider.value.offsetWidth
    leftThumb.value = getPxFromValue(minVal)
    rightThumb.value = getPxFromValue(maxVal)
  }

  updateSlider()
  window.addEventListener('resize', updateSlider)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSlider)
  })
})
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  height: 6px;
  background: #ddd;
  margin: 50px auto;
  cursor: pointer;
}
.thumb {
  position: absolute;
  top: -5px;
  width: 15px;
  height: 15px;
  background: var(--background);
  cursor: col-resize;
  z-index: 2;
  user-select: none;
  outline: 0.5px solid var(--lightest);
}

.track {
  position: absolute;
  height: 6px;
  background: var(--primary);
  top: 0;
  z-index: 1;
}

.filter__button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter__button button {
  padding: 0.4em 1em;
  background-color: var(--primary);
  color: var(--background);
}

.labels {
  display: flex;
  gap: 0.4em;
  font-size: 16px;
}
</style>
