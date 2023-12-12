import FiltersLayout from "@/app-ui/FiltersLayout/FiltersLayout";

export default function Page(props) {
  return (
    <>
      <div className="find_my_device_wrap">
        <FiltersLayout />
      </div>
    </>
  );
}

export async function generateMetadata(props) {
  const {
    searchParams: { category, brand, city },
  } = props;

  const getOrderedTitle = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };

  let getTitle = category
    ? `${brand ? brand : ""} ${getOrderedTitle(category)} for sale ${
        city ? `in ${city}` : ""
      }`
    : "";

  return {
    title: getTitle
      ? `${getTitle} | Mobilez Market`
      : "Mobile devices in Pakistan | Mobilez Market ",
  };
}
