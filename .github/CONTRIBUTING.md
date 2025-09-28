# Contributing to Microsoft Copilot Studio MCP Server

Thank you for your interest in contributing to this Microsoft Copilot Studio MCP (Model Context Protocol) server! This guide will help you understand how to contribute effectively.

## 🎯 Project Overview

This repository provides a business tools MCP server designed to integrate with Microsoft Copilot Studio, offering:
- PowerShell command execution and system administration
- REST API interactions and integrations
- Azure resource information and management
- System monitoring and information gathering

## 🚀 Getting Started

### Prerequisites
- Node.js v22 or later
- TypeScript knowledge
- Understanding of MCP (Model Context Protocol)
- Basic knowledge of Azure services (for infrastructure contributions)

### Setup
1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start development server: `npm start`

## 📝 Development Guidelines

### Code Style
- Use TypeScript with strict type checking
- Follow existing code patterns and structure
- Use 2-space indentation
- Include JSDoc comments for public functions
- Use descriptive variable and function names

### MCP Tool Development
When adding new tools to the MCP server:

```typescript
const newTool = server.tool(
  "tool-name",
  "Clear description of what the tool does",
  {
    param1: z.string().describe("Parameter description"),
    param2: z.number().optional().describe("Optional parameter")
  },
  async (params) => {
    try {
      // Implementation here
      return {
        content: [{
          type: "text",
          text: "Tool response"
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text", 
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }]
      };
    }
  }
);
```

### Key Principles
1. **Clear Tool Descriptions**: Write descriptive tool names and descriptions for better Copilot Studio integration
2. **Proper Error Handling**: Always include try-catch blocks and user-friendly error messages
3. **Schema Validation**: Use Zod schemas for all tool parameters
4. **Mock Data**: Use appropriate mock data for demo purposes, clearly marked as such
5. **Production Notes**: Include comments about production implementation requirements

## 🏗️ Infrastructure Contributions

### Azure Deployment
- Infrastructure is defined in `infra/` using Bicep templates
- Test changes with `azd up` before submitting
- Update documentation if new Azure resources are added

### Docker Configuration
- Maintain compatibility with existing Dockerfile
- Test container builds locally before submitting

## 📋 Contribution Types

### 🐛 Bug Fixes
- Create an issue using the bug report template
- Include reproduction steps and environment details
- Test the fix thoroughly before submitting

### ✨ New Features
- Create a feature request issue first
- Discuss the approach with maintainers
- Ensure Copilot Studio compatibility
- Update documentation accordingly

### 📚 Documentation
- Keep README.md updated with new features
- Include usage examples for new tools
- Update deployment instructions if needed

### 🔧 Infrastructure
- Test Azure deployment changes
- Verify container app functionality
- Update azd configuration if needed

## 🧪 Testing

### Manual Testing
- Test all MCP tools locally
- Verify Copilot Studio integration if possible
- Test Azure deployment for infrastructure changes

### Code Quality
- Ensure TypeScript compilation passes
- Follow existing code patterns
- Include appropriate error handling

## 📤 Submitting Changes

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes following the guidelines above
3. Test your changes thoroughly
4. Fill out the PR template completely
5. Respond to review feedback promptly

### PR Requirements
- [ ] Code follows project standards
- [ ] Changes are tested locally
- [ ] Documentation is updated if needed
- [ ] PR template is filled out completely
- [ ] Copilot Studio compatibility is maintained

## 🤖 Copilot Studio Integration

When making changes that affect Copilot Studio integration:

### Tool Descriptions
- Use clear, specific descriptions that explain what the tool does
- Include parameter descriptions that help users understand usage
- Consider how the tool will appear in Copilot Studio's interface

### Response Format
- Provide structured, readable responses
- Include helpful context in responses
- Mark demo/mock data clearly

### Error Handling
- Return user-friendly error messages
- Provide guidance on how to fix common issues
- Avoid technical jargon when possible

## ❓ Getting Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Documentation**: Check the README.md and this contributing guide
- **MCP Protocol**: Reference the [Model Context Protocol documentation](https://modelcontextprotocol.io/)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

## 🙏 Recognition

All contributors will be recognized in our documentation. Thank you for helping make this project better!