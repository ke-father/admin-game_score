import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';

// 懒加载路由组件
const Home = lazy(() => import('@/pages/Home'));
const CreateGame = lazy(() => import('@/pages/CreateGame'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const GameInfo = lazy(() => import('@/pages/GameInfo'));
const GameLayout = lazy(() => import('@/layout/GameLayout'))
// 路由配置
export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // 其他需要布局的路由在这里添加
      {
        path: 'createGame',
        element: <CreateGame />
      }
    ],
  },
  {
    path: '/game',
    element: <GameLayout />,
    children:[
      {
        path: 'info',
        element: <GameInfo />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

// 白名单路由（不需要登录就能访问的路由）
// export const whiteList = ['/login', '/register'];
export const whiteList = ['/'];

// 路由工具函数
export const isWhiteRoute = (path: string) => {
  return whiteList.some(route => path.startsWith(route));
};
