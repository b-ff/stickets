import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Routes } from '../../popup/enums/Routes';
import { makeHrefToPage } from '../utils';

export const useAppNavigate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (to: Routes, params: { [key: string]: string } = {}) => {
    navigate(makeHrefToPage(searchParams, to, params));
  };
};
