import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function findHospitals() {
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

    // Search for heart specialized hospitals in Ludhiana, Punjab
    console.log("🏥 Searching for heart specialized hospitals in Ludhiana, Punjab...\n");
    const hospitalResult = await client.callTool({
      name: "find_hospital",
      arguments: { 
        condition: "cardiology",
        location: "Ludhiana, Punjab",
        radius_km: 10
      }
    });

    console.log("🏥 Hospital Search Results:");
    console.log(hospitalResult.content[0].text);

    await transport.close();
    console.log("\n✅ Search completed!");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

findHospitals();
