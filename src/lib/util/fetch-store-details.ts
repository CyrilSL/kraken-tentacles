export async function fetchStoreDetails(domain: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/store_by_domain/?domain=${domain}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    
  
    // Extract the name value from the store object
    return data;
  }