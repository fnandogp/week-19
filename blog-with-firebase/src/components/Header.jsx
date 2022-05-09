import Link from 'next/link'

function MenuItem({ href, name }) {
  return (
    <Link href={href} passHref>
      <a className="block p-4">{name}</a>
    </Link>
  )
}

export default function Header({}) {
  return (
    <header className="bg-blue-400 text-white">
      <div className="container mx-auto">
        <div className="flex">
          <MenuItem href="/" name="Home" />
          <MenuItem href="/admin/new" name="New" />
        </div>
      </div>
    </header>
  )
}
