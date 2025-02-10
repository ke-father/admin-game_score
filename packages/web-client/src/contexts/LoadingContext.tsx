import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false, // 初始值改为 false，因为已经有 HTML loading
  progress: 0,
  setLoading: () => {},
  setProgress: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;

    const handleProgress = () => {
      const resources = performance.getEntriesByType('resource');
      const total = resources.length;
      const loaded = resources.filter(r => r.duration > 0).length;
      const percentage = Math.min(Math.round((loaded / total) * 100), 99);

      if (mounted) {
        setProgress(percentage);
      }
    };

    // 使用 PerformanceObserver 监听后续资源加载
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(() => {
        handleProgress();
      });

      observer.observe({ entryTypes: ['resource'] });

      return () => {
        observer.disconnect();
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, progress, setLoading, setProgress }}>
      {children}
    </LoadingContext.Provider>
  );
};
