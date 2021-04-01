import { GetStaticProps } from 'next';
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de marõ de 2020</time>
            <strong>Esse é meu titulo</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eligendi minima nisi quasi! Ullam consequuntur, lor suscipit obcaecati! Suscipit recusandae voluptate nemo doloremque ducimus obcaecati, reprehenderit esse autem vitae, libero, ipsa adipisci odit saepe similique.</p>
          </a>
          <a href="">
            <time>12 de marõ de 2020</time>
            <strong>Esse é meu titulo</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eligendi minima nisi quasi! Ullam consequuntur, lor suscipit obcaecati! Suscipit recusandae voluptate nemo doloremque ducimus obcaecati, reprehenderit esse autem vitae, libero, ipsa adipisci odit saepe similique.</p>
          </a>
          <a href="">
            <time>12 de marõ de 2020</time>
            <strong>Esse é meu titulo</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eligendi minima nisi quasi! Ullam consequuntur, lor suscipit obcaecati! Suscipit recusandae voluptate nemo doloremque ducimus obcaecati, reprehenderit esse autem vitae, libero, ipsa adipisci odit saepe similique.</p>
          </a>
          <a href="">
            <time>12 de marõ de 2020</time>
            <strong>Esse é meu titulo</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eligendi minima nisi quasi! Ullam consequuntur, lor suscipit obcaecati! Suscipit recusandae voluptate nemo doloremque ducimus obcaecati, reprehenderit esse autem vitae, libero, ipsa adipisci odit saepe similique.</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  })

  console.log(response);

  return {
    props: {}
  }
}