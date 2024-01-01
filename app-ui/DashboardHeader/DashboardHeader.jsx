import { getImage } from "@/utils/helper";
import Image from "next/image";

const DashboardHeader = (props) => {
  const { userData } = props;

  return (
    <div className="dashboard_header">
      <div className="user">
        <Image
          src={userData?.photo}
          height={50}
          width={50}
          alt="user"
        />
        <h1>{userData?.name}</h1>
      </div>
    </div>
  );
};

export default DashboardHeader;
