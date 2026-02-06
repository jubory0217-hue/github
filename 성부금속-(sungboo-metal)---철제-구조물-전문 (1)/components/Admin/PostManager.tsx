
import React, { useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { Post } from '../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const PostManager: React.FC = () => {
  const { state, addPost, updatePost, deletePost } = useSite();
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);

  const handleSave = () => {
    if (!editingPost?.title) return alert('제목을 입력하세요.');
    
    const postToSave: Post = {
      id: editingPost.id || Date.now().toString(),
      title: editingPost.title || '',
      category: editingPost.category || '기타',
      content: editingPost.content || '',
      imageUrl: editingPost.imageUrl || `https://picsum.photos/seed/${Date.now()}/800/600`,
      date: new Date().toISOString().split('T')[0],
      isPublished: editingPost.isPublished ?? true
    };

    if (editingPost.id) {
      updatePost(postToSave);
    } else {
      addPost(postToSave);
    }
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">포트폴리오 관리</h3>
        <button 
          onClick={() => setEditingPost({})}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm"
        >
          <Plus size={16} /> 새 게시물 추가
        </button>
      </div>

      {editingPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h4 className="text-xl font-bold">{editingPost.id ? '게시물 수정' : '새 게시물 작성'}</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">제목</label>
                <input 
                  value={editingPost.title || ''}
                  onChange={e => setEditingPost({...editingPost, title: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">카테고리</label>
                  <select 
                    value={editingPost.category || '기타'}
                    onChange={e => setEditingPost({...editingPost, category: e.target.value as any})}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="계단">계단</option>
                    <option value="난간">난간</option>
                    <option value="대문">대문</option>
                    <option value="복층공사">복층공사</option>
                    <option value="철구조물">철구조물</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">이미지 URL</label>
                  <input 
                    value={editingPost.imageUrl || ''}
                    onChange={e => setEditingPost({...editingPost, imageUrl: e.target.value})}
                    placeholder="https://..."
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">내용</label>
                <textarea 
                  value={editingPost.content || ''}
                  onChange={e => setEditingPost({...editingPost, content: e.target.value})}
                  rows={5}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setEditingPost(null)}
                className="px-6 py-2 border rounded-lg"
              >
                취소
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-black text-white rounded-lg"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {state.posts.map(post => (
          <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <img src={post.imageUrl} className="w-16 h-16 object-cover rounded-lg" alt="" />
              <div>
                <p className="font-bold">{post.title}</p>
                <p className="text-xs text-gray-500">{post.category} • {post.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => updatePost({...post, isPublished: !post.isPublished})}
                className="p-2 hover:bg-white rounded-lg text-gray-500"
              >
                {post.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button 
                onClick={() => setEditingPost(post)}
                className="p-2 hover:bg-white rounded-lg text-blue-500"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => { if(confirm('삭제하시겠습니까?')) deletePost(post.id) }}
                className="p-2 hover:bg-white rounded-lg text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostManager;
