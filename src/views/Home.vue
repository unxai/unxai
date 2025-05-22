<template>
  <div class="min-h-screen text-white py-8">
    <div class="container mx-auto px-4">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="hasError" class="text-center py-12">
        <div class="text-red-400 mb-4">{{ error }}</div>
        <button @click="fetchData" class="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
          重试
        </button>
      </div>

      <!-- 空数据提示 -->
      <div v-else-if="isDataEmpty" class="text-center py-12">
        <p class="text-gray-400 mb-4">暂无数据</p>
      </div>
      <!-- 欢迎区域 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text mb-4">
          梦境记录仪
        </h1>
        <p class="text-gray-400 text-lg">记录、分析和探索你的梦境世界</p>
      </div>

      <!-- 统计卡片区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="stat-card transform hover:scale-105 transition-all duration-300 border border-blue-500 rounded-lg shadow-xl p-6">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="text-xl font-semibold">总记录</h3>
            <p class="text-3xl font-bold text-blue-400">{{ stats.totalDreams }}</p>
            <p class="text-sm text-gray-400 mt-2">较上月增长 12%</p>
          </div>
        </div>

        <div class="stat-card transform hover:scale-105 transition-all duration-300 border border-blue-500 rounded-lg shadow-xl p-6">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="text-xl font-semibold">本月记录</h3>
            <p class="text-3xl font-bold text-purple-400">{{ stats.monthlyDreams }}</p>
            <router-link to="/analysis" class="text-sm text-gray-400 mt-2 hover:text-gray-300">查看详细分析 →</router-link>
          </div>
        </div>
      </div>

      <!-- 最新梦境展示 -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-8 flex items-center">
          <span class="mr-4">最新梦境</span>
          <div class="h-px flex-grow bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="dream in latestDreams" :key="dream.id" class="dream-card p-6 cursor-pointer transform transition-all duration-300 hover:scale-102 border-2 border-blue-500 rounded-lg shadow-xl hover:shadow-2xl">
            <h3 class="text-xl font-semibold mb-2">{{ dream.title }}</h3>
            <p class="text-gray-400 mb-4">{{ dream.date }}</p>
            <p class="text-gray-300 line-clamp-3">{{ dream.content }}</p>
            <div class="flex justify-end mt-4">
              <router-link :to="`/dreams/${dream.id}`" class="text-blue-400 hover:text-blue-300 transition-colors">
                查看详情
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门分类推荐 -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-8 flex items-center">
          <span class="mr-4">热门分类</span>
          <div class="h-px flex-grow bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="category in popularCategories" :key="category.id" class="dream-card p-6 cursor-pointer transform transition-all duration-300 hover:scale-102 border-2 border-blue-500 rounded-lg shadow-xl hover:shadow-2xl">
            <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
            <p class="text-gray-400 mb-4">{{ category.description }}</p>
            <p class="text-gray-300 line-clamp-3">{{ category.details }}</p>
            <div class="flex justify-end mt-4">
              <router-link :to="`/categories/${category.id}`" class="text-blue-400 hover:text-blue-300 transition-colors">
                查看详情
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 最近记录区域 -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-8 flex items-center">
          <span class="mr-4">最近记录</span>
          <div class="h-px flex-grow bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="dream in recentDreams" :key="dream.id" class="dream-card p-6 cursor-pointer transform transition-all duration-300 hover:scale-102 border-2 border-blue-500 rounded-lg shadow-xl hover:shadow-2xl">
            <h3 class="text-xl font-semibold mb-2">{{ dream.title }}</h3>
            <p class="text-gray-400 mb-4">{{ dream.date }}</p>
            <p class="text-gray-300 line-clamp-3">{{ dream.content }}</p>
            <div class="flex justify-end mt-4">
              <router-link :to="`/dreams/${dream.id}`" class="text-blue-400 hover:text-blue-300 transition-colors">
                查看详情
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速操作区域 -->
      <div class="text-center">
        <router-link to="/dreams/new" class="quick-action-btn transform hover:scale-105 transition-all duration-300">
          记录新梦境
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getAllDreams, getCategories } from '../mockData.js'; // Correct path

export default {
  name: 'Home',
  setup() {
    const loading = ref(false);
    const error = ref(null);
    const allDataLoaded = ref(false); // To track if initial data load is complete

    const stats = ref({
      totalDreams: 0,
      monthlyDreams: 0,
      // Keeping these as placeholders, primary goal is totalDreams and monthlyDreams
      sentiment: 85, // Placeholder
      activityScore: 92, // Placeholder
      emotionDistribution: [ // Placeholder
        { name: '喜悦', percentage: 35, color: 'bg-yellow-400/50' },
        { name: '平静', percentage: 25, color: 'bg-blue-400/50' },
        { name: '焦虑', percentage: 20, color: 'bg-purple-400/50' },
        { name: '困惑', percentage: 15, color: 'bg-pink-400/50' },
        { name: '其他', percentage: 5, color: 'bg-gray-400/50' }
      ],
      weeklyTrend: [ // Placeholder
        { date: '2024-01-10', count: 3, label: '一' },
        { date: '2024-01-11', count: 5, label: '二' },
        { date: '2024-01-12', count: 4, label: '三' },
        { date: '2024-01-13', count: 6, label: '四' },
        { date: '2024-01-14', count: 8, label: '五' },
        { date: '2024-01-15', count: 7, label: '六' },
        { date: '2024-01-16', count: 4, label: '日' }
      ]
    });

    const recentDreams = ref([]);
    const latestDreams = ref([]);
    const popularCategories = ref([]);

    const hasError = computed(() => error.value !== null);

    const isDataEmpty = computed(() => {
      return !loading.value && allDataLoaded.value && recentDreams.value.length === 0 && popularCategories.value.length === 0;
    });

    const fetchData = async () => {
      loading.value = true;
      error.value = null;
      allDataLoaded.value = false;
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500)); // Reduced delay

        const dreams = getAllDreams();
        const categories = getCategories();

        // Calculate total dreams
        stats.value.totalDreams = dreams.length;

        // Calculate monthly dreams
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0-indexed

        stats.value.monthlyDreams = dreams.filter(dream => {
          const dreamDate = new Date(dream.date);
          return dreamDate.getFullYear() === currentYear && dreamDate.getMonth() === currentMonth;
        }).length;

        // Populate latest/recent dreams (top 3-4 most recent)
        const sortedDreams = [...dreams].sort((a, b) => new Date(b.date) - new Date(a.date));
        latestDreams.value = sortedDreams.slice(0, 4); // Show 4 latest dreams
        recentDreams.value = sortedDreams.slice(0, 4); // Can be the same or different logic if needed

        // Populate popular categories
        // The mockCategories from mockData.js has: id, name, description, image, dreamCount
        // The template uses category.description and category.details
        // We will use category.description for both if details is not present.
        popularCategories.value = categories.map(category => ({
          ...category,
          details: category.description // Using description as details
        })).slice(0, 4); // Show 4 popular categories

        allDataLoaded.value = true;
      } catch (err) {
        error.value = '获取数据失败，请稍后重试';
        console.error('Error fetching data:', err);
        // Ensure refs are in a consistent empty state on error
        stats.value.totalDreams = 0;
        stats.value.monthlyDreams = 0;
        latestDreams.value = [];
        recentDreams.value = [];
        popularCategories.value = [];
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      loading,
      error,
      hasError,
      isDataEmpty,
      stats,
      recentDreams,
      latestDreams,
      popularCategories,
      fetchData // Expose fetchData for retry button
    };
  }
}
</script>