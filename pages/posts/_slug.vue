<template>
  <article>
    <h1
      class="text-4xl font-bold leading-tight mb-4 md:text-5xl md:leading-snug md:mb-6"
    >
      {{ post.title }}
    </h1>
    <div class="mb-10 md:mb-14">
      <span class="text-gray-600 mr-3">{{ post.published_at | date }}</span>
      <span
        v-for="tag in post.tags"
        :key="tag.id"
        class="bg-gray-200 rounded px-2 py-1 mr-1"
        >{{ tag.name }}</span
      >
    </div>
    <div
      class="max-w-full prose prose-lg xl:prose-2xl"
      v-html="parsedContent"
    ></div>
  </article>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const { data } = await $axios.$get(
      `${process.env.API_BASE_URL}/api/posts/${params.slug}`
    )
    return { post: data }
  },
  head() {
    const siteName = process.env.APP_NAME
    const title = `${this.post.title} - ${siteName}`
    const description = this.post.excerpt.substring(0, 155)
    const pageUrl = `${process.env.BASE_URL}${this.$route.path}`

    const ogImage = this.post.featured_image
      ? this.post.featured_image.url
      : process.env.DEFAULT_OG_IMAGE

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@avosalmon',
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@avosalmon',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: ogImage,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: siteName,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: pageUrl,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: ogImage,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: title,
        },
      ],
    }
  },
  computed: {
    parsedContent() {
      return this.$md.render(this.post.content)
    },
  },
}
</script>
