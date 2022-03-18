<template>
  <div class="container">
    <h1 class="text-center">{{ post.title }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <article class="py-5" v-html="post.content"></article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PostsState } from '~/store/posts'
export default Vue.extend({
  computed: {
    post() {
      return (this.$store.state.posts as PostsState).post
    },
  },
  async asyncData({ store, params }) {
    await store.dispatch('posts/getPost', params.slug)
  },
})
</script>
