import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = (props) => {
  const router = useRouter();

  useEffect(() => {
    // Ambil data user dari localStorage
    const user = localStorage.getItem("user");

    if (user) {
      // Parsing JSON jika user tidak null
      const data = JSON.parse(user);
      const token = data?.token; // Safe access untuk token

      if (props === "login") {
        if (token) {
          router.push("/"); // Redirect jika sudah login
        }
      } else {
        if (!token) {
          router.push("/login"); // Redirect ke login jika tidak ada token
        }
      }
    } else {
      // Jika user null, redirect ke login (untuk props !== "login")
      if (props !== "login") {
        router.push("/login");
      }
    }
  }, [router, props]);

};

export default useAuth;
