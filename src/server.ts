import express, { Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const server = new McpServer({
  name: "business-tools-mcp",
  version: "1.0.0",
});

// PowerShell Script Execution Tool
const executePowerShellCommand = server.tool(
  "execute-powershell-command",
  "Execute a PowerShell command and return the result",
  {
    command: z.string().describe("PowerShell command to execute"),
    timeoutMs: z.number().optional().describe("Timeout in milliseconds (default: 30000)"),
  },
  async (params: { command: string; timeoutMs?: number }) => {
    try {
      // In a real implementation, you would execute PowerShell here
      // For demo purposes, we'll simulate common PowerShell operations
      const timeout = params.timeoutMs || 30000;
      
      // Simulate execution delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Mock responses for common PowerShell commands
      let result = "";
      const cmd = params.command.toLowerCase();
      
      if (cmd.includes("get-process")) {
        result = "ProcessName    Id  CPU(s)   WorkingSet\n-----------    --  ------   ----------\nchrome        1234  45.67   256,789,012\nvsCode        5678  12.34   123,456,789\npowershell    9012   2.15    45,678,901";
      } else if (cmd.includes("get-service")) {
        result = "Status   Name               DisplayName\n------   ----               -----------\nRunning  Themes             Themes\nStopped  TrustedInstaller   Windows Modules Installer\nRunning  W32Time            Windows Time";
      } else if (cmd.includes("get-location") || cmd.includes("pwd")) {
        result = "Path\n----\nC:\\Users\\Administrator";
      } else if (cmd.includes("get-date")) {
        result = new Date().toISOString();
      } else {
        result = `Executed PowerShell command: ${params.command}\nTimeout: ${timeout}ms\n\n[This is a demo response. In production, this would execute the actual PowerShell command.]`;
      }
      
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error executing PowerShell command: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
      };
    }
  }
);

// REST API Client Tool
const makeApiRequest = server.tool(
  "make-api-request",
  "Make a REST API request to any endpoint",
  {
    url: z.string().describe("The API endpoint URL"),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).describe("HTTP method"),
    headers: z.record(z.string()).optional().describe("HTTP headers as key-value pairs"),
    body: z.string().optional().describe("Request body (JSON string)"),
    timeout: z.number().optional().describe("Request timeout in milliseconds (default: 30000)"),
  },
  async (params: { 
    url: string; 
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; 
    headers?: Record<string, string>; 
    body?: string;
    timeout?: number;
  }) => {
    try {
      const { url, method, headers = {}, body, timeout = 30000 } = params;
      
      // Set default headers
      const defaultHeaders = {
        "Content-Type": "application/json",
        "User-Agent": "BusinessToolsMCP/1.0.0",
        ...headers,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: body && method !== "GET" ? body : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();
      let responseData;
      
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              status: response.status,
              statusText: response.statusText,
              headers: Object.fromEntries(response.headers.entries()),
              data: responseData,
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
      };
    }
  }
);

