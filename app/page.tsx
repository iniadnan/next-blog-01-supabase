import Header from './components/Header'
import ArticleCard from './components/ArticleCard'

export default function Page() {
  return (
    <>
      <Header />
      <main className="w-full md:pt-10 pb-10">
        <div className="container mx-auto px-5 w-full md:w-[900px] lg:w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ArticleCard />
          </div>
        </div>
      </main>
    </>
  )
}