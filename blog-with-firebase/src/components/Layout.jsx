import Header from 'src/components/Header'

export default function Layout({ children }) {
  return (
    <div className="">
      <Header />
      <main className="container mx-auto">{children}</main>
    </div>
  )
}
