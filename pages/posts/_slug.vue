<template>
  <article>
    <h1 class="text-4xl md:text-5xl font-semibold leading-tight mb-4">
      {{ post.title }}
    </h1>
    <div class="mb-10">
      <span class="text-gray-600 mr-3">{{ post.published_at }}</span>
      <span
        v-for="tag in post.tags"
        :key="tag.id"
        class="bg-gray-300 rounded px-2 py-1 mr-1"
        >{{ tag.name }}</span
      >
    </div>
    <div class="prose lg:prose-lg" v-html="parsedContent"></div>
  </article>
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const { data } = await $http.$get(`/api/posts/${params.slug}`)
    return { post: data }
  },
  computed: {
    parsedContent() {
      return this.$md.render(this.post.content)
    },
  },
}
</script>
