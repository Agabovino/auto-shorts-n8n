import { NextResponse } from 'next/server'

interface Video {
  link: string;
  category: string;
}

let videos: Video[] = []

export async function POST(request: Request) {
  const data = await request.json()
  videos.push(data)
  return NextResponse.json(data)
}

export async function GET() {
  return NextResponse.json(videos)
}