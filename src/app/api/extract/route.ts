import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { share_text } = await request.json();

    if (!share_text) {
      return NextResponse.json(
        { error: '请提供分享文本' },
        { status: 400 }
      );
    }

    const response = await fetch('http://localhost:5678/webhook/033c09af-7a51-4570-9852-a9aa6b8b5964', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({
        share_text: share_text
      })
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      text: data.text || '',
      aitext: data.aitext || ''
    });

  } catch (error) {
    console.error('API调用错误:', error);
    return NextResponse.json(
      { error: '服务暂时不可用，请稍后重试' },
      { status: 500 }
    );
  }
}