

import BlogsDetailsLayout from "@/app-ui/BlogsDetailsLayout/BlogsDetailsLayout";
import PageBanner from "@/app-ui/PageBanner/PageBanner";

const Page = ({ params: { slug } }) => {
  
  return (
    <>
      <PageBanner title="Blog Detail" currentPage="Blog Detail" />
      <div className="blogs_details_wrap">
        <div className="content_wrap">
         <BlogsDetailsLayout slug={slug}/>
        </div>
      </div>
    </>
  );
};

export default Page;


export async function generateMetadata(props) {

  const {
    params: {
      slug
    },
  } = props;

  let getTitle =
  slug.slice(0, 1).toUpperCase() + slug.split("-").join(" ").slice(1);

  return {
    title: `${getTitle} | Mobilez Market`,
  };
}

