<template>
  <div 
    ref="chartContainer" 
    :style="{ width, height }" 
    class="echarts-wrapper"
    :class="{ 'loading': loading, 'error': hasError }"
  >
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <span class="loading-text">{{ loadingText }}</span>
      </div>
    </div>
    
    <!-- 错误状态 -->
    <div v-if="hasError" class="error-overlay">
      <div class="error-content">
        <el-icon class="error-icon"><Warning /></el-icon>
        <span class="error-text">{{ errorText }}</span>
        <el-button size="small" type="primary" @click="retry">重试</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import * as echarts from 'echarts'
import { ElIcon, ElButton } from 'element-plus'
import { Warning } from '@element-plus/icons-vue'

// 定义Props类型
interface EChartsOption {
  [key: string]: any
}

interface Props {
  option: EChartsOption
  width?: string
  height?: string
  theme?: string | object
  loading?: boolean
  loadingText?: string
  errorText?: string
  autoResize?: boolean
  renderer?: 'canvas' | 'svg'
  useDirtyRect?: boolean
  throttle?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  theme: 'default',
  loading: false,
  loadingText: '加载中...',
  errorText: '图表加载失败',
  autoResize: true,
  renderer: 'canvas',
  useDirtyRect: false,
  throttle: 70
})

// 定义Emits
const emit = defineEmits(['chart-ready', 'chart-click', 'chart-mouseover', 'chart-mouseout', 'chart-error'])

// 响应式数据
const chartContainer = ref<HTMLElement | null>(null)
const chartInstance = ref<echarts.ECharts | null>(null)
const hasError = ref(false)
const resizeObserver = ref<ResizeObserver | null>(null)

// 计算属性
const chartTheme = computed(() => {
  if (typeof props.theme === 'string') {
    return props.theme
  }
  return props.theme
})

// 初始化图表
const initChart = async () => {
  try {
    if (!chartContainer.value) {
      throw new Error('Chart container not found')
    }

    // 销毁现有实例
    if (chartInstance.value) {
      chartInstance.value.dispose()
    }

    // 创建新实例
    chartInstance.value = echarts.init(chartContainer.value, chartTheme.value, {
      renderer: props.renderer,
      useDirtyRect: props.useDirtyRect
    })

    // 设置配置
    chartInstance.value.setOption(props.option, true)

    // 绑定事件
    bindEvents()

    // 触发ready事件
    emit('chart-ready', chartInstance.value)

    hasError.value = false
  } catch (error) {
    console.error('ECharts initialization failed:', error)
    hasError.value = true
    emit('chart-error', error as Error)
  }
}

// 绑定事件
const bindEvents = () => {
  if (!chartInstance.value) return

  // 点击事件
  chartInstance.value.on('click', (params) => {
    emit('chart-click', params)
  })

  // 鼠标悬停事件
  chartInstance.value.on('mouseover', (params) => {
    emit('chart-mouseover', params)
  })

  // 鼠标离开事件
  chartInstance.value.on('mouseout', (params) => {
    emit('chart-mouseout', params)
  })
}

// 更新图表
const updateChart = () => {
  if (chartInstance.value && !hasError.value) {
    try {
      chartInstance.value.setOption(props.option, true)
    } catch (error) {
      console.error('ECharts update failed:', error)
      hasError.value = true
      emit('chart-error', error as Error)
    }
  }
}

// 重试
const retry = () => {
  hasError.value = false
  nextTick(() => {
    initChart()
  })
}

// 调整大小
const resizeChart = () => {
  if (chartInstance.value && !hasError.value) {
    chartInstance.value.resize()
  }
}

// 监听配置变化
watch(
  () => props.option,
  () => {
    if (!props.loading) {
      updateChart()
    }
  },
  { deep: true }
)

// 监听加载状态
watch(
  () => props.loading,
  (newLoading) => {
    if (!newLoading && chartInstance.value) {
      // 加载完成后重新渲染
      nextTick(() => {
        updateChart()
      })
    }
  }
)

// 监听主题变化
watch(
  () => props.theme,
  () => {
    initChart()
  }
)

// 监听渲染器变化
watch(
  () => props.renderer,
  () => {
    initChart()
  }
)

// 设置响应式监听
const setupResizeObserver = () => {
  if (!props.autoResize || !chartContainer.value) return

  resizeObserver.value = new ResizeObserver(() => {
    resizeChart()
  })

  resizeObserver.value.observe(chartContainer.value)
}

// 清理响应式监听
const cleanupResizeObserver = () => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
    resizeObserver.value = null
  }
}

// 暴露方法给父组件
const getChartInstance = () => chartInstance.value

const resize = () => {
  resizeChart()
}

const getDataURL = (options?: { type?: 'svg' | 'png' | 'jpeg'; pixelRatio?: number; backgroundColor?: string; excludeComponents?: string[] }) => {
  return chartInstance.value?.getDataURL(options)
}

const getConnectedDataURL = (options?: { type?: 'svg' | 'png' | 'jpeg'; pixelRatio?: number; backgroundColor?: string; connectedBackgroundColor?: string; excludeComponents?: string[] }) => {
  return chartInstance.value?.getConnectedDataURL(options)
}

// 暴露方法
defineExpose({
  getChartInstance,
  resize,
  getDataURL,
  getConnectedDataURL,
  retry
})

// 生命周期
onMounted(() => {
  nextTick(() => {
    initChart()
    setupResizeObserver()
  })
})

onBeforeUnmount(() => {
  cleanupResizeObserver()
  if (chartInstance.value) {
    chartInstance.value.dispose()
    chartInstance.value = null
  }
})
</script>

<style lang="scss" scoped>
.echarts-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;

  &.loading {
    pointer-events: none;
  }

  &.error {
    border: 1px dashed #f56c6c;
    border-radius: 4px;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(2px);
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #606266;
  font-size: 14px;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  text-align: center;
}

.error-icon {
  font-size: 32px;
  color: #f56c6c;
}

.error-text {
  color: #606266;
  font-size: 14px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// 响应式设计
@media (max-width: 768px) {
  .loading-spinner {
    gap: 8px;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border-width: 2px;
  }

  .loading-text,
  .error-text {
    font-size: 12px;
  }

  .error-icon {
    font-size: 24px;
  }
}
</style>
