<template>
  <div class="min-h-screen  text-white py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text mb-8">梦境分析</h1>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="hasError" class="text-center py-12">
        <div class="text-red-400 mb-4">{{ error }}</div>
        <button @click="fetchAnalysisData" class="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
          重试
        </button>
      </div>

      <!-- 空数据提示 -->
      <div v-else-if="isDataEmpty" class="text-center py-12">
        <p class="text-gray-400 mb-4">暂无分析数据</p>
      </div>

      <!-- 数据展示 -->
      <div v-else class="grid gap-6 md:grid-cols-2">
        <!-- 梦境类型统计 -->
        <div class="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
          <h2 class="text-xl font-semibold text-white/90 mb-4">梦境类型分布</h2>
          <div class="space-y-4">
            <div v-for="(count, type) in dreamTypes" :key="type" class="flex items-center">
              <span class="flex-1 text-white/80">{{ type }}</span>
              <div class="flex-1">
                <div class="bg-gray-700 rounded-full h-2">
                  <div
                    class="bg-gradient-to-r from-blue-400 to-purple-400 rounded-full h-2 transition-all duration-500"
                    :style="{ width: `${(count / totalDreams) * 100}%` }"
                  ></div>
                </div>
              </div>
              <span class="ml-2 text-white/70">{{ count }}</span>
            </div>
          </div>
        </div>

      <!-- 情感分析 -->
      <div class="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
        <h2 class="text-xl font-semibold text-white/90 mb-4">情感分析</h2>
        <div class="space-y-4">
          <div v-for="(value, emotion) in emotions" :key="emotion" class="flex items-center">
            <span class="flex-1 text-white/80">{{ emotion }}</span>
            <div class="flex-1">
              <div class="bg-gray-700 rounded-full h-2">
                <div
                  class="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full h-2 transition-all duration-500"
                  :style="{ width: `${value}%` }"
                ></div>
              </div>
            </div>
            <span class="ml-2 text-white/70">{{ value }}%</span>
          </div>
        </div>
      </div>

      <!-- 时间趋势 -->
      <div class="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
        <h2 class="text-xl font-semibold text-white/90 mb-4">梦境频率趋势</h2>
        <div class="h-64 flex items-end space-x-2">
          <div
            v-for="(count, month) in monthlyTrends"
            :key="month"
            class="flex-1 bg-gradient-to-t from-blue-500/50 to-purple-500/50 rounded-t transition-all duration-500"
            :style="{ height: `${(count / maxMonthlyCount) * 100}%` }"
          >
            <div class="text-xs text-center mt-2 transform -rotate-45 origin-left text-white/70">
              {{ month }}
            </div>
          </div>
        </div>
      </div>

      <!-- 常见主题 -->
      <div class="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
        <h2 class="text-xl font-semibold text-white/90 mb-4">常见主题</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="(size, theme) in commonThemes"
            :key="theme"
            class="px-4 py-2 bg-white/10 text-white/80 rounded-full border border-white/20 hover:scale-105 transition-all duration-300"
            :style="{ fontSize: `${size * 0.5 + 0.8}rem` }"
          >
            {{ theme }}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'DreamAnalysis',
  setup() {
    const loading = ref(false);
    const error = ref(null);
    const dreamTypes = ref({});
    const emotions = ref({});
    const monthlyTrends = ref({});
    const commonThemes = ref({});
    const yearlyData = ref({});

    const totalDreams = computed(() => {
      return Object.values(dreamTypes.value).reduce((sum, count) => sum + count, 0);
    });

    const maxMonthlyCount = computed(() => {
      return Math.max(...Object.values(monthlyTrends.value), 0);
    });

    const hasError = computed(() => {
      return error.value !== null;
    });

    const isDataEmpty = computed(() => {
      return (
        Object.keys(dreamTypes.value).length === 0 &&
        Object.keys(emotions.value).length === 0 &&
        Object.keys(monthlyTrends.value).length === 0 &&
        Object.keys(commonThemes.value).length === 0
      );
    });

    const fetchAnalysisData = async () => {
      loading.value = true;
      error.value = null;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dreamTypes.value = {
          '清醒梦': 15,
          '噩梦': 8,
          '日常梦': 25,
          '预知梦': 5
        };
        emotions.value = {
          '快乐': 45,
          '焦虑': 20,
          '平静': 25,
          '恐惧': 10
        };
        monthlyTrends.value = {
          '1月': 10,
          '2月': 15,
          '3月': 12,
          '4月': 18,
          '5月': 20,
          '6月': 16
        };
        commonThemes.value = {
          '飞行': 3,
          '追逐': 2,
          '考试': 2.5,
          '旅行': 2.8,
          '家人': 2.2,
          '工作': 1.8
        };
      } catch (err) {
        error.value = '获取数据失败，请稍后重试';
        console.error('Error fetching analysis data:', err);
      } finally {
        loading.value = false;
      }
    };

    fetchAnalysisData();

    return {
      loading,
      error,
      dreamTypes,
      emotions,
      monthlyTrends,
      commonThemes,
      yearlyData,
      totalDreams,
      maxMonthlyCount,
      hasError,
      isDataEmpty
    };
  }
}
</script>