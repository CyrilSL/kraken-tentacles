'use client'
import { useAdminStore, useAdminCustomPost } from "medusa-react";
import React, { useState } from "react";

type DomainUpdateRequest = {
  storeId: string;
  domain: string;
};

type DomainUpdateResponse = {
  message: string;
};

function Store() {
  const { store, isLoading } = useAdminStore();
  const [domain, setDomain] = useState("");

  const updateDomain = useAdminCustomPost<DomainUpdateRequest, DomainUpdateResponse>(
    "/admin/set_domain", []
);

  const handleUpdate = () => {
    if (!store?.id || !domain) {
      console.error("Missing required values: storeId or domain");
      return;
    }

    updateDomain.mutate(
      {
        storeId: store.id,
        domain,
      },
      {
        onSuccess: ({ message }) => {
          console.log(message);
        },
      }
    );
  };

  return (
    <div>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter new domain"
      />
      <button onClick={handleUpdate}>Update Domain</button>
    </div>
  );
}

export default Store;