'use client';

import { useState } from 'react';

export default function Home() {
  const [shareText, setShareText] = useState('');
  const [result, setResult] = useState<{text: string; aitext: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ share_text: shareText }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        alert('提取失败，请重试');
      }
    } catch (error) {
      alert('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              🌶️ 辣辣抖音视频文案助手
            </h1>
            <p className="text-lg text-amber-700">
              智能提取抖音视频文案，AI改写让内容更精彩
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-amber-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="shareText" className="block text-lg font-semibold text-amber-900 mb-3">
                  粘贴抖音分享链接或文本
                </label>
                <textarea
                  id="shareText"
                  value={shareText}
                  onChange={(e) => setShareText(e.target.value)}
                  placeholder="例如：7.12 08/13 G@I.vF TYM:/ 上万个儿童睡前故事免费听... https://v.douyin.com/qydwTV-FrFM/"
                  className="w-full h-32 px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none text-gray-700 placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? '🔄 正在提取中...' : '🚀 开始提取文案'}
              </button>
            </form>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-200">
                <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                  📝 原始文案
                </h2>
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.text}</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-200">
                <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                  ✨ AI改写文案
                </h2>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.aitext}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(result.aitext)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    📋 复制改写文案
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(result.text)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    📋 复制原始文案
                  </button>
                </div>
              </div>
            </div>
          )}

          <footer className="text-center mt-16 text-amber-700">
            <p>© 2025 辣辣AI赋能</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
