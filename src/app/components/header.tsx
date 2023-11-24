import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const handleButtonClick = () => {
    // 特定のパスに遷移
    router.push("/");
  };
  return (
    <div className="bg-[#fef6e4] flex item-center justify-between w-full border-1 border-b-slate-700">
      <button type="button" onClick={handleButtonClick}>
        <div className="m-3 flex items-center">
          <Image src={"/logo_circle.png"} alt="" height={50} width={50} />
          <p className="font-bold text-textStrong text-[##8bd3dd]">
            &nbsp;&nbsp;Friend Connect
          </p>
        </div>
      </button>
      <div className="m-3">
        <Image src={"/icon/1.png"} alt="" height={50} width={50} />
      </div>
    </div>
  );
}
