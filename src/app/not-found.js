"use client";

import { Button, Result } from "antd";
import React from "react";
import { useRouter } from "next/navigation";


const NotFound = () => {
    const router = useRouter();
	return (
		<div className="h-screen flex items-center justify-center bg-white">
			{/* notFound{" "}
			<button onClick={() => navigate(-1)} className="border-2 px-2">
				Go Back
			</button> */}

			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Button onClick={() => router.push("/")} type="primary">
						Kembali
					</Button>
				}
			/>
		</div>
	);
};

export default NotFound;
