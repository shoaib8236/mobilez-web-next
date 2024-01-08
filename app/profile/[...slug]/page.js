import ProductDetailsLayout from "@/app-ui/ProductDetailsLayout/ProductDetailsLayout";
import ProfileLayout from "@/app-ui/ProfileLayout/ProfileLayout";

const Page = ({ params: { slug } }) => {
  return (
    <>
      <section className="profile_layout">
        <ProfileLayout slug={slug} />
      </section>
    </>
  );
};

export default Page;

export async function generateMetadata(props) {
  const {
    params: {
      slug: [id, title],
    },
  } = props;

  let getTitle =
    title.slice(0, 1).toUpperCase() + title.split("-").join(" ").slice(1);

  return {
    title: `${getTitle} | Mobilez Market`,
  };
}
