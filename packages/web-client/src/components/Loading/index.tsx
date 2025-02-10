import React from 'react';
import { Spin } from 'antd';
import './style.scss';

interface LoadingProps {
  tip?: string;
}

const Loading: React.FC<LoadingProps> = ({ tip = '加载中...' }) => {
  return (
    <div className="loading-container">
      <Spin size="large" tip={tip} />
    </div>
  );
};

export default Loading; 