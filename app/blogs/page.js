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

