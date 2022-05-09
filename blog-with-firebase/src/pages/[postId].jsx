import Layout from 'src/components/Layout'
import PostFull from 'src/components/PostFull'
import { firestore } from 'src/utils/firebase'

export default function Post({ post }) {
  return (
    <Layout>
      <PostFull post={post} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { postId } = context.params

  const doc = await firestore.collection('posts').doc(postId).get()

  const post = { id: doc.id, ...doc.data() }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  }
}
