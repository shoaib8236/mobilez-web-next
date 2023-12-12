import ProductDetailsLayout from "@/app-ui/ProductDetailsLayout/ProductDetailsLayout";

const Page = ({ params: { slug } }) => {
  return (
    <>
      <section className="product_details">
        <ProductDetailsLayout slug={slug} />
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


