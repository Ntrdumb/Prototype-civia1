import { NextResponse } from 'next/server';

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL;

export async function POST(req) {
  try {
    const { indexName } = await req.json();

    if (!indexName) {
      return NextResponse.json(
        { error: "Index name is required" },
        { status: 400 }
      );
    }

    const sanitizedIndexName = indexName.toLowerCase().replace(/\s+/g, "_");

    const response = await fetch(`${ELASTICSEARCH_URL}/${sanitizedIndexName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to create index: ${errorText}` },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: `Index "${sanitizedIndexName}" created successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Elasticsearch index:", error);
    return NextResponse.json(
      { error: "An error occurred while communicating with Elasticsearch." },
      { status: 500 }
    );
  }
}
