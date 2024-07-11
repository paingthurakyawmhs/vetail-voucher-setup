import IconBack from "@/assets/IconBack";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLockBodyScroll, useWindowSize } from "@uidotdev/usehooks";
import IconEdit from "@/assets/IconEdit";
import { useGetDataVoucherSetting } from "@/store/server/query";
import { useEditVoucherSetting } from "@/store/server/mutation";
import IconOpen from "@/assets/IconOpen";
import IconClose from "@/assets/IconClose";
import CustomDrawer from "@/components/custom-drawer";
import IconDelete from "@/assets/IconDelete";
import Link from "next/link";

const formschema = z.object({
  shopName: z.string().optional(),
  shopAddress: z.string().optional(),
  phoneNumber: z.string().optional(),
  isShowQR: z.boolean().optional(),
  footerNote: z.string().optional(),
  message: z.string().optional(),
});

const Index = () => {
  const router = useRouter();

  // getData
  const { data } = useGetDataVoucherSetting({ id: 278, branch: 476 });

  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      shopName: "",
      shopAddress: "",
      phoneNumber: "",
      message: "",
      isShowQR: data?.isShowQR || false,
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [fileData, setFileData] = useState<{
    imageContent: string;
    extension: string;
  }>();
  const fileRef = useRef<HTMLInputElement>(null);

  const [qr, setQr] = useState(data?.isShowQR);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (data) {
      form.reset({
        shopName: data?.shopName,
        shopAddress: data?.shopAddress,
        phoneNumber: data?.phoneNumber,
        isShowQR: data?.isShowQR,
        message: data?.footerNote,
      });
    }
  }, [data]);

  useEffect(() => {
    if (form.getValues().isShowQR) {
      setQr(form.getValues().isShowQR);
    }
  }, [form.getValues().isShowQR]);

  console.log(qr);

  useEffect(() => {
    const handleResize = () => {
      const wind = window.visualViewport?.height;
      if (!wind) return;
      if (wind > 700) {
        setEditOpen(false);
      } else {
        setEditOpen(true);
      }

      const bottomOffset = Math.ceil(window.innerHeight - wind);
      setKeyboardHeight(bottomOffset);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [editOpen]);

  useEffect(() => {
    const handleFocus = () => {
      setEditOpen(true);
    };

    const handleBlur = () => {
      // setEditOpen(false);
      // Scroll to top when keyboard closes
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    document.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      document.querySelectorAll("input, textarea").forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, [editOpen]);

  useEffect(() => {
    const preventScroll = (event: any) => {
      if (editOpen) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchmove", preventScroll, {
      passive: false,
    });

    return () => {
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [editOpen]);

  const editVoucher = useEditVoucherSetting();

  useEffect(() => {
    const handleFileChange = () => {
      if (selectedImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            const base64String = reader.result.split(",")[1];
            const extension = selectedImage.name.split(".").pop();
            setFileData({
              imageContent: base64String,
              extension: extension || "",
            });
          }
        };
        reader.readAsDataURL(selectedImage);
      }
    };
    handleFileChange();
  }, [selectedImage]);

  return (
    <div
      className={`bg-gray-100 px-5 pb-3 ${
        editOpen && `  mb-5  overflow-y-scroll`
      }`}
    >
      <div className=" py-2 flex items-center justify-between">
        <div className="gap-2 py-2 flex items-center">
          <Button variant={"link"} className="m-0 p-0">
            <IconBack />
          </Button>
          <h5 className="font-semibold text-sm">Voucher ပြင်ဆင်မည်</h5>
        </div>
        <Link href={`voucher/preview`} className=" text-[12px]">
          အစမ်းကြည့်ရှုမည်
        </Link>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((value) =>
            editVoucher.mutate(
              {
                id: data?.id,
                shopId: data?.shopId,
                branchId: data?.branchId,
                logoId: 0,
                logo: {
                  imageContent: fileData?.imageContent,
                  extension: fileData?.extension,
                },
                shopName: value.shopName,
                shopAddress: value.shopAddress,
                phoneNumber: value.phoneNumber,
                isShowQR: qr,
                footerNote: value.message,
              },
              {
                onSuccess: () => setEditOpen(false),
              }
            )
          )}
          name="form"
          id="form"
          // style={{
          //   height: editOpen ? keyboardHeight + 10 : "auto",
          // }}
          className={`${
            editOpen &&
            keyboardHeight !== 0 &&
            "  h-[400px] overflow-y-auto bg-white rounded-2xl "
          }  `}
        >
          <div
            className={`${
              editOpen && ""
            } py-4 pb-8 mb-5 bg-white overflow-y-auto rounded-3xl`}
          >
            <div className="flex items-center gap-3 justify-center">
              <div>
                <input
                  ref={fileRef}
                  onChange={(e) =>
                    setSelectedImage(e.target?.files?.[0] || null)
                  }
                  type="file"
                  hidden
                  id="file"
                />

                {selectedImage ? (
                  <img
                    onClick={() => setOpen(true)}
                    src={URL.createObjectURL(selectedImage)}
                    className="w-[80px] h-[80px] object-cover rounded-xl"
                    alt=""
                  />
                ) : (
                  <label
                    className="w-[80px] h-[80px] bg-gray-100 rounded-xl flex items-center justify-center mt-4"
                    htmlFor="file"
                  >
                    <>ca</>
                  </label>
                )}
              </div>
              <label htmlFor="file" className=" block w-5 ">
                <IconEdit />
              </label>
            </div>

            <div className=" flex flex-col items-center">
              {/* main section */}
              <FormField
                name="shopName"
                control={form.control}
                render={({ field }) => (
                  <div className="relative flex mt-2 items-center justify-center">
                    <div className="flex items-center gap-5">
                      <Input
                        id="name"
                        {...field}
                        className="ml-4 w-[180px] text-center text-base h-12"
                        onFocus={() => setEditOpen(true)}
                        placeholder="Shop Name"
                        // onBlur={() => setEditOpen(false)}
                      />

                      <label htmlFor="name" className=" block w-5 ">
                        <IconEdit />
                      </label>
                    </div>
                  </div>
                )}
              />

              {/* para section */}
              <FormField
                name="shopAddress"
                control={form.control}
                render={({ field }) => (
                  <div className="relative flex mt-2 items-center justify-center">
                    <div className="flex items-center gap-5">
                      <Textarea
                        id="address"
                        {...field}
                        className="p-2 text-center w-[220px] ml-3 text-sm"
                        onFocus={() => setEditOpen(true)}
                        placeholder="Your Shop Address"
                        // onBlur={() => setEditOpen(false)}
                      />
                      <label htmlFor="address" className="">
                        <IconEdit />
                      </label>
                    </div>
                  </div>
                )}
              />

              {/* phone section */}
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <div className="relative flex mt-2 items-center justify-center">
                    <div className="flex items-center gap-5">
                      <Input
                        id="number"
                        {...field}
                        className="ml-3 w-[250px] text-center text-base h-8"
                        onFocus={() => setEditOpen(true)}
                        // onBlur={() => setEditOpen(false)}
                        placeholder="Phone Number"
                      />
                      <label htmlFor="number" className="">
                        <IconEdit />
                      </label>
                    </div>
                  </div>
                )}
              />
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

            <div className=" flex  gap-3 items-center justify-center py-3">
              <div className=" border p-2 rounded-2xl">
                <img
                  src="https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png"
                  className={`w-[80px] h-[80px]  ${qr ? "" : " opacity-50"}`}
                  alt=""
                />
              </div>
              {qr ? (
                <Button
                  onClick={() => {
                    setQr(false);
                    setEditOpen(true);
                  }}
                  type="button"
                  variant={"link"}
                  className=" p-0 m-0"
                >
                  <IconOpen />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setQr(true);
                    setEditOpen(true);
                  }}
                  type="button"
                  variant={"link"}
                  className=" p-0 m-0"
                >
                  <IconClose />
                </Button>
              )}
            </div>

            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <div className="relative flex mt-4 items-center justify-center">
                  <div className="flex items-center gap-2">
                    <Textarea
                      id="message"
                      {...field}
                      className="ml-3 w-[280px] placeholder:text-[12px] text-center text-base h-8"
                      placeholder="ဝယ်ယူအားပေးမှုအတွက် ကျေးဇူးတင်ပါသည်"
                    />
                    <label htmlFor="message" className="">
                      <IconEdit />
                    </label>
                  </div>
                </div>
              )}
            />
          </div>
        </form>
        {editOpen && (
          <div
            style={{
              bottom: keyboardHeight,
            }}
            className="w-full  fixed left-0 "
          >
            <div className="flex z-10 bg-gray-100 px-4 py-4 mt-2 gap-3">
              <Button
                form="form"
                type="button"
                onClick={() => setEditOpen(false)}
                className="w-full bg-[#C8C8C8] text-black "
              >
                မသိမ်းပါ
              </Button>
              <Button
                disabled={editVoucher.isPending}
                form="form"
                type="submit"
                className="w-full bg-blue-500 "
              >
                သိမ်းမည်
              </Button>
            </div>
          </div>
        )}
      </Form>
      <CustomDrawer open={open} setOpen={setOpen}>
        <div className=" flex flex-col gap-4  border-t-2 px-4 pt-5 pb-3">
          <label
            onClick={() => setOpen(false)}
            htmlFor="file"
            className="  flex items-center gap-2 "
          >
            <IconEdit /> <p>ပုံ ပြောင်းလဲမည်</p>
          </label>
          <div
            onClick={() => {
              setOpen(false);
              setSelectedImage(null);
              if (fileRef.current) {
                fileRef.current.value = "";
              }
            }}
            className=" px-0 flex items-center gap-2"
          >
            <IconDelete />
            <p>ပုံ ဖျက်မည်</p>
          </div>
        </div>
        <div className=" w-full border-b-2 pb-3"></div>
      </CustomDrawer>
    </div>
  );
};

export default Index;
