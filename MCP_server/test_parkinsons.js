import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function searchParkinsons() {
  try {
    console.log("🔌 Connecting to MCP server...");
    
    const transport = new StdioClientTransport({
      command: "node",
      args: ["c:\\Users\\arshk\\OneDrive\\Desktop\\CodeCrafter\\The-Rosterters\\MCP_server\\index.js"],
      env: {
        ...process.env,
      },
    });

    const client = new Client({ 
      name: "test-client", 
      version: "1.0.0" 
    });

    await client.connect(transport);
    console.log("✅ Connected to MCP server\n");

    // Search Wikipedia for Parkinson's Dementia
    console.log("🔍 Searching Wikipedia for 'Parkinson dementia disease'...\n");
    const wikiResult = await client.callTool({
      name: "wiki_search",
      arguments: { query: "Parkinson dementia disease" }
    });

    console.log("📖 Wikipedia Result:");
    console.log(wikiResult.content[0].text);
    console.log("\n" + "=".repeat(80) + "\n");

    // Search PubMed for medical research
    console.log("🔬 Searching PubMed for 'Parkinson dementia disease' research...\n");
    const medResult = await client.callTool({
      name: "medical_search",
      arguments: { 
        query: "Parkinson dementia disease",
        max_results: 3
      }
    });

    console.log("📚 PubMed Research Results:");
    console.log(medResult.content[0].text);

    await transport.close();
    console.log("\n✅ Search completed!");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

searchParkinsons();
