<template>
   <div class="home-dashboard">
      <!-- 顶部数据卡片 -->
      <div class="stats-cards">
         <div class="stat-card" v-for="(stat, index) in statsData" :key="index">
            <div class="card-content">
               <div class="card-icon">
                  <el-icon :size="32">
                     <component :is="stat.icon" />
                  </el-icon>
               </div>
               <div class="card-info">
                  <div class="card-title">{{ stat.title }}</div>
                  <div class="card-value">{{ stat.value }}</div>
                  <div class="card-trend" :class="stat.trend">
                     <el-icon>
                        <component :is="stat.trendIcon" />
                     </el-icon>
                     <span>{{ stat.trendValue }}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- 中间图表区域 -->
      <div class="charts-section">
         <div class="chart-card">
            <div class="chart-header">
               <h3>用户分布</h3>
               <el-tag type="primary" size="small">实时数据</el-tag>
            </div>
            <EChartsWrapper :option="pieChartOption" height="300px" />
         </div>

         <div class="chart-card">
            <div class="chart-header">
               <h3>系统架构</h3>
               <el-tag type="success" size="small">层级结构</el-tag>
            </div>
            <EChartsWrapper :option="treeChartOption" height="300px" />
         </div>
      </div>

      <!-- 底部图表区域 -->
      <div class="bottom-charts">
         <div class="chart-card">
            <div class="chart-header">
               <h3>用户提交趋势</h3>
               <el-tag type="warning" size="small">7天趋势</el-tag>
            </div>
            <EChartsWrapper :option="lineChartOption" height="250px" />
         </div>

         <div class="chart-card">
            <div class="chart-header">
               <h3>用户正确率</h3>
               <el-tag type="info" size="small">月度统计</el-tag>
            </div>
            <EChartsWrapper :option="barChartOption" height="250px" />
         </div>

         <div class="chart-card">
            <div class="chart-header">
               <h3>用户活跃时间</h3>
               <el-tag type="danger" size="small">热力图</el-tag>
            </div>
            <EChartsWrapper :option="heatmapChartOption" height="250px" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { ElIcon, ElTag } from 'element-plus';
import { User, Calendar, DataAnalysis, Document, TrendCharts } from '@element-plus/icons-vue';
const EChartsWrapper = defineAsyncComponent(() => import('@/components/EChartsWrapper.vue'));

// 统计数据
const statsData = ref([
   {
      title: '日活跃数',
      value: '12,847',
      trend: 'up',
      trendValue: '+12.5%',
      trendIcon: 'TrendCharts',
      icon: 'User'
   },
   {
      title: '周活跃数',
      value: '89,234',
      trend: 'up',
      trendValue: '+8.3%',
      trendIcon: 'TrendCharts',
      icon: 'Calendar'
   },
   {
      title: '月活跃数',
      value: '342,156',
      trend: 'up',
      trendValue: '+15.7%',
      trendIcon: 'TrendCharts',
      icon: 'DataAnalysis'
   },
   {
      title: '题目提交数',
      value: '56,789',
      trend: 'up',
      trendValue: '+23.1%',
      trendIcon: 'TrendCharts',
      icon: 'Document'
   }
]);

// 饼图配置
const pieChartOption = ref({
   tooltip: { trigger: 'item' },
   legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { color: '#fff' }
   },
   series: [
      {
         name: '用户类型',
         type: 'pie',
         radius: ['40%', '70%'],
         center: ['60%', '50%'],
         data: [
            { value: 1048, name: '普通用户', itemStyle: { color: '#409eff' } },
            { value: 735, name: 'VIP用户', itemStyle: { color: '#67c23a' } },
            { value: 580, name: '管理员', itemStyle: { color: '#e6a23c' } },
            { value: 484, name: '开发者', itemStyle: { color: '#f56c6c' } }
         ]
      }
   ]
});

// 树图配置
const treeChartOption = ref({
   tooltip: { trigger: 'item' },
   series: [
      {
         type: 'tree',
         data: [
            {
               name: 'LOGIN管理系统',
               children: [
                  {
                     name: '用户管理',
                     children: [
                        { name: '用户列表', value: 1200 },
                        { name: '权限管理', value: 800 }
                     ]
                  },
                  {
                     name: '内容管理',
                     children: [
                        { name: '题目管理', value: 1500 },
                        { name: '分类管理', value: 400 }
                     ]
                  }
               ]
            }
         ],
         top: '5%',
         left: '7%',
         bottom: '2%',
         right: '20%',
         symbolSize: 7,
         orient: 'vertical',
         label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 12,
            color: '#fff'
         },
         lineStyle: { color: '#409eff', width: 2 }
      }
   ]
});

// 折线图配置
const lineChartOption = ref({
   tooltip: { trigger: 'axis' },
   legend: {
      data: ['提交数', '正确数'],
      textStyle: { color: '#fff' }
   },
   grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
   },
   xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: { color: '#fff' }
   },
   yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' }
   },
   series: [
      {
         name: '提交数',
         type: 'line',
         data: [120, 132, 101, 134, 90, 230, 210],
         smooth: true,
         lineStyle: { color: '#409eff', width: 3 }
      },
      {
         name: '正确数',
         type: 'line',
         data: [220, 182, 191, 234, 290, 330, 310],
         smooth: true,
         lineStyle: { color: '#67c23a', width: 3 }
      }
   ]
});

