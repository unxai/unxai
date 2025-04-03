<template>
  <div
    @click="$emit('click')"
    class="dream-card p-6 cursor-pointer transform transition-all duration-300 hover:scale-102 border-2 border-blue-500 rounded-lg shadow-xl hover:shadow-2xl  bg-white/10"
  >
    <div class="flex justify-between items-start">
      <h2 class="text-xl font-semibold text-gray-800">{{ dream.title }}</h2>
      <span class="text-sm text-gray-500">{{ dream.date }}</span>
    </div>
    <p class="mt-3 text-gray-600 line-clamp-2">{{ dream.content }}</p>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="tag in dream.tags"
        :key="tag"
        class="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dream',
  props: {
    dream: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          value.hasOwnProperty('id') &&
          value.hasOwnProperty('title') &&
          value.hasOwnProperty('content') &&
          value.hasOwnProperty('date') &&
          value.hasOwnProperty('tags')
        )
      }
    }
  },
  emits: ['click']
}
</script>