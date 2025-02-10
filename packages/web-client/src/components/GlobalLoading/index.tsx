import React from 'react';
import { Progress } from 'antd';
import { useLoading } from '@/contexts/LoadingContext';
import Loading from '../Loading';
import './style.css';

const GlobalLoading: React.FC = () => {
  const { isLoading, progress } = useLoading();

  // 只在动态加载时显示
  if (!isLoading) return null;

  return (
    <div className="global-loading-container">
      <Loading tip={`加载中 ${progress}%`} />
      <div className="progress-bar">
        <Progress percent={progress} showInfo={false} />
      </div>
    </div>
  );
};

export default GlobalLoading; 