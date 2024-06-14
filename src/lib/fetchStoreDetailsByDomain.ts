
export const fetchStoreDetailsByDomain = async (subdomain: string, options?: RequestInit) => {
  console.log("Store : ",`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/store_by_domain/?domain=${subdomain}`)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/store_by_domain/?domain=${subdomain}`,
      {
        ...options,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};