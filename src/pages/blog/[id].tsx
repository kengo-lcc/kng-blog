import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "src/libs/client";
import { Blog } from "src/pages";
import dayjs from 'dayjs';

const BlogId: NextPage<Blog> = (props) => {
  return (
    <div>
      <h1 className="font-bold text-4xl">{props.title}</h1>
      <time dateTime={props.publishedAt} className="mt-2 block">{dayjs(props.publishedAt).format("YYYY年MM月DD日")}</time>
      <div className="prose prose-sm mt-8" dangerouslySetInnerHTML={{ __html: props.body }} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  const ids = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{}, { id: string }> = async (ctx) => {
  if (!ctx.params) {
    return { notFound: true };
  }
  const data = await client.getListDetail({
    endpoint: "blog",
    contentId: ctx.params.id,
  });

  return {
    props: data,
  };
};

export default BlogId;
