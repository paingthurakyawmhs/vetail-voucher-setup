import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="   justify-center my-5 flex items-center">
      <Link className=" text-red-500" href={"/voucher"}>
        Go to Voucher
      </Link>
    </div>
  );
}
