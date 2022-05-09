import Link from 'next/link'

export default function PostPreview({ post }) {
  return (
    <article className="prose lg:prose-xl prose-slate mt-4 border-gray-400 border-solid border-t class first:border-0 ">
      <h3 className="">
        <Link href={`/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </h3>
      <span className="text-sm not-prose">
        Posted at {new Date(post.createdAt._seconds).toLocaleString()}
      </span>
      <p>{post.preview}</p>
    </article>
  )
}
