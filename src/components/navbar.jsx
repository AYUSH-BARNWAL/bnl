"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

import { getJwtToken, verifyJwtToken } from "@/app/(auth)/auth";
import { logoutAction } from "@/app/(auth)/actions";

export default function Nav() {
  const logout = async () => {
    await logoutAction();
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    getJwtToken().then((token) => {
      verifyJwtToken(token).then(({ payload, error }) => {
        setUser((p) => payload);
      });
    });
  }, []);

  return (
    <>
      <Navbar
        classNames={{
          wrapper: "max-w-full flex bg-gray-900 text-white",
        }}
      >
        <NavbarBrand className="max-w-fit flex-none">
          <Image src="/bnl.png" width={32} />
          <p className="text-2xl font-semibold">Betiyan Nidhi Ltd.</p>
        </NavbarBrand>
        <NavbarContent className="grow hidden lg:flex gap-8" justify={"center"}>
          <NavbarItem className="">
            <Link href="/member" className="text-white hover:text-primary">
              Member
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/promoter" className="text-white hover:text-primary">
              Promoter
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/transaction" className="text-white hover:text-primary">
              Transaction
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/bankaccount" className="text-white hover:text-primary">
              Bank Account
            </Link>
          </NavbarItem>
          <NavbarItem>Bankbook</NavbarItem>
          <NavbarItem>Cashbook</NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="max-w-fit shrink">
          <Dropdown>
            <DropdownTrigger>
              <Avatar src="/avatar.png" />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection>
                <DropdownItem>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Earnings</DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem as={Button} color="danger" onClick={logout}>
                  {/* <Button color="danger">Logout</Button> */}
                  {/* <form action={logoutAction}>
                    <Input type="submit" name="submit" value={"Logout"}></Input>
                  </form> */}
                  Logout
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}
