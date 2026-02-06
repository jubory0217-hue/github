
import React from 'react';
import { useSite } from '../../store/SiteContext';
import { Save, RefreshCw } from 'lucide-react';

const ThemeEditor: React.FC = () => {
  const { state, updateConfig, resetToDefault } = useSite();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updateConfig({
        ...state.config,
        [parent]: {
          ...(state.config[parent as keyof typeof state.config] as any),
          [child]: value
        }
      });
    } else {
      updateConfig({
        ...state.config,
        [name]: value
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">기본 정보 및 디자인</h3>
        <button 
          onClick={resetToDefault}
          className="flex items-center gap-2 text-xs text-red-500 hover:bg-red-50 p-2 rounded"
        >
          <RefreshCw size={14} />
          초기화
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사이트 이름</label>
            <input
              name="siteName"
              value={state.config.siteName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">메인 슬로건</label>
            <input
              name="tagline"
              value={state.config.tagline}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">포인트 컬러 (금색 등)</label>
            <div className="flex gap-2">
              <input
                type="color"
                name="primaryColor"
                value={state.config.primaryColor}
                onChange={handleChange}
                className="h-10 w-20 border-none rounded cursor-pointer"
              />
              <input
                name="primaryColor"
                value={state.config.primaryColor}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold outline-none uppercase"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처 이메일</label>
            <input
              name="contactEmail"
              value={state.config.contactEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대표 번호</label>
            <input
              name="contactPhone"
              value={state.config.contactPhone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
            <input
              name="address"
              value={state.config.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <h4 className="text-lg font-bold mb-4">SEO 설정</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO 제목 (브라우저 탭)</label>
            <input
              name="seo.title"
              value={state.config.seo.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO 설명 (검색 결과)</label>
            <textarea
              name="seo.description"
              value={state.config.seo.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;
