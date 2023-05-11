import { useRouter } from "next/router";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="80"
      width="80"
      src="/fitGenLogo.png"
    />
  );
};

export default Logo;
