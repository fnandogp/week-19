import Layout from 'src/components/Layout'
import PageTitle from 'src/components/PageTitle'
import PostPreview from 'src/components/PostPreview'
import { firestore } from 'src/utils/firebase'

export default function Posts({ posts }) {
  return (
    <Layout>
      <PageTitle title="Recent posts" />
      <div>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post}></PostPreview>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const snapshots = await firestore
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .get()

  const posts = snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}
