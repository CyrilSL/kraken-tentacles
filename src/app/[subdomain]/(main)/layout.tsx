import { Metadata } from "next";
import Footer from "@modules/layout/templates/footer";
import Nav from "@modules/layout/templates/nav";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default async function PageLayout({
  params,
  children,
}: {
  params: { subdomain: string };
  children: React.ReactNode;
}) {
  return (
    <>
      {/* @ts-ignore */}
      <Nav subdomain={params.subdomain} />
      {children}
      {/* @ts-ignore */}
      <Footer />
    </>
  );
}