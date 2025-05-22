<template>
  <div class="container mx-auto px-4 py-8 text-white">
    <div class="max-w-4xl mx-auto">
      <!-- 主要内容区域 -->
      <div class="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-8 shadow-2xl relative overflow-hidden dream-form mb-8">
        <div class="absolute inset-[-2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_200%] animate-[border-animation_3s_linear_infinite] rounded-xl z-[-1] opacity-50 blur-[20px]"></div>
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text">
            {{ isNewDream ? '记录新梦境' : '梦境详情' }}
          </h1>
          <div class="flex items-center space-x-4" v-if="!isNewDream && dream && dream.date">
            <span class="text-white/70">{{ dream.date }}</span>
            <div class="flex space-x-2 flex-wrap">
              <span v-for="tag in dream.tags" :key="tag" class="mt-1 px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        <form @submit.prevent="saveDream" class="space-y-6">
          <div class="mb-6">
            <label for="title" class="block text-sm font-medium text-white/90">标题</label>
            <input
              type="text"
              id="title"
              v-model="dream.title"
              class="mt-2 block w-full rounded-lg bg-gray-900/50 border border-white/20 text-white placeholder-gray-400 shadow-inner focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 px-4 py-3"
              required
            />
          </div>
          <div>
            <label for="date" class="block text-sm font-medium text-white/90">日期</label>
            <input
              type="date"
              id="date"
              v-model="dream.date"
              class="mt-2 block w-full rounded-lg bg-gray-900/50 border border-white/20 text-white placeholder-gray-400 shadow-inner focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 px-4 py-3"
              required
            />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-white/90">内容</label>
            <textarea
              id="content"
              v-model="dream.content"
              rows="6"
              class="mt-2 block w-full rounded-lg bg-gray-900/50 border border-white/20 text-white placeholder-gray-400 shadow-inner focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 px-4 py-3"
              required
            ></textarea>
          </div>
          <div>
            <label for="tags" class="block text-sm font-medium text-white/90">标签 (逗号分隔)</label>
            <input
              type="text"
              id="tags"
              v-model="tagsInput"
              class="mt-2 block w-full rounded-lg bg-gray-900/50 border border-white/20 text-white placeholder-gray-400 shadow-inner focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 px-4 py-3"
              placeholder="例如: 飞行, 冒险, 朋友"
            />
          </div>
          <div class="flex justify-between items-center mt-8"> <!-- Parent div for button alignment -->
            <div> <!-- Div for the delete button (left-aligned) -->
              <button
                v-if="!isNewDream"
                type="button"
                @click="handleDeleteDream"
                class="px-6 py-2 text-sm font-medium text-white rounded-lg relative overflow-hidden transition-all duration-300 hover:scale-105 bg-gradient-to-r from-red-600 to-pink-600 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                删除
              </button>
            </div>
            <div class="flex space-x-4"> <!-- Div for Cancel and Save buttons (right-aligned) -->
              <button
                type="button"
                @click="router.push('/dreams')"
                class="px-6 py-2 text-sm font-medium text-white bg-gray-800/50 backdrop-blur border border-white/20 rounded-lg hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                取消
              </button>
              <button
                type="submit"
                class="px-6 py-2 text-sm font-medium text-white rounded-lg relative overflow-hidden transition-all duration-300 hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:shadow-xl"
              >
                保存
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- 分析结果区域 (remains hardcoded for now) -->
      <div v-if="!isNewDream && dream && dream.id" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 情感分析 -->
        <div class="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
          <h2 class="text-xl font-semibold mb-4 text-white/90">情感分析</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-white/80">积极程度</span>
              <div class="w-2/3 bg-gray-700 rounded-full h-2">
                <div
                  class="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full transition-all duration-500"
                  :style="{ width: `${dreamAnalysis.positivity}%` }"
                ></div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-white/80">清晰程度</span>
              <div class="w-2/3 bg-gray-700 rounded-full h-2">
                <div
                  class="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                  :style="{ width: `${dreamAnalysis.clarity}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 关键词云 -->
        <div class="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
          <h2 class="text-xl font-semibold mb-4 text-white/90">关键词</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="keyword in dreamAnalysis.keywords"
              :key="keyword.text"
              class="px-3 py-1 rounded-full text-sm"
              :class="getKeywordClass(keyword.weight)"
            >
              {{ keyword.text }}
            </span>
          </div>
        </div>

        <!-- 相关梦境 -->
        <div class="md:col-span-2 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-xl">
          <h2 class="text-xl font-semibold mb-4 text-white/90">相关梦境</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="relatedDreamItem in dreamAnalysis.relatedDreams"
              :key="relatedDreamItem.id"
              class="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
              @click="router.push(`/dreams/${relatedDreamItem.id}`)"
            >
              <div class="flex justify-between items-center mb-2">
                <h3 class="text-lg font-medium text-white/90">{{ relatedDreamItem.title }}</h3>
                <span class="text-sm px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">{{ relatedDreamItem.similarity }}% 相似</span>
              </div>
              <p class="text-sm text-white/70">{{ relatedDreamItem.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDreamById, addDream, updateDream, deleteDream } from '../mockData.js'; // Added deleteDream

export default {
  name: 'DreamDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const dream = ref({});
    const tagsInput = ref('');

    const isNewDream = computed(() => {
      return !route.params.id || route.path === '/dreams/new';
    });

    const fetchDreamData = () => {
      const dreamId = route.params.id;
      if (!isNewDream.value && dreamId) {
        const fetchedDream = getDreamById(dreamId);
        if (fetchedDream) {
          dream.value = { ...fetchedDream }; // Use a copy
          tagsInput.value = fetchedDream.tags ? fetchedDream.tags.join(', ') : '';
        } else {
          console.error(`Dream with ID ${dreamId} not found.`);
          router.push('/dreams'); // Or a dedicated not-found page
        }
      } else {
        // Initialize for a new dream
        dream.value = {
          id: null, // id will be generated by addDream
          title: '',
          date: new Date().toISOString().split('T')[0],
          content: '',
          tags: [],
          // Optional fields from mockData structure, initialize if needed
          emotions: [], 
          clarity: 70 
        };
        tagsInput.value = '';
      }
    };

    const saveDream = () => {
      try {
        // Prepare tags
        const processedTags = tagsInput.value
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== '');
        
        const dreamDataToSave = {
          ...dream.value,
          tags: processedTags,
        };

        if (isNewDream.value) {
          // Remove id if it's null, addDream will generate it
          const { id, ...newDreamData } = dreamDataToSave;
          addDream(newDreamData);
        } else {
          updateDream(dreamDataToSave.id, dreamDataToSave);
        }
        router.push('/dreams');
      } catch (error) {
        console.error('Error saving dream:', error);
        // Optionally, display an error message to the user
      }
    };

    // Hardcoded dreamAnalysis for now
    const dreamAnalysis = ref({
      positivity: 85, // Example value
      clarity: dream.value.clarity || 90, // Use dream's clarity if available
      keywords: [
        { text: '星空', weight: 0.9 },
        { text: '漫游', weight: 0.85 },
        { text: '宇宙', weight: 0.8 },
      ],
      relatedDreams: [
        { id: 2, title: '海底城市', date: '2024-01-14', similarity: 85 },
        { id: 3, title: '森林探险', date: '2024-01-13', similarity: 78 },
      ]
    });

    const getKeywordClass = (weight) => {
      const baseClasses = 'border border-white/20 hover:scale-105 transition-all duration-300';
      if (weight > 0.8) return `${baseClasses} bg-blue-500/30 text-blue-200`;
      if (weight > 0.6) return `${baseClasses} bg-purple-500/30 text-purple-200`;
      return `${baseClasses} bg-pink-500/30 text-pink-200`;
    };

    const handleDeleteDream = async () => {
      if (!dream.value || dream.value.id == null) {
        console.error('No dream selected or dream ID is missing for deletion.');
        alert('无法删除：梦境数据不完整或未选择梦境。'); // User-friendly message in Chinese
        return;
      }
      // Confirmation dialog in Chinese
      if (window.confirm('您确定要删除这个梦境吗？此操作无法撤销。')) { 
        try {
          const success = deleteDream(dream.value.id);
          if (success) {
            alert('梦境已成功删除。'); // Success message in Chinese
            router.push('/dreams');
          } else {
            // This case might happen if the dream was already deleted by another process
            // or if deleteDream returns false for a non-existent ID.
            alert('删除梦境失败。可能该梦境已被删除或不存在。'); // Failure message in Chinese
            router.push('/dreams'); 
          }
        } catch (error) {
          console.error('Error deleting dream:', error);
          alert('删除梦境时发生错误。请查看控制台了解详情。'); // Error message in Chinese
        }
      }
    };

    onMounted(() => {
      fetchDreamData();
    });

    watch(() => route.params.id, (newId, oldId) => {
      // Only refetch if the ID actually changes and we are not in /dreams/new
      if (newId !== oldId || (newId && route.path !== '/dreams/new')) {
         fetchDreamData();
      } else if (!newId && route.path === '/dreams/new' && dream.value.id !== null) {
        // This handles navigating from an existing dream to /dreams/new
        fetchDreamData();
      }
    });
    
    // Watch dream.value.clarity to update dreamAnalysis clarity
    watch(() => dream.value.clarity, (newClarity) => {
        dreamAnalysis.value.clarity = newClarity !== undefined ? newClarity : 70;
    }, { immediate: true });


    return {
      isNewDream,
      dream,
      tagsInput,
      dreamAnalysis,
      saveDream,
      getKeywordClass,
      handleDeleteDream, // Expose delete function
      router // Expose router for template navigation
    };
  }
}
</script>