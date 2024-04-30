'use client'
import React, { useState, useEffect } from 'react';
import { useAdminGetSession, useAdminCustomQuery, useAdminCustomDelete } from "medusa-react";
import { Checkbox, Label, Table, Heading, Button, Container } from "@medusajs/ui";
import { useAdminStore } from "medusa-react"



const StoreDetails = () => {
    const { 
        store,
        isLoading
      } = useAdminStore();
      console.log(store);
  return (
    <Container>
      <div>
      <h2>Admin Store Data</h2>
      {/* Display your store data here */}
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
    </Container>
  );
};

export default StoreDetails;
