// app/posts/[id]/page.tsx
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const post = await response.json();

  return {
    title: `게시글 | ${post.title}`,
    description: post.body,
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const post = await response.json();

  return (
    <div>
      <h1 className="text-2xl font-bold">제목: {post.title}</h1>
      <p className="text-gray-500">내용: {post.body}</p>
    </div>
  );
}
