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
        class="category-card relative group cursor-pointer bg-gradient-to-r from-blue-500/50 to-purple-500/50 border border-white/20 rounded-xl shadow-lg"
        @click="navigateToCategory(category.id)"
      >
        <div class="aspect-w-16 aspect-h-9 rounded-xl">
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <!-- 新增动态背景 -->
          <div class="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="absolute left-0 right-0 p-4 z-20 transform translate-y-0">
          <h3 class="text-2xl font-bold text-white mb-2">{{ category.name }}</h3>
          <p class="text-gray-200 mb-4">{{ category.description }}</p>
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
import { ref, computed } from 'vue';

export default {
  name: 'DreamGallery',
  setup() {
    const loading = ref(false);
    const error = ref(null);
    const dreamCategories = ref([]);

    const hasError = computed(() => {
      return error.value !== null;
    });

    const isDataEmpty = computed(() => {
      return dreamCategories.value.length === 0;
    });

    const fetchData = async () => {
      loading.value = true;
      error.value = null;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dreamCategories.value = [
          {
            id: 1,
            name: '奇幻梦境',
            description: '充满想象力的奇幻世界',
            image: 'https://picsum.photos/600/400?random=1',
            dreamCount: 15
          },
          {
            id: 2,
            name: '科幻梦境',
            description: '未来科技与宇宙探索',
            image: 'https://picsum.photos/600/400?random=2',
            dreamCount: 12
          },
          {
            id: 3,
            name: '自然梦境',
            description: '大自然的美妙景象',
            image: 'https://picsum.photos/600/400?random=3',
            dreamCount: 18
          }
        ];
      } catch (err) {
        error.value = '获取数据失败，请稍后重试';
        console.error('Error fetching data:', err);
      } finally {
        loading.value = false;
      }
    };

    fetchData();

    const navigateToCategory = (id) => {
      this.$router.push(`/dreams/category/${id}`);
    };

    return {
      loading,
      error,
      dreamCategories,
      hasError,
      isDataEmpty,
      navigateToCategory
    };

  }
}
</script>