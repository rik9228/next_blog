import { client } from "../../libs/client";

export default function BlogId({ blog }) {
  return (
    <main className="max-w-screen-xl mx-auto mt-10">
      <h1 className="text-2xl">{blog.title}</h1>
      <p className="mt-5">{blog.publishedAt}</p>
      <p className="mt-5">カテゴリー：{blog.category && `${blog.category.name}`}</p>
      <p className="mt-5">タグ：{blog.tag && `${blog.tag.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className="mt-10"
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