// Azure Resource Information Tool
const getAzureResourceInfo = server.tool(
  "get-azure-resource-info",
  "Get information about Azure resources (demo version)",
  {
    resourceType: z.enum([
      "vm", 
      "storage", 
      "webapp", 
      "database", 
      "keyvault", 
      "containerapp"
    ]).describe("Type of Azure resource"),
    resourceName: z.string().optional().describe("Specific resource name (optional)"),
  },
  async (params: { resourceType: string; resourceName?: string }) => {
    try {
      // In a real implementation, you would use Azure SDK or REST API
      // For demo purposes, we'll return mock Azure resource information
      
      const { resourceType, resourceName } = params;
      
      let resourceInfo = "";
      
      switch (resourceType) {
        case "vm":
          resourceInfo = `Azure Virtual Machine Information:
Name: ${resourceName || 'demo-vm-001'}
Status: Running
Size: Standard_D2s_v3
Location: East US
OS: Windows Server 2022
Public IP: 20.123.45.67
Private IP: 10.0.1.4
Resource Group: rg-production`;
          break;
          
        case "storage":
          resourceInfo = `Azure Storage Account Information:
Name: ${resourceName || 'demostorage001'}
Kind: StorageV2
Performance Tier: Standard
Replication: LRS (Locally Redundant Storage)
Location: East US
Used Capacity: 1.2 TB / 5 TB
Access Tier: Hot`;
          break;
          
        case "webapp":
          resourceInfo = `Azure Web App Information:
Name: ${resourceName || 'demo-webapp-001'}
Status: Running
Runtime: .NET 8.0
Location: East US
URL: https://demo-webapp-001.azurewebsites.net
App Service Plan: Standard S1
SSL Enabled: Yes`;
          break;
          
        case "database":
          resourceInfo = `Azure SQL Database Information:
Name: ${resourceName || 'demo-database'}
Status: Online
Edition: Standard
Service Tier: S2
Location: East US
DTU: 50
Storage: 100 GB
Backup Retention: 7 days`;
          break;
          
        case "keyvault":
          resourceInfo = `Azure Key Vault Information:
Name: ${resourceName || 'demo-keyvault-001'}
Status: Active
Location: East US
Pricing Tier: Standard
Secrets: 15
Keys: 5
Certificates: 3
Access Policies: 8`;
          break;
          
        case "containerapp":
          resourceInfo = `Azure Container App Information:
Name: ${resourceName || 'demo-containerapp'}
Status: Running
Location: East US
Image: mcr.microsoft.com/azuredocs/containerapps-helloworld:latest
Replicas: 2/3
CPU: 0.5 cores
Memory: 1.0 Gi
Ingress: Enabled (HTTPS)`;
          break;
          
        default:
          resourceInfo = `Resource type '${resourceType}' not recognized.`;
      }
      
      return {
        content: [
          {
            type: "text",
            text: resourceInfo + "\n\n[This is demo data. In production, this would connect to Azure APIs to retrieve real resource information.]",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error retrieving Azure resource information: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
      };
    }
  }
);

// System Information Tool
const getSystemInfo = server.tool(
  "get-system-info",
  "Get system information and environment details",
  {
    infoType: z.enum([
      "environment", 
      "disk", 
      "network", 
      "performance"
    ]).describe("Type of system information to retrieve"),
  },
  async (params: { infoType: string }) => {
    try {
      let systemInfo = "";
      
      switch (params.infoType) {
        case "environment":
          systemInfo = `System Environment Information:
OS: Windows Server 2022
Architecture: x64
.NET Version: 8.0.1
PowerShell Version: 7.4.1
Node.js Version: 20.11.0
Azure CLI Version: 2.57.0
Current User: Administrator
Computer Name: DEMO-SERVER-01
Domain: WORKGROUP`;
          break;
          
        case "disk":
          systemInfo = `Disk Space Information:
C:\\ Drive: 78.5 GB free of 127 GB (62% used)
D:\\ Drive: 245 GB free of 500 GB (51% used)
E:\\ Drive: 1.2 TB free of 2 TB (40% used)

Disk Performance:
Average Read Time: 5ms
Average Write Time: 8ms
Queue Length: 2`;
          break;
          
        case "network":
          systemInfo = `Network Information:
Ethernet Adapter:
  Status: Connected
  Speed: 1 Gbps
  IP Address: 192.168.1.100
  Subnet: 255.255.255.0
  Gateway: 192.168.1.1
  DNS Servers: 8.8.8.8, 8.8.4.4

Network Utilization:
  Bytes Sent: 2.3 MB/s
  Bytes Received: 1.8 MB/s`;
          break;
          
        case "performance":
          systemInfo = `System Performance:
CPU Usage: 35%
Memory Usage: 6.2 GB / 16 GB (39%)
Available Memory: 9.8 GB
Committed Memory: 8.1 GB
Page File Usage: 2.1 GB / 19 GB

Top Processes by CPU:
1. w3wp.exe - 12%
2. sqlservr.exe - 8%
3. node.exe - 6%`;
          break;
          
        default:
          systemInfo = `Information type '${params.infoType}' not recognized.`;
      }
      
      return {
        content: [
          {
            type: "text",
            text: systemInfo + "\n\n[This is demo data simulating system information.]",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error retrieving system information: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
      };
    }
  }
);

const app = express();
app.use(express.json());

const transport: StreamableHTTPServerTransport =
  new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // set to undefined for stateless servers
  });

// Setup routes for the server
const setupServer = async () => {
  await server.connect(transport);
};

app.post("/mcp", async (req: Request, res: Response) => {
  console.log("Received MCP request:", req.body);
  try {
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

app.get("/mcp", async (req: Request, res: Response) => {
  console.log("Received GET MCP request");
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    })
  );
});

app.delete("/mcp", async (req: Request, res: Response) => {
  console.log("Received DELETE MCP request");
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    })
  );
});

// Start the server
const PORT = process.env.PORT || 3000;
setupServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Business Tools MCP Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to set up the server:", error);
    process.exit(1);
  });
