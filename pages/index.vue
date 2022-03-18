<template>
  <div class="container">
    <div>
      <h1 class="text-center">Headless WordPress Nuxt</h1>
      <div class="container py-4">
        <div class="row">
          <post-card v-for="post in posts" :key="post.slug" :post="post" />
          <div class="d-flex w-100">
            <div v-if="pageInfo.hasNextPage" class="ml-auto">
              <NuxtLink :to="{ query: { after: pageInfo.endCursor } }"
                ><span>Next Page</span></NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PostsState } from '~/store/posts'

const postsCount = 5

export default Vue.extend({
  name: 'IndexPage',
  async asyncData({ store, query }) {
    await store.dispatch('posts/getPosts', {
      after: query.after,
      first: postsCount,
    })
  },
  computed: {
    posts() {
      return (this.$store.state.posts as PostsState).posts
    },
    pageInfo() {
      return (this.$store.state.posts as PostsState).pageInfo
    },
  },
  watch: {
    async $route() {
      await this.$nuxt.refresh()
      window.scrollTo(0, 0)
    },
  },
})
</script>

<style scoped></style>
