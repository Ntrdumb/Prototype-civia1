import { NextResponse } from "next/server";
import { Client } from "@elastic/elasticsearch";

const es = new Client({ node: process.env.ELASTICSEARCH_URL });
const KIBANA_URL = process.env.KIBANA_URL;

export async function POST(req) {
  try {
    const { indexName } = await req.json();

    if (!indexName) {
      return NextResponse.json(
        { error: "Index name is required" },
        { status: 400 }
      );
    }

    // ElasticSearch dont accept capital case, just follow the rules
    const cleanedIndexName = indexName
      .toLowerCase()
      .replace(/[^a-z0-9_\-]/g, "_");

    // Data Index (Check Data/Index Management in ElasticSearch)
    await es.indices.create({
      index: cleanedIndexName,
    });

    // For the Kibana view in ElastiCSearch Analytics/Discover
    const response = await fetch(`${KIBANA_URL}/api/saved_objects/index-pattern/${cleanedIndexName}`, {
      method: "POST",
      headers: {
        "kbn-xsrf": "true", 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attributes: {
          title: cleanedIndexName,
          timeFieldName: null,
        },
      }),
    });

    /**
     * So basically after adding all these, go to your KibanaUrl/app, 
     * Open the burger menu and scroll down to Management, Stack Management
     * Then in Data/Index Management, verify that the uploaded bdd is there,
     * Then also check in Kibana Index Patterns that it's there, FOR BOTH CASES, epand the row per pages if you don't see them
     * At the end, go back to KibanaUrl/App/Discover and check if the index is there.
     */
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to create index pattern: ${errorText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: `Index "${cleanedIndexName}" and index pattern created successfully.`,
    });
  } catch (error) {
    console.error("Error creating index and index pattern:", error);
    return NextResponse.json(
      { error: "An error occurred while creating index or index pattern." },
      { status: 500 }
    );
  }
}
