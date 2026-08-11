"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import { googleLogin } from "@/server/auth/auth.service";
import { Toast } from "./toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";

const SocialLogin = () => {
    const router = useRouter();
    const { refreshUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) {
      await Swal.fire({
        title: "Login Failed",
        text: "Google did not provide a valid ID token.",
        icon: "error",
        confirmButtonColor: "#11B2ED",
      });

      return;
    }
    try {
      setIsLoading(true);
      const result = await googleLogin({
        idToken: credentialResponse.credential,
      });

      if (!result.success) {
        await Toast({
          icon: "error",
          title: result?.message || "Login failed",
        });

        return;
      }
      await refreshUser();
      await Swal.fire({
        title: "Welcome Back!",
        text: "You successfully logged in to your account.",
        icon: "success",
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "Continue",
      });
      router.push("/");
    } catch (error) {
      console.error("Google login error:", error);

      await Swal.fire({
        title: "Login Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#11B2ED",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = async () => {
    await Toast({
      icon: "error",
      title: "Login failed",
    })
  };

  return (
    <div className="w-full">
      <div
        className={`${isLoading ? "pointer-events-none opacity-50" : ""
} `}
      >
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          theme="filled_black"
          size="large"
          text="continue_with"
          shape="circle"
          width="100%"
        />
      </div>
    </div>
  );
};

export default SocialLogin;