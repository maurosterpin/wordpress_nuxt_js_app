import { ActionContext } from 'vuex'
import ApolloClient, { gql } from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  status: string
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
}

export interface PostsState {
  posts: Post[]
  pageInfo: PageInfo
  post: Post
}

const postsQuery = gql`
  fragment pageInfoData on WPPageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
  fragment listPostData on Post {
    id
    slug
    title
    content
    excerpt
    uri
    status
  }
  query GetPosts(
    $where: RootQueryToPostConnectionWhereArgs
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    posts(
      where: $where
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      pageInfo {
        ...pageInfoData
      }
      nodes {
        ...listPostData
      }
    }
  }
`

const postQuery = gql`
  fragment PostData on Post {
    id
    slug
    title
    content
    excerpt
    uri
    status
  }
  fragment PostData on Page {
    id
    slug
    title
    content
    excerpt
    uri
    status
  }
  query GetContentNode($id: ID!) {
    contentNode(id: $id, idType: URI) {
      ... on Post {
        ...postData
      }
      ... on Page {
        ...pageData
      }
    }
  }
`

const client = new ApolloClient({
  uri: 'https://headlessfw.wpengine.com/graphql',
  fetch,
})

export function state(): PostsState {
  return {
    posts: [
      {
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        content: '<p>This is a test post</p>',
        excerpt: '<p>This is a test post</p>',
        status: 'published',
      },
    ],
    pageInfo: {
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: '',
    },
    post: {
      id: '1',
      title: 'Test Post',
      slug: 'test-post',
      content: '<p>This is a test post</p>',
      excerpt: '<p>This is a test post</p>',
      status: 'published',
    },
  }
}

export const mutations = {
  setPosts(state: PostsState, posts: Post[]) {
    state.posts = posts
  },
  setPost(state: PostsState, post: Post) {
    state.post = post
  },
  setPageInfo(state: PostsState, pageInfo: PageInfo) {
    state.pageInfo = pageInfo
  },
}

export const actions = {
  async getPosts(
    { commit }: ActionContext<PostsState, PostsState>,
    variables: any
  ) {
    const result = await client.query({
      query: postsQuery,
      variables,
    })

    const { nodes, pageInfo } = result?.data.posts

    commit('setPosts', nodes)
    commit('setPageInfo', pageInfo)
  },
  async getPost(
    { commit }: ActionContext<PostsState, PostsState>,
    slug: string
  ) {
    const result = await client.query({
      query: postQuery,
      variables: {
        id: slug,
      },
    })

    commit('setPost', result?.data.contentNode)
  },
}
