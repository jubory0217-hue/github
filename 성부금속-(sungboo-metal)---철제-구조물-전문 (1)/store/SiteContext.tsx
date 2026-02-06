
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, SiteConfig, Post } from '../types';
import { INITIAL_STATE } from '../constants';

interface SiteContextType {
  state: AppState;
  updateConfig: (config: SiteConfig) => void;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  resetToDefault: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('sungboo_metal_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('sungboo_metal_state', JSON.stringify(state));
  }, [state]);

  const updateConfig = (config: SiteConfig) => {
    setState(prev => ({ ...prev, config }));
  };

  const addPost = (post: Post) => {
    setState(prev => ({ ...prev, posts: [post, ...prev.posts] }));
  };

  const updatePost = (post: Post) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(p => (p.id === post.id ? post : p))
    }));
  };

  const deletePost = (id: string) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== id)
    }));
  };

  const resetToDefault = () => {
    if (confirm('모든 설정이 초기화됩니다. 계속하시겠습니까?')) {
      setState(INITIAL_STATE);
    }
  };

  return (
    <SiteContext.Provider value={{ state, updateConfig, addPost, updatePost, deletePost, resetToDefault }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within SiteProvider');
  return context;
};
