import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Animated loader */}
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin border-t-primary mx-auto"></div>

          {/* Optional: Logo or icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-gray-700">
          Loading your dashboard
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Please wait while we prepare your workspace...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
