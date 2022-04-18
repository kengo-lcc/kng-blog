import type { GetStaticProps, NextPage } from "next";
import Link from 'next/link'
import { client } from "src/libs/client";
import { MicroCMSListResponse } from "microcms-js-sdk";

export type Blog = {
  title: string;
  body: string;
  publishedAt: string;
}

type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <p className="text-gray-400">
        {`記事の総数： ${props.totalCount}件`}
      </p>
      <ul className="mt-4 space-y-4">
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a className="text-blue-800 underline hover:text-blue-400">{content.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getList({ endpoint: "blog" });
  return {
    props: data,
  };
};

export default Home;
