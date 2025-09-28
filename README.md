# Microsoft Copilot Studio ❤️ MCP

Welcome to the **Microsoft Copilot Studio ❤️ MCP** lab. In this lab, you will learn how to deploy an MCP Server with practical business tools, and how to add it to Microsoft Copilot Studio.

## 🛠️ Business Tools Included

This MCP server provides several practical business tools:

### 1. 🔧 PowerShell Execution
- Execute PowerShell commands and scripts
- Get system processes, services, and status information
- Perfect for system administration and automation tasks

### 2. 🌐 REST API Client
- Make HTTP requests to any REST API endpoint
- Support for GET, POST, PUT, DELETE, and PATCH methods
- Custom headers and request bodies
- Ideal for integrating with third-party APIs

### 3. ☁️ Azure Resource Information
- Query Azure resource details (VMs, Storage, Web Apps, Databases, etc.)
- Get resource status and configuration information
- Helpful for cloud infrastructure management

### 4. 📊 System Information
- Retrieve environment details and system specifications
- Monitor disk space, network, and performance metrics
- Essential for system monitoring and troubleshooting

## ❓ What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is an open protocol that standardizes how applications provide context to LLMs, defined by [Anthropic](https://www.anthropic.com/). MCP provides a standardized way to connect AI models to different data sources and tools. MCP allows makers to seamlessly integrate existing knowledge servers and APIs directly into Copilot Studio.

