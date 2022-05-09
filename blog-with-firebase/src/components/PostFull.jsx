export default function PostFull({ post }) {
  return (
    <article className="prose lg:prose-xl prose-slate mt-4 border-gray-400 border-solid border-t class first:border-0 ">
      <h2 className="">{post.title}</h2>
      <span className="text-sm not-prose">
        Posted at {new Date(post.createdAt._seconds).toLocaleString()}
      </span>
      <p>{post.content}</p>
    </article>
  )
}
