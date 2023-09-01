import RSS from "rss";

import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

export async function GET() {
  // Create the feed using the RSS helper, and the metadata about our blog
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  });

  const blogPosts = await getBlogPostList();

  // For each blog post, create a new item in the RSS feed
  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `http://some-website.com/${post.slug}`,
    });
  });

  // Generate the raw XML string using 'feed.xml', and then send it to the client
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
