<template>
  <nav class="bg-gray-900/50 backdrop-blur-lg border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16">
        <!-- 将 logo 放在最左侧 -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="hover:scale-105 transition-transform duration-300">
            <h1 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text">Dreams</h1>
          </router-link>
        </div>
        <!-- 其他导航项保持居中 -->
        <div class="flex-grow flex justify-center items-center">
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              to="/dreams"
              class="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:text-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300 ease-in-out after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
              :class="{'active-link': $route.path.startsWith('/dreams')}"
            >
              梦境列表
            </router-link>
            <router-link
              to="/analysis"
              class="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:text-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300 ease-in-out after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
              :class="{'active-link': $route.path === '/analysis'}"
            >
              数据分析
            </router-link>
            <router-link
              to="/gallery"
              class="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:text-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300 ease-in-out after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out"
              :class="{'active-link': $route.path === '/gallery'}"
            >
              梦境画廊
            </router-link>
          </div>
        </div>
        <!-- 移动端菜单按钮保持在右侧 -->
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="isOpen = !isOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                v-if="!isOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div
      class="sm:hidden"
      id="mobile-menu"
      v-show="isOpen"
    >
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/dreams"
          class="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-blue-500/10 hover:border-l-blue-400 border-l-2 border-transparent transition-all duration-300 ease-in-out"
          :class="{'active-mobile-link': $route.path.startsWith('/dreams')}"
          @click="isOpen = false"
        >
          梦境列表
        </router-link>
        <router-link
          to="/analysis"
          class="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-blue-500/10 hover:border-l-blue-400 border-l-2 border-transparent transition-all duration-300 ease-in-out"
          :class="{'active-mobile-link': $route.path === '/analysis'}"
          @click="isOpen = false"
        >
          数据分析
        </router-link>
        <router-link
          to="/gallery"
          class="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-blue-500/10 hover:border-l-blue-400 border-l-2 border-transparent transition-all duration-300 ease-in-out"
          :class="{'active-mobile-link': $route.path === '/gallery'}"
          @click="isOpen = false"
        >
          梦境画廊
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      isOpen: false
    }
  }
}
</script>