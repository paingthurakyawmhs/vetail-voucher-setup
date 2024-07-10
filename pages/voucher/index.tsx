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

const formschema = z.object({
  shopName: z.string().optional(),
  shopAddress: z.string().optional(),
  phoneNumber: z.string().optional(),
  isShowQR: z.boolean(),
  footerNote: z.string().optional(),
  message: z.string().optional(),
});

const Index = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      shopName: "",
      shopAddress: "",
      phoneNumber: "",
      isShowQR: true,
      message: "",
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const size = useWindowSize();

  // useLockBodyScroll();

  // useEffect(() => {
  //   const handleResize = () => {
  //     // if (editOpen) {
  //     const wind = window.visualViewport?.height || window.innerHeight;

  //     const bottomOffset = Math.ceil(window.innerHeight - wind);

  //     setKeyboardHeight(bottomOffset);
  //     // }
  //     console.log(window.visualViewport);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [editOpen]);

  useEffect(() => {
    const handleResize = () => {
      const wind = window.visualViewport?.height;
      if (!wind) return;
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
      const wind = window.visualViewport?.height;
      if (!wind) return;
      setEditOpen(true);
      if (wind >= 700) {
        setEditOpen(false);
      }
      setEditOpen(true);
    };

    const handleBlur = () => {
      setEditOpen(false);
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

  const handleBackClick = () => {
    setEditOpen(false);
    router.push("/");
  };

  return (
    <div
      ref={buttonRef}
      className={`bg-gray-100 px-5 pb-3 ${
        editOpen && `  mb-5  overflow-y-scroll`
      }`}
    >
      <div className="gap-2 py-2 flex items-center">
        <Button onClick={handleBackClick} variant={"link"} className="m-0 p-0">
          <IconBack />
        </Button>
        <h5 className="font-semibold">Voucher ပြင်ဆင်မည်</h5>
      </div>

      <Form {...form}>
        <form
          // style={{
          //   height: editOpen ? keyboardHeight + 10 : "auto",
          // }}
          className={`${
            editOpen && "  h-[500px] overflow-y-auto bg-white rounded-2xl "
          }`}
          ref={formRef}
        >
          <div
            className={`${
              editOpen && ""
            } py-4 pb-8 mb-5 bg-white overflow-y-auto rounded-3xl`}
          >
            <div className="flex justify-center">
              <input
                onChange={(e) => setSelectedImage(e.target?.files?.[0] || null)}
                type="file"
                hidden
                id="file"
              />
              <label
                className="w-[80px] h-[80px] bg-gray-100 rounded-xl flex items-center justify-center mt-4"
                htmlFor="file"
              >
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    className="w-[80px] h-[80px] object-cover rounded-xl"
                    alt=""
                  />
                ) : (
                  <>ca</>
                )}
              </label>
            </div>

            {/* main section */}
            <FormField
              name="shopName"
              control={form.control}
              render={({ field }) => (
                <div className="relative flex mt-2 items-center justify-center">
                  <div className="flex items-center gap-5">
                    <Input
                      {...field}
                      className="ml-3 w-[180px] text-base h-12"
                      onFocus={() => setEditOpen(true)}
                      onBlur={() => setEditOpen(false)}
                    />
                    <div onClick={() => setEditOpen(true)} className="">
                      e
                    </div>
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
                      {...field}
                      className="p-1 w-[220px] ml-3 text-sm"
                      onFocus={() => setEditOpen(true)}
                      onBlur={() => setEditOpen(false)}
                    />
                    <div className="">e</div>
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
                      {...field}
                      className="ml-3 w-[250px] text-base h-8"
                      onFocus={() => setEditOpen(true)}
                      onBlur={() => setEditOpen(false)}
                    />
                    <div className="">e</div>
                  </div>
                </div>
              )}
            />

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

            <div className=" flex items-center justify-center py-3">
              <div className=" w-[100px] h-[100px] bg-black rounded-2xl"></div>
            </div>

            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <div className="relative  flex mt-4 items-center justify-center">
                  <div className="flex items-center gap-5">
                    <Textarea
                      {...field}
                      className="ml-3 w-[250px] text-base h-8"
                      onFocus={() => setEditOpen(true)}
                      onBlur={() => setEditOpen(false)}
                    />
                    <div className="">e</div>
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
            <div className="flex bg-gray-100 px-4 py-4 mt-2 gap-3">
              <Button className="w-full">မသိမ်းပါ</Button>
              <Button className="w-full">သိမ်းမည်</Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Index;
