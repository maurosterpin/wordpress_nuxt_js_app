<template>
  <div class="container">
    <div>
      <h1 class="text-center">Headless WordPress Nuxt</h1>
      <div class="container py-4">
        <div class="row">
          <post-card v-for="post in posts" :key="post.slug" :post="post" />
          <div class="d-flex w-100">
            <div class="ml-auto" v-if="pageInfo.hasNextPage">
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

export default Vue.extend({
  name: 'IndexPage',
  computed: {
    posts() {
      return [
        {
          title: 'Test Post',
          slug: 'test-post',
          content: '<p>This is a test post</p>',
          excerpt: '<p>This is a test post</p>',
        },
      ]
    },
    pageInfo() {
      return {
        endCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '',
      }
    },
  },
})
</script>

<style scoped></style>
