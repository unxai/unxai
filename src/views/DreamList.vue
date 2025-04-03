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
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text">梦境列表</h1>
      <router-link
        to="/dreams/new"
        class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
      >
        记录新梦境
      </router-link>
    </div>
    <div class="space-y-4 ">
      <Dream
        v-for="dream in dreams"
        :key="dream.id"
        :dream="dream"
        @click="viewDream(dream.id)"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Dream from '@/components/Dream.vue';



export default {
  name: 'DreamList',
  components: {
    Dream
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref(null);
    const dreams = ref([]);

    const hasError = computed(() => {
      return error.value !== null;
    });

    const isDataEmpty = computed(() => {
      return dreams.value.length === 0;
    });

    const fetchData = async () => {
      loading.value = true;
      error.value = null;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dreams.value = [
          {
            id: 1,
            title: '星空漫游',
            date: '2024-01-15',
            content: '我梦见自己在浩瀚的星空中漫游，周围是绚丽的星云和闪烁的星辰。感受着失重的奇妙感觉，仿佛成为了宇宙的一部分。',
            tags: ['太空', '漫游', '星空']
          },
          {
            id: 2,
            title: '海底城市',
            date: '2024-01-14',
            content: '在梦中，我发现了一座建在深海中的未来城市，到处都是发光的建筑和水下花园。透明的穹顶下，海洋生物与人类和谐共处。',
            tags: ['海洋', '城市', '未来']
          },
          {
            id: 3,
            title: '森林探险',
            date: '2024-01-13',
            content: '穿越一片神秘的荧光森林，树木会发出柔和的光芒。遇到了会说话的动物，它们向我讲述着森林的秘密。',
            tags: ['森林', '冒险', '奇幻']
          },
          {
            id: 4,
            title: '时光倒流',
            date: '2024-01-12',
            content: '经历了一场时空旅行，回到了童年时期。重新体验了那些珍贵的记忆，感受到了深深的怀念和感动。',
            tags: ['时空', '回忆', '童年']
          },
          {
            id: 5,
            title: '音乐世界',
            date: '2024-01-11',
            content: '来到一个由音符构成的世界，每个物体都能发出美妙的声音。通过演奏不同的旋律，可以改变周围的环境。',
            tags: ['音乐', '创造', '幻想']
          }
        ];
      } catch (err) {
        error.value = '获取数据失败，请稍后重试';
        console.error('Error fetching data:', err);
      } finally {
        loading.value = false;
      }
    };

    const viewDream = (id) => {
      router.push(`/dreams/${id}`);
    };

    fetchData();

    return {
      loading,
      error,
      dreams,
      hasError,
      isDataEmpty,
      viewDream
    };
  }
}
</script>