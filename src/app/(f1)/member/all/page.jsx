"use client";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

export default function AvailableMembers() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(members);

  useEffect(() => {
    setMembers(members || []);
    setFilteredMembers(members || []);
  }, [members]);

  useEffect(() => {
    axios.get("/api/getMemberAccounts").then(({ data: { members } }) => {
      setMembers(members || []);
    });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = members.filter((member) => {
      const fullName =
        `${member.firstName} ${member.middleName} ${member.lastName}`.toLowerCase();
      const membershipNumber = String(member.membershipNumber);
      return fullName.includes(query) || membershipNumber.includes(query);
    });
    setFilteredMembers(filtered);
    setPage(1);
  };

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(members.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return members.slice(start, end);
  }, [page, members]);

  return (
    <div>
      <div>
        <h1 className=" text-4xl pt-14  font-medium text-slate-800 text-center justify-center">
          Members Registered
        </h1>
        <div className="flex justify-start ml-5 mb-4">
          <input
            type="text"
            placeholder="Search members in the list"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      <Table
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="membershipNumber">
            Membership<br></br>Number
          </TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="dob">Date of Birth</TableColumn>
          <TableColumn key="gender">Gender</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="phone">Phone</TableColumn>
          <TableColumn key="address">Address</TableColumn>
          {/* <TableColumn key="maritalStatus">Marital Status</TableColumn>
          <TableColumn key="spouseName">Spouse Name</TableColumn> */}
        </TableHeader>
        <TableBody items={filteredMembers}>
          {(item) => (
            <TableRow key={item.membershipNumber}>
              <TableCell className="text-sm">{item.membershipNumber}</TableCell>
              <TableCell className="text-sm whitespace-nowrap">
                {item.firstName} {item.middleName} {item.lastName}
              </TableCell>
              <TableCell className="text-sm">
                {new Date(item.dob).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-sm">{item.gender}</TableCell>
              <TableCell className="text-sm">{item.email}</TableCell>
              <TableCell className="whitespace-nowrap text-sm">
                {item.phone}
              </TableCell>
              <TableCell className="text-sm">
                {item.area}, {item.landmark}, {item.post}, {item.dist},{" "}
                {item.state}-{item.pincode}
              </TableCell>
              {/* <TableCell>{item.martial}</TableCell>
              <TableCell>{item.spouse}</TableCell> */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
