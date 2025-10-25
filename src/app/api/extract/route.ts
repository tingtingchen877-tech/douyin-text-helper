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

    // 示例：直接返回原文本 + 简单 AI 改写
    // 后续可换成真实抖音解析包
    const text = share_text;
    const aitext = share_text.replace(/。/g, '！'); // 仅演示

    return NextResponse.json({ text, aitext });
  } catch (error) {
    console.error('API 调用错误:', error);
    return NextResponse.json(
      { error: '服务暂时不可用，请稍后重试' },
      { status: 500 }
    );
  }
}
