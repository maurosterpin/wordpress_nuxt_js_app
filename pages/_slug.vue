<template>
  <div class="container">
    <h1 class="text-center">{{ post.title }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <article class="py-5" v-html="post.content"></article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    post() {
      return {
        title: 'Test Post',
        slug: 'test-post',
        content: '<p>This is a test post</p>',
        excerpt: '<p>This is a test post</p>',
      }
    },
  },
})
</script>
