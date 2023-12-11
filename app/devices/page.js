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

  let getTitle = category
    ? `${brand ? brand : ""} ${category} for sale ${city ? `in ${city}` : ""}`
    : "";

  return {
    title: getTitle ?  `${getTitle} | Mobilez Market` : "Mobile devices in Pakistan | Mobilez Market ",
  };
}
