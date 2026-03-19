const LoadingSpinner = ({ fullPage = false, size = "md" }: { fullPage?: boolean; size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <div
      className={`${sizes[size]} rounded-full border-gray-300 border-t-green-500 animate-spin`}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-green-500 animate-spin" />
        <p className="mt-4 text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;