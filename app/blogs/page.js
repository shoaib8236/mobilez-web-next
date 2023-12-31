import BlogsLayout from "@/app-ui/BlogsLayout/BlogsLayout";
import PageBanner from "@/app-ui/PageBanner/PageBanner";

const Page = () => {


  return (
    <div className="blogs_wrapper">
      <PageBanner title="Blogs" />
      <BlogsLayout />
    </div>
  );
};

export default Page;


export const metadata = {
  title: "Blogs | Mobilez Market",
  description: "Generated by create next app",
};