Currently, Copilot Studio only supports Tools. To learn more about current capabilities, see [aka.ms/mcsmcp](https://aka.ms/mcsmcp). There are some known issues & planned improvements. These are listed [here](#known-issues-and-planned-improvements).

## 🆚 MCP vs Connectors

When do you use MCP? And when do you use connectors? Will MCP replace connectors?

MCP servers are made available to Copilot Studio using connector infrastructure, so these questions are not really applicable. The fact that MCP servers use the connector infrastructure means they can employ enterprise security and governance controls such as [Virtual Network](https://learn.microsoft.com/power-platform/admin/vnet-support-overview) integration, [Data Loss Prevention](https://learn.microsoft.com/power-platform/admin/wp-data-loss-prevention) controls, [multiple authentication methods](https://learn.microsoft.com/connectors/custom-connectors/#2-secure-your-api)—all of which are available in this release—while supporting real-time data access for AI-powered agents.

So, MCP and connectors are really **better together**.

## ⚙️ Prerequisites

- Visual Studio Code ([link](https://code.visualstudio.com/download))
- Node v22 (ideally installed via [nvm for Windows](https://github.com/coreybutler/nvm-windows) or [nvm](https://github.com/nvm-sh/nvm))
- Git installed ([link](https://git-scm.com/downloads))
- Azure Developer CLI ([link](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd))
- Azure Subscription (with payment method added)
- GitHub account
- Copilot Studio trial or developer account
- Power Platform environment provisioned - with the following toggle on:

![Get new features early toggle](./assets/newfeatures.png)

## ➕ Create a new GitHub repository based on the template

1. Select `Use this template`
1. Select `Create a new repository

    ![](./assets/usetemplate.png)

1. Select the right `Owner` (it might already be selected when you have only one owner to choose from)
1. Give it a `Repository name`
1. Optionally you can give it a `Description`
1. Select `Private`
1. Select `Create repository`

    This will take a little while. After it's done, you will be directed to the newly created repository.

## ⚖️ Choice: Run the server locally or deploy to Azure

Now you have a choice! You either run the server locally - or you can deploy it to Azure.

There are a couple of steps that you need to do for both:

1. Clone this repository by running the following command (replace `{account}` by your own GitHub account name): 

    `git clone https://github.com/{account}/mcsmcp.git`

1. Open Visual Studio Code and open the cloned folder
1. Open the terminal and navigate to the cloned folder

### 🏃‍♀️ Run the MCP Server Locally

1. Run `npm install`
1. Run `npm run build && npm run start`

    ![Terminal view after building and starting the server](./assets/vscode-terminal-run-start.png)

1. Select `PORTS` at the top of the Visual Studio Code Terminal

    ![Image of VS Code where the terminal is open and the PORTS tab is highlighted](./assets/vscode-terminal-ports.png)

1. Select the green `Forward a Port` button

    ![Image of VS Code where the PORTS tab is open and the green `Forward a Port` button is highlighted](./assets/vscode-terminal-ports-forward.png)

1. Enter `3000` as the port number (this should be the same as the port number you see when you ran the command in step 5). You might be prompted to sign in to GitHub, if so please do this, since this is required to use the port forwarding feature.
1. Right click on the row you just added and select `Port visibility` > `Public` to make the server publicly available
1. Ctrl + click on the `Forwarded address`, which should be something like: `https://something-3000.something.devtunnels.ms`
1. Select `Copy` on the following pop-up to copy the URL

    ![View of the PORTS setup with highlighted the port, the forwarded address and the visibility](./assets/vscode-terminal-ports-setup.png) 

1. Open to the browser of your choice and paste the URL in the address bar, type `/mcp` behind it and hit enter

If all went well, you will see the following error message:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

Don't worry - this error message is nothing to be worried about!

### 🌎 Deploy to Azure

> [!IMPORTANT]
> As listed in the [prerequisites](#️-prerequisites), the [Azure Developer CLI ](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd) needs to be installed on your machine for this part.

Make sure to login to Azure Developer CLI if you haven't done that yet.

```azurecli
azd auth login
```

> [!WARNING]  
> After running `azd up`, you will have an MCP Server running on Azure that is publicly available. Ideally, you don't want that. Make sure to run `azd down` after finishing the lab to delete all the resources from your Azure subscription. Learn how to run `azd down` by going to [this section](#-remove-the-azure-resources). 

Run the following command in the terminal:

```azurecli
azd up
```

For the unique environment name, enter `mcsmcplab` or something similar. Select the Azure Subscription to use and select a value for the location. After that, it will take a couple of minutes before the server has been deployed. When it's done - you should be able to go to the URL that's listed at the end and add `/mcp` to the end of that URL.

![Azd deploy server output](./assets/azd-deploy-server.png)

You should again see the following error:

```json
{"jsonrpc":"2.0","error":{"code":-32000,"message":"Method not allowed."},"id":null}
```

## 👨‍💻 Use the Business Tools MCP Server in Visual Studio Code / GitHub Copilot

To use the Business Tools MCP Server, you need to use the URL of your server (can be either your devtunnel URL or your deployed Azure Container App) with the `/mcp` part at the end and add it as an MCP Server in Visual Studio Code.

1. Press either `ctrl` + `shift` + `P` (Windows/Linux) or `cmd` + `shift` + `P` (Mac) and type `MCP`
1. Select `MCP: Add Server...`
1. Select `HTTP (HTTP or Server-Sent Events)`
1. Paste the URL of your server in the input box (make sure `/mcp` in the end is included)
1. Press `Enter`
1. Enter a name for the server, for instance `BusinessToolsMCP`
1. Select `User Settings` to save the MCP Server settings in your user settings

    This will add an MCP Server to your `settings.json` file. It should look like this:
    ![settings.json file](./assets/settings.png)

1. Open `GitHub Copilot`
1. Switch from `Ask` to `Agent`
1. Make sure the `BusinessToolsMCP` server actions are selected when you select the tools icon:

    ![Tools menu in GitHub Copilot](./assets/tools-menu.png)

1. Ask the following question:

    ```text
    Execute PowerShell command 'Get-Process' to show running processes
    ```

This should give you a response showing the list of running processes.

Now you have added the `BusinessToolsMCP` server to Visual Studio Code!

## 👨‍💻 Use the Business Tools MCP Server in Microsoft Copilot Studio

**Import the Connector**

1. Go to https://make.preview.powerapps.com/customconnectors (make sure you’re in the correct environment) and click **+ New custom connector**. 
1. Select `Import from GitHub`
1. Select `Custom` as **Connector Type**
1. Select `dev` as the **Branch**
1. Select `MCP-Streamable-HTTP` as the **Connector**
1. Select `Continue`

    ![View of the import from GitHub section](./assets/import-from-github.png)

1. Change the **Connector Name** to something appropriate, like for instance `Business Tools MCP` 
1. Change the **Description** to something appropriate
1. Paste your root URL (for instance `something-3000.something.devtunnels.ms` or `something.azurecontainerapps.io`) in the **Host** field
1. Select **Create connector** 

> [!WARNING]  
> You may see a warning and an error upon creation – it should be resolved soon - but you can ignore it for now.

11. Close the connector


**Create an agent and add the MCP server as a tool**

1. Go to https://copilotstudio.preview.microsoft.com/
1. Select the environment picker at the top right corner
1. Select the right environment (the environment with the `Get new features early` toggle switched on)
1. Select `Create` in the left navigation
1. Select the blue `New agent` button

    ![New agent](./assets/newagent.png)

1. Select the `Configure` tab on the left

    ![Configure](./assets/configure.png)

1. Change the name to `Business Assistant`
1. Add the following `Description`

    ```text
    A professional assistant that helps with business tasks including PowerShell automation, API interactions, Azure resource management, and system monitoring. Provides clear, actionable responses for enterprise and IT administration needs.
    ```

1. Add the following `Instructions`

    ```text
    You are a business tools assistant. Your purpose is to help users with:
    
    * PowerShell command execution and system administration
    * REST API interactions and integrations
    * Azure resource information and management
    * System monitoring and information gathering
    
    Follow these guidelines:
    * Provide clear, professional responses
    * Explain technical concepts when necessary
    * Always suggest safe practices for system administration
    * Format technical output clearly and readably
    * Ask for clarification when commands or requests are ambiguous
    * Include relevant warnings for potentially destructive operations
    ```

1. Select `Continue` on the top right

    ![Click continue to create agent](./assets/continue.png)

1. Enable Generative AI `Orchestration`

    ![Turn on orchestration](./assets/turnonorchestration.png)

1. Disable general knowledge in the `Knowledge` section

    ![Turn off general knowledge](./assets/turnoffgeneralknowledge.png)

1. Select `Tools` in the top menu
 
    ![Tools](./assets/tools.png)

1. Select `Add a tool`

    ![Add a tool](./assets/addatool.png)

1. Select the `Model Context Protocol` tab to filter all the Model Context Protocol Servers (see number 1 in the screenshot below)

1. Select the `Business Tools MCP` server (see number 2 in the screenshot below)

    ![MCP](./assets/mcpsteps.png)

1. Create a new connection by selecting the `Not connected` and **Create new Connection**

    ![Action and connection](./assets/create-connection-action.png)

1. Select `Create`

    ![Create connection](./assets/create-connection-action-create.png)

1. Select `Add to agent` to add the tool to the agent

    ![Add tool to agent](./assets/add-tool-to-agent.png)

1. Select the `refresh icon` in the `Test your agent` pane

    ![Refresh testing pane](./assets/refreshtestingpane.png)

1. In the `Test your agent` pane send the following message:

    ```text
    Execute PowerShell command 'Get-Date' to show current date and time
    ```
  
    This will show you message that additional permissions are required to run this action. This is because of the user authentication in the action wizard.

1. Select `Connect`

    ![Additional permissions](./assets/additionalpermissions.png)
  
    This will open a new window where you can manage your connections for this agent.

1. Select `Connect` next to the `BusinessToolsMCP`

    ![Connect to BusinessToolsMCP](./assets/connect.png)

1. Wait until the connection is created and select `Submit`

    ![Pick a connection](./assets/submitconnection.png)

1. The connection should now be connected, so the status should be set to `Connected`

    ![Status connected](./assets/connected.png) 

1. Close the manage your connections tab in your browser

    Now you should be back in the Business Assistant agent screen.

1. Select the `refresh icon` in the `Test your agent` pane

    ![Refresh testing pane](./assets/refreshtestingpane.png)

1. In the `Test your agent` pane send the following message:

1. In the `Test your agent` pane send the following message:

    ```text
    Execute PowerShell command 'Get-Date' to show current date and time
    ```

    This will now show the current date and time - instead of the additional permissions. If that's not the case - you probably have missed the [prerequisite](#️-prerequisites) that the environment needs to have the `get new features early` toggle on.

1. Try other business tools by sending messages like:

    ```text
    Get Azure resource information for a virtual machine
    ```

    or

    ```text
    Make an API request to GET https://api.github.com/users/octocat
    ```

    or

    ```text
    Get system performance information
    ```

And that was the Business Tools MCP Server working in Microsoft Copilot Studio.

## ❌ Remove the Azure resources

To remove the Azure resources after finishing the lab, run the following command in the terminal:

```azurecli
azd down
```
This command will show you the resources that will be deleted and then ask you to confirm. Confirm with `y` and the resources will be deleted. This can take a couple of minutes, but at the end you will see a confirmation:

![resources deleted](./assets/azd-down-confirmation.png)

## 💡 Known issues and planned improvements

There are some known issues and planned improvements for MCP in Microsoft Copilot Studio. They are listed in [this Microsoft Learn article](https://aka.ms/mcsmcpdocs#known-issues--planned-improvements).

## 🗣️ Feedback

Hopefully you liked the lab. Please take the time to fill in our [feedback form](https://aka.ms/mcsmcp/lab/feedback) to tell us how we can improve!

## 🤖 GitHub Copilot Coding Agent Integration

This repository is configured to work effectively with GitHub Copilot coding agents. The setup includes:

### Agent Instructions
- Comprehensive project context in `.github/copilot-instructions.md`
- Code style guidelines and development patterns
- MCP-specific development guidance
- Azure deployment considerations

### Repository Configuration
- Issue templates for better bug reports and feature requests
- Pull request templates with Copilot-friendly checklists
- Automated code review workflows
- Contributing guidelines for agent-assisted development

### Best Practices for Agents
When working with this codebase, GitHub Copilot agents should:
- Follow the TypeScript patterns established in `src/server.ts`
- Use Zod schemas for all MCP tool parameters
- Include proper error handling with user-friendly messages
- Mark demo/mock data appropriately for production clarity
- Test changes with both local and Azure deployment scenarios

### Development Guidelines
- All MCP tools should include clear descriptions for Copilot Studio integration
- Maintain compatibility with existing Copilot Studio agents
- Update documentation when adding new tools or features
- Consider security implications when handling external commands or APIs

## 🚀 Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## ™️ Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

![Microsoft Copilot Studio ❤️ MCP](https://m365-visitor-stats.azurewebsites.net/?resource=https://github.com/microsoft/mcsmcp)
