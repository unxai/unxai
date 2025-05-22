<template>
  <div class="min-h-screen text-white py-8">
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
                    :style="{ width: `${totalDreams > 0 ? (count / totalDreams) * 100 : 0}%` }"
                  ></div>
                </div>
              </div>
              <span class="ml-2 text-white/70">{{ count }}</span>
            </div>
          </div>
        </div>

      <!-- 情感分析 -->
      <div class="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
        <h2 class="text-xl font-semibold text-white/90 mb-4">情感倾向 (示例)</h2>
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
      <div class="md:col-span-2 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
        <h2 class="text-xl font-semibold text-white/90 mb-4">梦境频率趋势</h2>
        <div class="h-64 flex items-end space-x-2 overflow-x-auto pb-4">
          <div
            v-for="(count, month) in monthlyTrends"
            :key="month"
            class="min-w-[3rem] flex-1 bg-gradient-to-t from-blue-500/50 to-purple-500/50 rounded-t transition-all duration-500 relative group"
            :style="{ height: `${maxMonthlyCount > 0 ? (count / maxMonthlyCount) * 100 : 0}%` }"
          >
            <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
              {{ count }}
            </div>
            <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 whitespace-nowrap">
              {{ month }}
            </div>
          </div>
        </div>
      </div>

      <!-- 常见主题 -->
      <div class="md:col-span-2 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
        <h2 class="text-xl font-semibold text-white/90 mb-4">常见主题</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="(count, theme) in commonThemes"
            :key="theme"
            class="px-4 py-2 bg-white/10 text-white/80 rounded-full border border-white/20 hover:scale-105 transition-all duration-300 cursor-default"
            :style="{ fontSize: `${Math.min(count, 5) * 0.4 + 0.8}rem` }" 
          >
            {{ theme }} ({{count}})
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getAllDreams } from '../mockData.js';

export default {
  name: 'DreamAnalysis',
  setup() {
    const loading = ref(false);
    const error = ref(null);
    const allDreamsData = ref([]); // Store all dreams

    const dreamTypes = ref({});
    const emotions = ref({}); // Simplified static data
    const monthlyTrends = ref({});
    const commonThemes = ref({});

    const totalDreams = computed(() => allDreamsData.value.length);

    const maxMonthlyCount = computed(() => {
      const counts = Object.values(monthlyTrends.value);
      return counts.length > 0 ? Math.max(...counts) : 0;
    });

    const hasError = computed(() => error.value !== null);

    const isDataEmpty = computed(() => {
      return !loading.value && !error.value && totalDreams.value === 0;
    });

    const fetchAnalysisData = async () => {
      loading.value = true;
      error.value = null;
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const dreams = getAllDreams();
        allDreamsData.value = dreams;
        const numDreams = dreams.length;

        // Process Monthly Trends
        const monthCounts = {};
        const monthOrder = [];
        dreams.forEach(dream => {
          try {
            const date = new Date(dream.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 1-indexed month
            const monthKey = `${year}-${String(month).padStart(2, '0')}`; // e.g., "2023-01"
            
            if (!monthCounts[monthKey]) {
              monthCounts[monthKey] = 0;
            }
            monthCounts[monthKey]++;
          } catch (e) {
            console.warn(`Invalid date format for dream ID ${dream.id}: ${dream.date}`);
          }
        });

        // Sort monthKeys to ensure chronological order and format for display
        const sortedMonthKeys = Object.keys(monthCounts).sort();
        const formattedMonthTrends = {};
        sortedMonthKeys.forEach(key => {
            const [year, monthNum] = key.split('-');
            formattedMonthTrends[`${parseInt(monthNum, 10)}月`] = monthCounts[key];
        });
        monthlyTrends.value = formattedMonthTrends;


        // Process Common Themes
        const tagFrequency = {};
        dreams.forEach(dream => {
          if (dream.tags && Array.isArray(dream.tags)) {
            dream.tags.forEach(tag => {
              const normalizedTag = tag.toLowerCase().trim();
              if (normalizedTag) {
                tagFrequency[normalizedTag] = (tagFrequency[normalizedTag] || 0) + 1;
              }
            });
          }
        });
        const sortedTags = Object.entries(tagFrequency)
          .sort(([, aCount], [, bCount]) => bCount - aCount)
          .slice(0, 10); // Get top 10 common themes
        
        commonThemes.value = Object.fromEntries(sortedTags);


        // Simplified Dream Types (distribution based on total dreams)
        if (numDreams > 0) {
            dreamTypes.value = {
            '日常梦': Math.round(numDreams * 0.5),
            '奇幻梦': Math.round(numDreams * 0.25),
            '重复梦': Math.round(numDreams * 0.15),
            '其他': numDreams - (Math.round(numDreams * 0.5) + Math.round(numDreams * 0.25) + Math.round(numDreams * 0.15)),
            };
        } else {
            dreamTypes.value = {};
        }


        // Simplified Emotions (static percentages)
        emotions.value = {
          '快乐': 35,
          '平静': 25,
          '焦虑': 20,
          '困惑': 15,
          '其他': 5
        };

      } catch (err) {
        error.value = '获取分析数据失败，请稍后重试。';
        console.error('Error fetching analysis data:', err);
        // Reset data on error
        allDreamsData.value = [];
        monthlyTrends.value = {};
        commonThemes.value = {};
        dreamTypes.value = {};
        emotions.value = {};

      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchAnalysisData();
    });

    return {
      loading,
      error,
      hasError,
      isDataEmpty,
      dreamTypes,
      emotions,
      monthlyTrends,
      commonThemes,
      totalDreams,
      maxMonthlyCount,
      fetchAnalysisData // Expose for retry button
    };
  }
}
</script>