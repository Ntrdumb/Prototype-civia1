import { NextResponse } from 'next/server';

// const serverURL = process.env.SERVER_API;

export const maxDuration = 180;
export const dynamic = "force-dynamic";
const apiUrl = 'http://34.41.106.140:8080/api/sagard_qna';

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
        throw new Error("Empty request body");
    }

    const { user_query } = body;
    if (!user_query) {
      return NextResponse.json({ error: 'A user query is required' }, { status: 400 });
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data from external API');
    }

    const result = await response.json();
    console.log(result);

    return NextResponse.json({chunks: result.chunks, botResponse: result.reponse}, { status: 200 });
  } catch (error) {
    console.error('Error with External API request:', error);
    return NextResponse.json({ error: 'An error occurred while communicating with the external API' }, { status: 500 });
  }
}
