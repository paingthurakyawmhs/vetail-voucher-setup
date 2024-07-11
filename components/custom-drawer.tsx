import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Drawer, DrawerContent, DrawerPortal } from "./ui/drawer";
import IconX from "@/assets/IconX";

interface DrawerProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const CustomDrawer = ({ open, setOpen, children }: DrawerProp) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerPortal>
        <DrawerContent className=" py-2">
          <span
            onClick={() => setOpen(false)}
            className=" top-0 left-4 absolute "
          >
            <IconX />
          </span>
          {children}
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default CustomDrawer;
