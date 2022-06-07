import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { makeHrefToPage } from '../utils';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (to: string, params: { [key: string]: string } = {}) => {
    navigate(makeHrefToPage(searchParams, to, params));
  };
};
