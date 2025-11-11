"use client";

import { useState } from "react";
import RequestsPage, { RequestsPageProps } from "../requests";
import { LoginPage } from "../login";

export const AdminPage = ({ requests, products }: RequestsPageProps) => {
  const [show, setShow] = useState(false);

  return show ? (
    <RequestsPage requests={requests} products={products} />
  ) : (
    <LoginPage setShow={setShow} />
  );
};
