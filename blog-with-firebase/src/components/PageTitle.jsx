import Head from 'next/head'

export default function PageTitle({ title }) {
  return (
    <h1 className="text-xl underline uppercase my-4">
      <Head>
        <title>{title}</title>
      </Head>
      {title}
    </h1>
  )
}
