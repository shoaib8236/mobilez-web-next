import { getImage, logout } from "@/utils/helper";
import { Dropdown } from "antd";
import Image from "next/image";

const DashboardHeader = (props) => {
  const { userData } = props;


  const items = [

    {
      key: "6",
      label: (
        <>
          <span onClick={logout}>Sign out</span>
        </>
      ),
    },
  ];

  return (
    <div className="dashboard_header">
      <Dropdown
        menu={{
          items,
        }}
        arrow
      >

        <div className="user">
          <Image
            src={userData?.photo}
            height={50}
            width={50}
            alt="user"
          />
          <h1>{userData?.name}</h1>
        </div>
      </Dropdown>
    </div>
  );
};

export default DashboardHeader;
