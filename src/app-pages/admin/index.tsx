"use client";

import { useState } from "react";
import RequestsPage, { RequestsPageProps } from "../requests";
import { LoginPage } from "../login";

export const AdminPage = ({ requests }: RequestsPageProps) => {
  const [show, setShow] = useState(true);

  return show ? (
    <RequestsPage requests={requests} />
  ) : (
    <LoginPage setShow={setShow} />
  );
};
