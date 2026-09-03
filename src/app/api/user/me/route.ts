// 프론트엔드 -> 마이페이지 정보를 주세요

// 1. 쿠키에서 토큰을 꺼내기
// 2. 외부 백엔드에 넣어서 보내기
// 3. 외부 백엔드에서 받은 데이터를 다시 프론트엔드로 보낸다.

// src/app/api/user/me/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "인증 토큰이 없습니다." },
        { status: 401 },
      );
    }

    // Express 백엔드로 사용자 정보 요청 전달
    const response = await fetch(`${BACKEND_URL}/api/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // 토큰이 만료되었거나 유효하지 않은 경우 쿠키 삭제
      if (response.status === 401 || response.status === 403) {
        cookieStore.delete("token");
      }
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
