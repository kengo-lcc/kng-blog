import type { GetStaticProps, NextPage } from "next";
import Link from 'next/link'
import { client } from "src/libs/client";
import { MicroCMSListResponse } from "microcms-js-sdk";
import dayjs from 'dayjs';

export type Blog = {
  title: string;
  body: string;
  publishedAt: string;
}

type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mt-10">記事一覧<span className="text-sm text-gray-400 mt-4 ml-4">{`記事の総数： ${props.totalCount}件`}</span></h2>
      <ul className="mt-4 space-y-4">
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a className="text-blue-800 underline hover:text-blue-400">{dayjs(content.publishedAt).format("YYYY年MM月DD日")} {content.title}</a>
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
