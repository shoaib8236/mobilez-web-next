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
    let newStr = str.slice(0, 1).toUpperCase() + str.slice(1);

    if (newStr === "Watch") {
      return "Smart Watches";
    } else if (newStr === "Mobile") {
      return "Mobile Devices";
    } else if (newStr === "Tablet") {
      return "Tablet Devices";
    } else if (newStr === "Accessories") {
      return "Mobile Accessories";
    }
  };

  let getTitle = category
    ? `${brand ? brand : ""} ${getOrderedTitle(category)} ${
        city ? `in ${city.slice(0, 1).toUpperCase() + city.slice(1)}` : "in Pakistan"
      }`
    : "";

  return {
    title: getTitle
      ? `${getTitle} | Mobilez Market`
      : `Mobile devices ${city ? `in ${city.slice(0, 1).toUpperCase() + city.slice(1)}` : "in Pakistan"} | Mobilez Market`,
  };
}
