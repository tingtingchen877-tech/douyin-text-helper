import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { share_text } = await request.json();
    if (!share_text) {
      return NextResponse.json({ error: '请提供分享文本' }, { status: 400 });
    }

    // 用 ngrok 隧道调用本地 8000 抖音解析 API
    const response = await fetch('https://avery-unseared-lilith.ngrok-free.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ share_text }),
    });

    if (!response.ok) throw new Error('API 请求失败');

    const data = await response.json();
    const aitext = data.title.replace(/。/g, '!'); // 简单演示改写

    return NextResponse.json({ text: data.title, aitext });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: '服务暂时不可用' }, { status: 500 });
  }
}
