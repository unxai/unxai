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
    </div>
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text mb-8">梦境画廊</h1>
    <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="category in dreamCategories"
        :key="category.id"
        class="category-card relative group cursor-pointer bg-gradient-to-r from-blue-500/50 to-purple-500/50 border border-white/20 rounded-xl shadow-lg 
               transition-all duration-500 ease-in-out transform 
               hover:shadow-2xl hover:shadow-purple-500/60 hover:scale-102"
        @click="navigateToCategory(category.id)"
      >
        <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden"> {/* Added overflow-hidden here for cleaner image scaling */}
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          {/* The existing dynamic background is fine, group-hover is already handled */}
          <div class="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="absolute left-0 right-0 p-4 z-20 transform translate-y-0"> {/* Content part */}
          <h3 class="text-2xl font-bold text-white mb-2">{{ category.name }}</h3>
          <p class="text-gray-200 mb-4 line-clamp-2">{{ category.description }}</p> {/* Added line-clamp for consistency */}
          <div class="flex items-center text-white">
            <span class="mr-2">{{ category.dreamCount }}个梦境</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCategories } from '../mockData.js';

export default {
  name: 'DreamGallery',
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref(null);
    const dreamCategories = ref([]);

    const hasError = computed(() => error.value !== null);

    const isDataEmpty = computed(() => {
      return !loading.value && !error.value && dreamCategories.value.length === 0;
    });

    const fetchData = async () => {
      loading.value = true;
      error.value = null;
      try {
        // Simulate network delay (optional)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        dreamCategories.value = getCategories();

        if (!dreamCategories.value) {
            dreamCategories.value = [];
            console.warn("getCategories returned undefined or null, setting to empty array.");
        }

      } catch (err) {
        error.value = '获取数据失败，请稍后重试。';
        console.error('Error fetching data:', err);
        dreamCategories.value = []; // Ensure it's an empty array on error
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    const navigateToCategory = (id) => {
      // Route /dreams/category/:id does not exist in router/index.js
      // So, we log to console instead of navigating.
      console.log(`Navigation to category ID ${id} would occur here if the route existed.`);
      // If the route existed, it would be:
      // router.push(`/dreams/category/${id}`);
    };

    return {
      loading,
      error,
      dreamCategories,
      hasError,
      isDataEmpty,
      fetchData, // Expose for retry button
      navigateToCategory
    };
  }
}
</script>