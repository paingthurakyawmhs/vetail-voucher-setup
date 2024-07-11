import IconBack from "@/assets/IconBack";
import { useGetDataVoucherSetting } from "@/store/server/query";
import { useRouter } from "next/router";

const preview = () => {
  const router = useRouter();
  const { data } = useGetDataVoucherSetting({ id: 278, branch: 476 });

  console.log(data);

  return (
    <div className=" px-4 bg-gray-200 h-screen ">
      <div
        onClick={() => router.push("/voucher")}
        className=" py-3 flex items-center gap-3"
      >
        <IconBack />
        <p>နောက်သို့</p>
      </div>
      <div className=" mt-3 bg-white min-h-[500px] rounded-2xl ">
        <div className="">
          <div className=" flex flex-col items-center ">
            <div className="">
              {data?.logoUrl && (
                <img
                  src={data.logoUrl}
                  className=" w-[80px]  h-[80px] rounded-xl "
                  alt="logo"
                />
              )}
            </div>
            <div className="">
              {data?.shopName && <p className=" pt-4">{data.shopName}</p>}
            </div>{" "}
            <div className="">
              {data?.shopAddress && <p className=" pt-2">{data.shopAddress}</p>}
            </div>{" "}
            <div className="">
              {data?.phoneNumber && <p className=" pt-2">{data.phoneNumber}</p>}
            </div>
          </div>
          {/* voucher Id */}
          <div className="flex gap-2 justify-center mt-2 items-center text-[12px]">
            <p>VOUCHER ID :</p>
            <p> 000000</p>
          </div>

          {/* casher */}
          <div className="flex gap-2 justify-start pl-4 text-[12px] mt-2 items-center">
            <p>CASHER :</p>
            <p> MG SHWE LONE</p>
          </div>
          <div className="pl-4 text-[12px]">27 JUN 2024</div>

          {/* အ၇ေအတွက် */}
          <div className="mt-3 gap-1 flex items-center text-[12px] px-4">
            <p>အရေအတွက်</p>
            <div className="border-black/50 w-full border border-dashed"></div>
            <p className="w-[150px]">စျေးနှုန်း&#40;ks&#41;</p>
          </div>

          {/* product */}
          <div className="flex flex-col gap-3 text-[12px] px-4">
            <div className="text-[12px] flex items-center justify-between">
              <p>1 Product name</p>
              <p className="w-[50px] border border-dashed border-black/50"></p>
            </div>
            <div className="w-full border-black/50 border border-dashed"></div>
            <div className="flex items-center justify-between">
              <p>ကျသင့်ငွေ</p>
              <p className="w-[50px] border border-dashed border-black/50"></p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p>Discount</p>
                <p>:</p>
                <p className="border border-dashed border-black/50 w-[20px]"></p>
              </div>
              <p className="w-[50px] border border-dashed border-black/50"></p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p>ကုန်သွယ်ခွန်</p>
                <div className="flex items-center">
                  &#40;
                  <p className="border border-dashed border-black/50 w-[10px]"></p>
                  &#41;
                </div>
              </div>
              <p className="w-[50px] border border-dashed border-black/50"></p>
            </div>
            <div className="w-full border-black/50 border border-dashed"></div>
            <div className="flex items-center justify-between">
              <p>ပေးသွင်းငွေ</p>
              <p className="w-[50px] border border-dashed border-black/50"></p>
            </div>
            <div className="flex items-center justify-between">
              <p>ပြန်အမ်းငွေ</p>
              <p className="w-[50px] border border-dashed border-black/50"></p>
            </div>
            <div className="w-full border-black/50 border border-dashed"></div>
            <div className="flex items-center justify-between">
              <p>ငွေပေးချေမှု</p>
              <p>Cash</p>
            </div>
          </div>

          {/* qr */}
          <div className=" flex items-center justify-center py-4">
            <div className=" border p-2 rounded-2xl">
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png"
                className={`w-[80px] h-[80px] `}
                alt=""
              />
            </div>
          </div>

          {/* footer */}
          <div className=" pb-6 flex items-center justify-center">
            {data?.footerNote?.trim().length !== 0 ? (
              <p>{data?.footerNote}</p>
            ) : (
              <p className=" text-sm">ဝယ်ယူအားပေးမှုအတွက် ကျေးဇူးတင်ပါသည်</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default preview;
