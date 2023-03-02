import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
  allowedRoles: number[],
}

function RequireAuth({allowedRoles}: Props) {
  const {auth} = useAuth();
  const location = useLocation();
  return (
    auth?.roles?.find(role => allowedRoles?.includes(role)) 
    ? <Outlet /> 
    : auth?.user 
      ? <Navigate to="/unauthorized" state={{from: location}} replace />
      : <Navigate to="/login" state={{from: location}} replace /> // 
  )
}

export default RequireAuth