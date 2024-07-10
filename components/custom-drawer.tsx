import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Drawer, DrawerContent, DrawerPortal } from "./ui/drawer";

interface DrawerProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const CustomDrawer = ({ open, setOpen, children }: DrawerProp) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerPortal>
        <DrawerContent>{children}</DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default CustomDrawer;
