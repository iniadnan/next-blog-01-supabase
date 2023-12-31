"use client"
import { useState, useEffect } from "react"
import SUPABASE from "./api/supabaseClient"
import Navbar from './components/Navbar'
import Header from './components/Header'
import ModalForm from "./components/ModalForm"
import ArticleCard from './components/ArticleCard'

interface Posts {
  title: string,
  text: string,
  synopsis: string,
  slug: string,
  author: string,
  created_at: string
}

export default function Page() {

  const [posts, setPosts] = useState<Posts[]>([])
  const [allPosts, setAllPosts] = useState<Posts[]>([])
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    try {
      const { data: posts, error: postsError } = await SUPABASE.from('posts').select(
        'title, text, synopsis, slug, author, created_at'
      )

      if (postsError !== null) {
        throw postsError
      }

      setPosts(posts)
      setAllPosts(posts)
    } catch (e) {
      console.log(e)
    }
  }

  async function deletePost(slug: string) {
    try {
      const { error } = await SUPABASE.from('posts').delete().eq('slug', slug)

      if (error !== null) {
        throw error
      }

      const newPosts = posts.filter((post) => {
        return post.slug !== slug
      })

      setPosts(newPosts)
    } catch (e) {
      console.log(e)
    }
  }

  const appHandleModal = () => {
    setIsShowModal(!isShowModal)
  }

  const cancelModal = () => {
    setIsShowModal(!isShowModal)
  }

  const onHandleChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value;

    if (value.length == 0) {
      return setPosts(allPosts)
    }

    const filteredPosts = allPosts.filter((post: Posts) => {
      return post.title.toLowerCase().includes(value.toLowerCase())
    })

    setPosts(filteredPosts)

  }

  return (
    <>
      <Navbar newPost={true} navHandleModal={appHandleModal} />
      <Header onChangeValue={onHandleChange} />
      <main className="w-full md:pt-10 pb-10">
        <div className="container mx-auto px-5 w-full md:w-[900px] lg:w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts?.map((post) => (
              <ArticleCard handleDelete={deletePost} title={post.title} text={post.text} synopsis={post.synopsis} slug={post.slug} author={post.author} created_at={post.created_at} key={post.slug} />
            ))}
          </div>
        </div>
      </main>
      <ModalForm modalShow={isShowModal} closeModal={cancelModal} />
    </>
  )
}