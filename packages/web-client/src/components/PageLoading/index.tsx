import React from 'react';
import { Spin } from 'antd';
import './style.scss';

const PageLoading: React.FC = () => (
  <div className="page-loading">
    <Spin size="large" />
  </div>
);

export default PageLoading; 