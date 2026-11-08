"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/reusable/toast";
import { verifyEmail } from "@/server/auth/auth.service";
import { MdEmail } from "react-icons/md";
import Animate from "@/components/reusable/Animate";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAuth } from "@/provider/AuthProvider";

interface VerifyEmailDialogProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
}

const VerifyEmailDialog = ({
  isOpen,
  email,
  onClose,
}: VerifyEmailDialogProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      Toast({
        icon: "warning",
        title: "Please enter a valid 6-digit OTP.",
      });
      return;
    }

    try {
      setIsLoading(true);

      const result = await verifyEmail({
        email,
        otp,
      });
      if (!result.success) {
        Toast({
          icon: "error",
          title: result.message || "Email verification failed.",
        });
        return;
      }
      Toast({
        icon: "success",
        title: "Email verified successfully!",
      });
      await refreshUser();
      router.replace("/");
    } catch (error) {
      Toast({
        icon: "error",
        title: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Animate type="fadeUp" className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-background/40 p-6 sm:p-8 shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MdEmail className="h-10 w-10" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-base-content">
            Verify Your Email
          </h2>

          <p className="mt-2 text-sm text-base-content/60 leading-relaxed">
            We have sent a verification code to
          </p>

          <p className="font-semibold text-primary mt-1 break-all">{email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Enter 6-digit OTP
              </span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full text-center text-2xl tracking-[0.6em] font-bold mt-5 border-none focus:outline-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-base-content/50">
          Please check your inbox and spam folder if you have not received the
          code.
        </p>

        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-4 top-4 cursor-pointer"
          aria-label="Close dialog"
        >
          <X/>
        </button>
      </div>
    </Animate>
  );
};

export default VerifyEmailDialog;
