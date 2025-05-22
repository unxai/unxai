<template>
  <div class="min-h-screen text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text">梦境列表</h1>
        <router-link
          to="/dreams/new"
          class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          记录新梦境
        </router-link>
      </div>

      <!-- Search Bar -->
      <div class="mb-8">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="通过标题或内容搜索梦境..."
          class="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 shadow-inner"
        />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="text-center py-12">
        <div class="text-red-400 mb-4">{{ error }}</div>
        <button @click="fetchData" class="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
          重试
        </button>
      </div>

      <!-- Data Display or Empty State for Filtered List -->
      <div v-else>
        <div v-if="filteredDreams.length > 0" class="space-y-4">
          <Dream
            v-for="dream in filteredDreams"
            :key="dream.id"
            :dream="dream"
            @click="viewDream(dream.id)"
          />
        </div>
        <!-- Empty Data / No Search Results Message -->
        <div v-else class="text-center py-12">
          <p class="text-gray-400 mb-4">{{ searchQuery ? '没有找到匹配的梦境。' : '暂无梦境记录。' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Dream from '@/components/Dream.vue';
import { getAllDreams } from '../mockData.js';

export default {
  name: 'DreamList',
  components: {
    Dream
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref(null);
    const allDreams = ref([]); // Stores all dreams fetched
    const searchQuery = ref('');

    const hasError = computed(() => error.value !== null);

    const fetchData = async () => {
      loading.value = true;
      error.value = null;
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); 
        const dreamsData = getAllDreams();
        allDreams.value = dreamsData || []; // Ensure it's always an array
      } catch (err) {
        error.value = '获取数据失败，请稍后重试';
        console.error('Error fetching data:', err);
        allDreams.value = []; 
      } finally {
        loading.value = false;
      }
    };

    const filteredDreams = computed(() => {
      if (!searchQuery.value) {
        return allDreams.value;
      }
      const lowerCaseQuery = searchQuery.value.toLowerCase().trim();
      if (!lowerCaseQuery) return allDreams.value; // if query is only spaces

      return allDreams.value.filter(dream => {
        const titleMatch = dream.title && dream.title.toLowerCase().includes(lowerCaseQuery);
        const contentMatch = dream.content && dream.content.toLowerCase().includes(lowerCaseQuery);
        // Optionally, add tag search:
        // const tagsMatch = dream.tags && dream.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        return titleMatch || contentMatch; // || tagsMatch;
      });
    });
    
    // This computed property is for the v-else-if="isDataEmpty" condition in the template
    // It indicates if there's genuinely no data to show, considering loading/error states
    // The template has been updated to directly use filteredDreams.length for showing "no results"
    // So, this specific isDataEmpty computed might be less critical if the template handles all cases.
    // However, for a general "no data available at all" before search, it can be:
    const isDataEmpty = computed(() => {
      return !loading.value && !error.value && allDreams.value.length === 0 && !searchQuery.value;
    });


    const viewDream = (id) => {
      router.push(`/dreams/${id}`);
    };

    onMounted(() => {
      fetchData(); 
    });

    return {
      loading,
      error,
      hasError,
      // allDreams, // No longer directly needed by template, filteredDreams is used
      searchQuery,
      filteredDreams,
      isDataEmpty, // Still useful for the initial "no data" state if desired
      fetchData, 
      viewDream
    };
  }
}
</script>