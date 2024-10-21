"use client"
import { useState } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export function HeaderMenu() {
  const [selected, setSelected] = useState("Grants");

  return (
    <div className="flex justify-left w-full mb-4 mt-4 ml-0.5rem "
    style={{ marginLeft: "0.5rem" }}>
      <NavigationMenu className="w-[80%] border-0 shadow-none">
        <NavigationMenuList className="justify-center">
          {/* Menu Items */}
          <NavigationMenuItem>
            <NavigationMenuLink
              className={`px-4 py-2 text-base rounded-md ${
                selected === "Grants" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelected("Grants")}
              style={{ border: "none", boxShadow: "none" }} // Inline style to ensure no borders
            >
              Grants
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={`px-4 py-2 text-base rounded-md ${
                selected === "Decisions" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelected("Decisions")}
              style={{ border: "none", boxShadow: "none" }} // Inline style to ensure no borders
            >
              Decisions
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={`px-4 py-2 text-base rounded-md ${
                selected === "Proposals" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelected("Proposals")}
              style={{ border: "none", boxShadow: "none" }} // Inline style to ensure no borders
            >
              Proposals
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={`px-4 py-2 text-base rounded-md ${
                selected === "Verifications" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelected("Verifications")}
              style={{ border: "none", boxShadow: "none" }} // Inline style to ensure no borders
            >
              Verifications
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
