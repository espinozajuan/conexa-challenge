import { LoaderProps } from "./Loader.types";

export default function Loader({
  message = "Cargando...",
  size = "md",
  className = "",
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} mb-3`}>
        <img
          src="/loader.png"
          alt="Loading..."
          className="w-full h-full object-contain animate-spin"
        />
      </div>
      <p className="text-black text-center font-medium">{message}</p>
    </div>
  );
}
