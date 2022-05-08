import { firestore } from '../services/firebase'

export default function Posts({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.content}</p>
          <p>{post.createdAt._seconds}</p>
        </div>
      ))}
    </div>
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
