import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";

import styles from "./styles.module.scss";
import { GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import Link from "next/link";
import { useSession } from "next-auth/client";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updated_at: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Post({ posts }: PostsProps) {
  const [session] = useSession();
  
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.MainContainer}>
        <div>
          {posts.map((post) => 
            session?.activeSubscription ? (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <a href="#">
                 <time>{post.updated_at}</time>
                 <strong>{post.title}</strong>
                 <p>{post.excerpt}</p>
               </a>
              </Link>
             ) : (
              <Link key={post.slug} href={`/posts/preview/${post.slug}`}>
                <a href="#">
                 <time>{post.updated_at}</time>
                 <strong>{post.title}</strong>
                 <p>{post.excerpt}</p>
               </a>
              </Link>
             )
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  );
  
  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updated_at: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });
  return {
    props: {
      posts
    },
  };
};
