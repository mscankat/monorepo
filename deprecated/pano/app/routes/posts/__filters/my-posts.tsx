import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/authenticator.server";
import { PostList } from "~/features/post/PostList";
import type { PostWithCommentCount } from "~/models/post.server";
import { getMyPosts } from "~/models/post.server";

type LoaderData = {
  posts: PostWithCommentCount[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const posts = await getMyPosts(user.id);
  return json<LoaderData>({ posts });
};

export const MyPosts = () => {
  const { posts } = useLoaderData();
  return <PostList posts={posts} />;
};

export default MyPosts;
