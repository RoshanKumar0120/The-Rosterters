# Council MCP Server

Tools for LLM Council agents: Wikipedia, PubMed medical search, FDA drug info, hospital finder (OpenStreetMap), and Guardian news.

## Tools

| Tool | Source | Key needed | Free limit |
|---|---|---|---|
| `wiki_search` | Wikipedia REST API | No | Unlimited |
| `medical_search` | PubMed (NCBI) | Optional | Unlimited (3 req/s → 10 with key) |
| `drug_info` | Open FDA | No | 1000 req/day |
| `find_hospital` | OpenStreetMap Overpass | No | Unlimited |
| `news_search` | The Guardian API | Optional | 12/day (test) → 500/day (free key) |

---

## Setup

### 1. Install dependencies

```bash
cd council-mcp-server
npm install
```

### 2. Add optional API keys (improves rate limits)

```bash
cp .env.example .env
# Fill in NCBI_API_KEY and GUARDIAN_API_KEY if you have them
# Both are free — links are in .env.example
```

### 3. Test the server manually

```bash
node index.js
# Should print: Council MCP server running — tools: wiki_search ...
# Press Ctrl+C to stop
```

---

## Connect to VS Code (GitHub Copilot)

VS Code reads MCP server config from `.vscode/mcp.json` in your workspace root.

### Step 1 — Create `.vscode/mcp.json` in your project root

```json
{
  "servers": {
    "council-tools": {
      "type": "stdio",
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/council-mcp-server/index.js"],
      "env": {
        "NCBI_API_KEY": "your_ncbi_key_here",
        "GUARDIAN_API_KEY": "your_guardian_key_here"
      }
    }
  }
}
```

Replace `/ABSOLUTE/PATH/TO/` with the actual path on your machine.

**Windows example:**
```json
"args": ["C:\\Users\\Roshan\\projects\\council-mcp-server\\index.js"]
```

**Mac/Linux example:**
```json
"args": ["/home/roshan/projects/council-mcp-server/index.js"]
```

### Step 2 — Enable MCP in VS Code settings

Open VS Code settings (`Ctrl+,`), search for `mcp`, and make sure:
- `GitHub Copilot: Enable MCP Servers` is checked ✓

Or add to your `settings.json`:
```json
{
  "github.copilot.chat.mcp.enabled": true
}
```

### Step 3 — Reload VS Code

Press `Ctrl+Shift+P` → `Developer: Reload Window`

### Step 4 — Verify tools are connected

Open Copilot Chat (`Ctrl+Shift+I`), click the tools icon (⚙), and you should see:
- wiki_search
- medical_search
- drug_info
- find_hospital
- news_search

### Step 5 — Use in Copilot Chat

```
@workspace find hospitals near Andheri Mumbai for cardiology
@workspace search Wikipedia for Julius Caesar
@workspace search PubMed for metformin diabetes treatment
```

---

## Connect to Claude Desktop

Add to `claude_desktop_config.json`:

**Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "council-tools": {
      "command": "node",
      "args": ["/absolute/path/to/council-mcp-server/index.js"],
      "env": {
        "NCBI_API_KEY": "your_key",
        "GUARDIAN_API_KEY": "your_key"
      }
    }
  }
}
```

---

## Connect to LLM Council Backend

In your `backend/services/llmClient.js`, add:

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let _mcpClient = null;

async function getMcpClient() {
  if (_mcpClient) return _mcpClient;
  const transport = new StdioClientTransport({
    command: "node",
    args: ["../council-mcp-server/index.js"],
    env: {
      ...process.env,
      NCBI_API_KEY: process.env.NCBI_API_KEY,
      GUARDIAN_API_KEY: process.env.GUARDIAN_API_KEY,
    },
  });
  _mcpClient = new Client({ name: "council-backend", version: "1.0.0" });
  await _mcpClient.connect(transport);
  return _mcpClient;
}

export async function callMcpTool(toolName, args) {
  const client = await getMcpClient();
  const result = await client.callTool({ name: toolName, arguments: args });
  return result.content?.[0]?.text || "";
}
```

Then call from any agent:
```javascript
const wikiResult = await callMcpTool("wiki_search", { query: "Roman Empire" });
const hospitals  = await callMcpTool("find_hospital", { condition: "cardiology", location: "Bandra, Mumbai", radius_km: 5 });
const medPapers  = await callMcpTool("medical_search", { query: "metformin diabetes", max_results: 3 });
```

---

## Free API Registration Links

| Service | Link | Time to get key |
|---|---|---|
| NCBI/PubMed | https://ncbi.nlm.nih.gov/account | 2 minutes |
| The Guardian | https://open-platform.theguardian.com | 2 minutes |
| Wikipedia | No signup needed | — |
| OpenStreetMap | No signup needed | — |
| Open FDA | No signup needed | — |