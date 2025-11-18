import { notFound } from "next/navigation";
import { BlogDetailTemplate } from "@/components/blogs/BlogDetailTemplate";

import { blogDetails } from "@/data/blogDetails";
import { blogs } from "@/data/blogs";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return blogs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = blogDetails[slug];

  if (!blog) {
    return {
      title: "Blog | Yashraj",
      description: "Insights from the Yashraj studio.",
    };
  }

  return {
    title: `${blog.title} | Yashraj`,
    description: blog.summary,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = blogDetails[slug];

  if (!blog) {
    notFound();
  }

  const relatedBlogs = blogs.filter((item) => item.slug !== blog.slug).slice(0, 3);

  return <BlogDetailTemplate blog={blog} relatedBlogs={relatedBlogs} />;
}


