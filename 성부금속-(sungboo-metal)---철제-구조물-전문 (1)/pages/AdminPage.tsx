
import React, { useState } from 'react';
import { useSite } from '../store/SiteContext';
import { Palette, FileText, BarChart, ArrowLeft, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeEditor from '../components/Admin/ThemeEditor';
import PostManager from '../components/Admin/PostManager';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'theme' | 'posts' | 'stats'>('theme');
  const { state } = useSite();

  const LOGO_IMAGE_URL = "https://postfiles.pstatic.net/MjAyNjAyMDZfMTEx/MDAxNzcwMzgzNzQwMjI5.lBmm_oaMCd4d_ldC9qq9hoSZynndE77znANCGStkVAog.FzUBR7kwf__k5T4F6G7v8r0mDVwBWO8QIadbialWANwg.PNG/KakaoTalk_20221022_202828221_03.png?type=w966";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center justify-center">
              <img 
                src={LOGO_IMAGE_URL} 
                alt="Admin Logo" 
                className="h-10 w-auto object-contain bg-gray-900 p-1 rounded-lg"
              />
            </div>
            <span className="font-black text-lg">Admin Panel</span>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'theme' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Palette size={20} /> 테마 및 설정
            </button>
            <button 
              onClick={() => setActiveTab('posts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'posts' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <FileText size={20} /> 포트폴리오 관리
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <BarChart size={20} /> 사이트 분석
            </button>
          </nav>
        </div>

        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-black text-sm">
            <ArrowLeft size={16} /> 사이트로 돌아가기
          </Link>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm">
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-black text-gray-900">
              {activeTab === 'theme' ? '디자인 및 설정' : activeTab === 'posts' ? '콘텐츠 관리' : '데이터 분석'}
            </h1>
            <p className="text-gray-500">사이트의 모든 요소를 실시간으로 변경하고 관리할 수 있습니다.</p>
          </header>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[70vh]">
            {activeTab === 'theme' && <ThemeEditor />}
            {activeTab === 'posts' && <PostManager />}
            {activeTab === 'stats' && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="p-6 bg-gray-50 rounded-full text-gray-400">
                  <BarChart size={48} />
                </div>
                <h3 className="text-xl font-bold">방문자 데이터 수집 중</h3>
                <p className="text-gray-500">현재 트래픽 정보를 분석하고 있습니다. 나중에 다시 확인해 주세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
