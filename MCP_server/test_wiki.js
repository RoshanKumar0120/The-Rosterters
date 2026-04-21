import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function testWikiSearch() {
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

    // List available tools
    const tools = await client.listTools();
    console.log("📋 Available tools:");
    tools.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });
    console.log();

    // Call wiki_search for "diagnosis"
    console.log("🔍 Searching Wikipedia for 'diagnosis'...\n");
    const result = await client.callTool({
      name: "wiki_search",
      arguments: { query: "diagnosis" }
    });

    console.log("📖 Result:");
    console.log(result.content[0].text);

    await transport.close();
    console.log("\n✅ Test completed!");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

testWikiSearch();
