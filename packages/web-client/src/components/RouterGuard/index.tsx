import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { selectToken } from '@/store/slices/authSlice';
import { message } from 'antd';
import { isWhiteRoute } from '@/routes';

interface RouterGuardProps {
  children: React.ReactNode;
}

const RouterGuard: React.FC<RouterGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector(selectToken);
  const currentPath = location.pathname;

  useEffect(() => {
    if (!token && !isWhiteRoute(currentPath)) {
      message.warning('请先登录');
      navigate('/login', {
        replace: true,
        state: { from: location }
      });
      return;
    }

    if (token && currentPath === '/login') {
      navigate('/', { replace: true });
    }
  }, [token, currentPath, navigate, location]);

  return <>{children}</>;
};

export default RouterGuard; 