// src/components/Sidebar/CommandMenu.tsx
import { Command } from "cmdk";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {  FiLogOut, FiPhone, FiPlus, FiPackage, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const CommandMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/login');
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50 z-50"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12"
      >
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="What do you need?"
          className="relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none"
        />
        <Command.List className="p-3">
          <Command.Empty>
            No results found for{" "}
            <span className="text-violet-500">"{value}"</span>
          </Command.Empty>

          <Command.Group heading="Products" className="text-sm mb-3 text-stone-400">
            <Command.Item 
              className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2"
              onSelect={() => handleNavigation('/products')}
            >
              <FiPackage />
              View All Products
            </Command.Item>
            <Command.Item 
              className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2"
              onSelect={() => handleNavigation('/products/new')}
            >
              <FiPlus />
              Add New Product
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Account" className="text-sm text-stone-400 mb-3">
            <Command.Item 
              className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2"
              onSelect={() => handleNavigation('/profile')}
            >
              <FiUser />
              View Profile
            </Command.Item>
            <Command.Item 
              className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2"
              onSelect={() => handleNavigation('/support')}
            >
              <FiPhone />
              Contact Support
            </Command.Item>
          </Command.Group>

          <Command.Item 
            className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2"
            onSelect={handleLogout}
          >
            <FiLogOut />
            Sign Out
          </Command.Item>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};