// 柱状图配置
const barChartOption = ref({
   tooltip: { trigger: 'axis' },
   legend: {
      data: ['正确率'],
      textStyle: { color: '#fff' }
   },
   grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
   },
   xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLabel: { color: '#fff' }
   },
   yAxis: {
      type: 'value',
      axisLabel: { color: '#fff', formatter: '{value}%' }
   },
   series: [
      {
         name: '正确率',
         type: 'bar',
         data: [85, 88, 92, 89, 95, 91],
         itemStyle: { color: '#409eff' }
      }
   ]
});

// 热力图配置
const heatmapChartOption = ref({
   tooltip: { position: 'top' },
   grid: { height: '50%', top: '10%' },
   xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      axisLabel: { color: '#fff' }
   },
   yAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: { color: '#fff' }
   },
   visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      textStyle: { color: '#fff' }
   },
   series: [
      {
         name: '活跃度',
         type: 'heatmap',
         data: [
            [0, 0, 5],
            [0, 1, 7],
            [0, 2, 3],
            [0, 3, 5],
            [0, 4, 2],
            [0, 5, 6],
            [0, 6, 8],
            [1, 0, 3],
            [1, 1, 2],
            [1, 2, 4],
            [1, 3, 8],
            [1, 4, 6],
            [1, 5, 9],
            [1, 6, 7],
            [2, 0, 1],
            [2, 1, 3],
            [2, 2, 5],
            [2, 3, 9],
            [2, 4, 8],
            [2, 5, 7],
            [2, 6, 4],
            [3, 0, 4],
            [3, 1, 6],
            [3, 2, 8],
            [3, 3, 10],
            [3, 4, 9],
            [3, 5, 5],
            [3, 6, 3],
            [4, 0, 6],
            [4, 1, 8],
            [4, 2, 9],
            [4, 3, 7],
            [4, 4, 5],
            [4, 5, 4],
            [4, 6, 2],
            [5, 0, 8],
            [5, 1, 9],
            [5, 2, 7],
            [5, 3, 6],
            [5, 4, 4],
            [5, 5, 3],
            [5, 6, 1],
            [6, 0, 9],
            [6, 1, 7],
            [6, 2, 5],
            [6, 3, 4],
            [6, 4, 3],
            [6, 5, 2],
            [6, 6, 1]
         ],
         label: { show: true, color: '#fff' }
      }
   ]
});
</script>

<style lang="scss" scoped>
.home-dashboard {
   position: relative;
   padding: 20px;
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
         radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
         radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
         radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
      pointer-events: none;
   }

   &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
         radial-gradient(circle at 60% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
         radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      pointer-events: none;
   }
}

.stats-cards {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
   gap: 20px;
   margin-bottom: 30px;
   position: relative;
   z-index: 1;
}

.stat-card {
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(20px);
   border-radius: 20px;
   padding: 25px;
   border: 1px solid rgba(255, 255, 255, 0.2);
   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
   transition: all 0.3s ease;
   position: relative;
   overflow: hidden;

   &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      border-color: rgba(255, 255, 255, 0.4);
   }
}

.card-content {
   display: flex;
   align-items: center;
   gap: 20px;
}

.card-icon {
   width: 60px;
   height: 60px;
   border-radius: 15px;
   background: rgba(255, 255, 255, 0.2);
   display: flex;
   align-items: center;
   justify-content: center;
   color: white;
   backdrop-filter: blur(10px);
   border: 1px solid rgba(255, 255, 255, 0.3);
   transition: all 0.3s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
   }
}

.card-info {
   flex: 1;
}

.card-title {
   color: rgba(255, 255, 255, 0.8);
   font-size: 14px;
   margin-bottom: 8px;
}

.card-value {
   color: white;
   font-size: 28px;
   font-weight: 700;
   margin-bottom: 8px;
   text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.card-trend {
   display: flex;
   align-items: center;
   gap: 4px;
   font-size: 12px;
   font-weight: 500;
   transition: all 0.3s ease;

   &.up {
      color: #67c23a;
   }

   &.down {
      color: #f56c6c;
   }

   &:hover {
      transform: scale(1.05);
   }
}

.charts-section {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
   gap: 20px;
   margin-bottom: 30px;
   position: relative;
   z-index: 1;
}

.bottom-charts {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
   gap: 20px;
   position: relative;
   z-index: 1;
}

.chart-card {
   background: rgba(255, 255, 255, 0.1);
   backdrop-filter: blur(20px);
   border-radius: 20px;
   padding: 25px;
   border: 1px solid rgba(255, 255, 255, 0.2);
   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
   transition: all 0.3s ease;

   &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
   }
}

.chart-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;

   h3 {
      color: white;
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;

      &:hover {
         color: rgba(255, 255, 255, 0.9);
      }
   }
}

@media (max-width: 768px) {
   .home-dashboard {
      padding: 15px;
   }

   .stats-cards {
      grid-template-columns: 1fr;
      gap: 15px;
   }

   .charts-section {
      grid-template-columns: 1fr;
      gap: 15px;
   }

   .bottom-charts {
      grid-template-columns: 1fr;
      gap: 15px;
   }

   .stat-card {
      padding: 20px;
   }

   .chart-card {
      padding: 20px;
   }

   .card-content {
      gap: 15px;
   }

   .card-icon {
      width: 50px;
      height: 50px;
   }

   .card-value {
      font-size: 24px;
   }

   .chart-header h3 {
      font-size: 16px;
   }
}

@media (max-width: 480px) {
   .home-dashboard {
      padding: 10px;
   }

   .stat-card {
      padding: 15px;
   }

   .chart-card {
      padding: 15px;
   }

   .card-content {
      gap: 12px;
   }

   .card-icon {
      width: 45px;
      height: 45px;
   }

   .card-value {
      font-size: 20px;
   }

   .chart-header h3 {
      font-size: 14px;
   }
}
</style>
