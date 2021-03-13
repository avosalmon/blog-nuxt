<template>
  <div>
    <article
      v-for="post in posts"
      :key="post.id"
      class="mb-10 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
    >
      <NuxtLink class="flex flex-col md:flex-row" :to="`/posts/${post.slug}`">
        <img
          class="object-cover mb-2 md:h-48 md:w-48 md:mr-10 md:mb-0"
          :src="post.featured_image ? post.featured_image.url : ''"
          :alt="post.title"
        />
        <div>
          <h1 class="text-2xl font-semibold leading-tight mb-2">
            {{ post.title }}
          </h1>
          <p class="text-gray-600 mb-4">{{ post.published_at | date }}</p>
          <p class="leading-relaxed hidden md:block">{{ post.excerpt }}</p>
        </div>
      </NuxtLink>
    </article>
    <nav>
      <ul class="flex justify-between">
        <li v-if="!isFirstPage">
          <NuxtLink :to="`/posts/page/${previousPage}`" class="underline"
            >« Previous</NuxtLink
          >
        </li>
        <li v-if="!isLastPage">
          <NuxtLink :to="`/posts/page/${nextPage}`" class="underline"
            >Next »</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const params = {
      sort: 'published_at',
      direction: 'desc',
      status: 'published',
    }
    const {
      data,
      meta,
    } = await $axios.$get(`${process.env.API_BASE_URL}/api/posts`, { params })
    return { posts: data, meta }
  },
  computed: {
    isFirstPage() {
      return this.meta.current_page === 1
    },
    isLastPage() {
      return this.meta.current_page === this.meta.last_page
    },
    previousPage() {
      return this.meta.current_page - 1
    },
    nextPage() {
      return this.meta.current_page + 1
    },
  },
}
</script>
