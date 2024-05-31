import { useQuery } from '@tanstack/react-query';

const fetchDomainProducts = async (domain) => {
  const response = await fetch(`http://localhost:9000/store/fetch_by_domain/?domain=${domain}`);
  return response.json();
};

export const useDomainProducts = (domain) => {
  const { data, isLoading, isError, error } = useQuery(['domainProducts', domain], () => fetchDomainProducts(domain));

  return { data, isLoading, isError, error };
};