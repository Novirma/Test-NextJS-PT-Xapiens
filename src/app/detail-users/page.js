"use client";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { MdMail } from "react-icons/md";
import { TbLogout, TbMenu2, TbQrcode } from "react-icons/tb";
import { BsBellFill } from "react-icons/bs";
import { Dropdown, Input, Menu } from "antd";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ActionIcon, TextInput } from "@mantine/core";
import { TbSearch } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import { Button, Space, Table, Tooltip } from "antd";
import { BiDetail } from "react-icons/bi";
import { ApiGetUsers } from "../api";
import { useSearchParams } from "next/navigation";

export default function Home() {
  useAuth();

  const searchParams = useSearchParams();

  console.log(searchParams);

  const id = searchParams.get("id");
  const emailUsers = searchParams.get("email");
  const firstName = searchParams.get("first_name");
  const lastName = searchParams.get("last_name");
  const avatar = searchParams.get("avatar");

  const user = localStorage.getItem("user");

  const data = JSON.parse(user);

  const email = data.email;

  const pathname = usePathname();

  const NoImage = "/avatar.png";

  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleAlertLogout = () => {
    Swal.fire({
      title: "Apakah ingin logout ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const handleLogout = () => {
    // Hapus item dengan key "user" dari localStorage
    localStorage.removeItem("user");

    // Redirect ke halaman login
    router.push("/login");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchDataUsers = async () => {
    setLoading(true);
    // let params = {
    // 	search: searchData,
    // 	page: pagination.current,
    // 	perPage: pagination.pageSize,
    // };
    let params = pagination.current;
    try {
      const { data } = await ApiGetUsers(params);
      console.log(data);
      setRecord(data?.data);
      setPagination({
        ...pagination,
        total: data?.total || 0,
        // total: data?.pages?.meta?.total || 0,
      });
    } catch (error) {
      const { data } = error?.response ?? null;
      if (data.status === 401) {
        handleUnauthorized(data?.message);
      }
    }
    setLoading(false);
  };

  //   useEffect(() => {
  //     fetchDataUsers();
  //   }, [pagination.current, pagination.pageSize, searchData]);

  const handleSearchData = (e) => {
    setSearchData(e.target.value);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleOpenModal}>Ganti Password</Menu.Item>
    </Menu>
  );

  const columnsDevice = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "20%",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      align: "center",
      width: "20%",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      align: "center",
      width: "20%",
    },
    {
      title: "Avatar",
      key: "avatar",
      align: "center",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <img
            src={record.avatar || NoImage}
            alt="image"
            className="h-10 w-10 rounded-full object-center bg-white"
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite loop in case fallback also fails
              e.target.src = NoImage; // Set fallback image
            }}
          />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "40%",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title={"Detail"}>
            <Button
              className="z-100 flex items-center justify-center text-lg bg-tPrimary hover:bg-[#4254c5]"
              type="primary"
              // onClick={async (e) => {
              //   handleOpenDetailModal(record);
              // }}
              icon={<BiDetail className="text-bTextPrimary" />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-full w-screen">
      <div className={`p-10 ml-0 duration-300 h-1/5 bg-blue-950 w-full `}>
        <div className="flex mb-[2rem] justify-between items-center h-12 ">
          <div className="flex items-center">
            <button
              // onClick={handleSideBar}
              className="p-2 mr-[2rem] rounded-full duration-300 text-gray-50 hover:bg-primary hover:text-white"
            >
              <TbMenu2 size={25}></TbMenu2>
            </button>
            <label className="capitalize text-gray-50 font-semibold">
              Detail Users
              {/* {breadcrump} */}
            </label>
          </div>

          <div className="relative flex gap-4 items-center">
            <div className="h-full w-auto text-[#212E5B] flex items-center gap-2">
              {/* <Input
              className="rounded-full bg-[#F2F2F2]"
              placeholder="Type Search"
              prefix={<FaSearch />}
            /> */}
              <div className="bg-[#F2F2F2] rounded-full h-auto w-auto p-2">
                <MdMail size={20} />
              </div>
              <div className="bg-[#F2F2F2] rounded-full h-auto w-auto p-2">
                <BsBellFill size={20} />
              </div>
            </div>
            <button
              // onClick={() => setShowNameMobile(!showNameMobile)}
              className="sm:cursor-default"
            >
              <img
                src={NoImage}
                alt="image"
                className="h-10 w-10 rounded-full object-center bg-white"
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop in case fallback also fails
                  e.target.src = NoImage; // Set fallback image
                }}
              />
            </button>
            {/* <Dropdown 
          menu={menu} trigger={["click"]}
          >            
          </Dropdown> */}
            <div className="flex-col hidden sm:flex">
              <div className="font-semibold text-gray-50">
                {/* {authUser?.nama_pegawai ? authUser?.nama_pegawai : "not found"} */}
                {email ? email : "not found"}
              </div>
              <div className="text-xs text-gray-50 font-thin">
                {/* {selectedRole && JSON.parse(selectedRole)
                ? JSON.parse(selectedRole)
                : "not found"} */}
              </div>
            </div>
            <button
              onClick={handleAlertLogout}
              className="p-2 rounded-full hover:bg-primary text-gray-50 hover:text-white duration-300"
            >
              <TbLogout size={20}></TbLogout>
            </button>

            {/* <div
						className={`bg-white absolute top-12 left-0 sm:hidden overflow-hidden duration-300 ${
							showNameMobile
								? "h-16 border-[1px] "
								: "h-0 border-none"
						}`}
					>
						<div className="relative flex flex-col p-2 rounded-lg">
							<div className="font-semibold">
								{authUser?.data?.nama}
							</div>
							<div className="text-xs font-thin">
								{authUser?.data?.roles?.[0]?.role}
							</div>
						</div>
					</div> */}
          </div>
        </div>
        {/* <Outlet></Outlet> */}

        {openModal && (
          <ModalChangePassword
            open={openModal}
            onClose={handleCloseModal}
          ></ModalChangePassword>
        )}
      </div>
      <div
        className={`bg-gray-300 min-h-[80vh] flex flex-col items-center justify-center
         gap-4 p-4 rounded-md text-black`}
      >
        <img
          src={avatar}
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full object-cover"
        />
        <p className="text-lg font-bold">ID: {id}</p>
        <p className="text-lg font-bold">Email: {emailUsers}</p>
        <p className="text-lg font-bold">
          Name: {firstName} {lastName}
        </p>
      </div>
    </div>
  );
}
