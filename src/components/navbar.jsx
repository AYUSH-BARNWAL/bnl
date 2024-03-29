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
          <Image src="/bnl.png" width={32} alt="" />
          <p className="text-2xl font-semibold">Betiyan Nidhi Ltd.</p>
        </NavbarBrand>
        <NavbarContent className="grow hidden lg:flex gap-8" justify={"center"}>
          <NavbarItem className="">
            {/* <Link href="/member" className="text-white hover:text-primary">
              Member
            </Link> */}
            <Dropdown backdrop="blur">
              <DropdownTrigger className="hover:cursor-pointer">
                Member
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection>
                  <DropdownItem as={Link} href="/member/availableMembers">
                    Available Members
                  </DropdownItem>
                  {/* </DropdownSection>
                <DropdownSection> */}
                  <DropdownItem as={Link} href="/member/newMember">
                    New Member
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            {/* <Link href="/promoter" className="text-white hover:text-primary">
              Promoter
            </Link> */}
            <Dropdown backdrop="blur">
              <DropdownTrigger className="hover:cursor-pointer">
                Promoter
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection>
                  <DropdownItem as={Link} href="/promoter/availablePromoters">
                    Available Promoters
                  </DropdownItem>
                  {/* </DropdownSection>
                <DropdownSection> */}
                  <DropdownItem as={Link} href="/promoter/newPromoter">
                    New Promoter
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Link href="/transaction" className="text-white hover:text-primary">
              Transaction
            </Link>
          </NavbarItem>
          <NavbarItem>
            {/* <Link href="/bankaccount" className="text-white hover:text-primary">
              Bank Account
            </Link> */}
            <Dropdown backdrop="blur">
              <DropdownTrigger className="hover:cursor-pointer">
                Bank Account
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection>
                  <DropdownItem
                    as={Link}
                    href="/bankAccount/availableBankAccounts"
                  >
                    Available Bank Accounts
                  </DropdownItem>
                  {/* </DropdownSection>
                <DropdownSection> */}
                  <DropdownItem as={Link} href="/bankAccount/newBankAccount">
                    New Bank Account
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            {/* <Link
              href="/customerAccount"
              className="text-white hover:text-primary"
            >
              Bank Account
            </Link> */}
            <Dropdown backdrop="blur">
              <DropdownTrigger className="hover:cursor-pointer">
                Customer Account
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection>
                  <DropdownItem
                    as={Link}
                    href="/customerAccount/availableCustomerAccount"
                  >
                    Available Customer Accounts
                  </DropdownItem>
                  {/* </DropdownSection>
                <DropdownSection> */}
                  <DropdownItem
                    as={Link}
                    href="/customerAccount/newCustomerAccount"
                  >
                    New Customer Account
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          <NavbarItem as={Link} href="/transactionBook" className="text-white">
            Transaction Book
          </NavbarItem>
          {/* <NavbarItem as={Link} href="/cashbook" className="text-white">
            Cashbook
          </NavbarItem> */}
          <NavbarItem>
            <Dropdown backdrop="blur">
              <DropdownTrigger className="hover:cursor-pointer">
                Schemes
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection>
                  <DropdownItem as={Link} href="/schemes/availableSchemes">
                    All Schemes
                  </DropdownItem>
                  <DropdownItem as={Link} href="/schemes/fdscheme">
                    New FD Scheme
                  </DropdownItem>
                  <DropdownItem as={Link} href="/schemes/rdscheme">
                    New RD Scheme
                  </DropdownItem>
                  <DropdownItem as={Link} href="/schemes/sascheme">
                    New SA Scheme
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
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
