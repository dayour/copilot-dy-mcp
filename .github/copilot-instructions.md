# GitHub Copilot Instructions

## Project Overview
This is a Microsoft Copilot Studio MCP (Model Context Protocol) server that provides business tools including:
- PowerShell command execution and system administration
- REST API interactions and integrations  
- Azure resource information and management
- System monitoring and information gathering

## Code Style and Standards
- Use TypeScript with strict type checking
- Follow the existing code patterns and structure
- Use proper error handling with try-catch blocks
- Include JSDoc comments for functions and classes
- Use descriptive variable and function names
- Follow the existing indentation (2 spaces)

## Key Files and Structure
- `src/server.ts` - Main MCP server implementation
- `package.json` - Project dependencies and scripts
- `infra/` - Azure deployment infrastructure (Bicep files)
- `assets/` - Documentation images and resources
- `Dockerfile` - Container configuration

## Development Guidelines
1. **TypeScript**: All code should be written in TypeScript with proper type annotations
2. **MCP Protocol**: Follow Model Context Protocol patterns for tool definitions
3. **Error Handling**: Always include proper error handling and user-friendly error messages
4. **Documentation**: Update README.md when adding new features or tools
5. **Testing**: Include validation for new tools and endpoints
6. **Azure Integration**: Consider Azure deployment when making infrastructure changes

## Dependencies
- `@modelcontextprotocol/sdk` - Core MCP functionality
- `express` - HTTP server framework
- `zod` - Schema validation
- `typescript` - TypeScript compiler

## Working with GitHub Copilot
When using GitHub Copilot with this project:
- **Context**: Copilot has access to the full project structure and these instructions
- **Tool Development**: When adding new MCP tools, describe the functionality clearly in comments
- **Type Safety**: Leverage Copilot's TypeScript understanding for better suggestions
- **Error Patterns**: Copilot can help generate consistent error handling based on existing patterns
- **Testing**: Ask Copilot to help generate test scenarios for new tools
- **Documentation**: Use Copilot to help maintain JSDoc comments and README updates

## Common Tasks
- Adding new MCP tools: Follow the pattern in `server.ts` with proper Zod schemas
- Infrastructure changes: Update Bicep files in `infra/` directory
- Documentation: Update README.md with new features and usage examples
- Deployment: Use Azure Container Apps via the provided infrastructure

## Testing and Validation
- **Local Testing**: Use `npm run build && npm start` to test MCP server locally
- **Manual Testing**: Verify tools work through MCP client connections
- **Integration Testing**: Test with Copilot Studio after deployment
- **Mock Data**: Clearly mark demo/mock responses with comments explaining production requirements
- **Error Scenarios**: Test error handling and ensure user-friendly error messages

## Security Considerations
- **PowerShell Commands**: Validate and sanitize all PowerShell inputs to prevent injection attacks
- **API Requests**: Implement proper authentication and rate limiting for external API calls
- **Azure Resources**: Use principle of least privilege for Azure resource access
- **Environment Variables**: Store sensitive data in environment variables, never hardcode secrets
- **Input Validation**: Use Zod schemas rigorously for all tool parameters

## Debugging and Troubleshooting
- **Logs**: Use structured logging with context for easier debugging
- **Error Handling**: Implement comprehensive try-catch blocks with specific error types
- **Development Mode**: Use environment variables to enable verbose logging during development
- **Common Issues**: Check Azure deployment logs if container startup fails
- **MCP Protocol**: Validate MCP message format compliance when adding new tools

## Best Practices
- Keep tool descriptions clear and specific for better Copilot Studio integration
- Use mock data appropriately for demo purposes while noting production requirements
- Maintain consistency with existing code patterns
- Consider security implications when handling external commands or APIs
- Test changes with both local development and Azure deployment scenarios
- Follow TypeScript strict mode and provide complete type definitions
- Use async/await patterns consistently throughout the codebase

## Helpful Context
This project is designed to be used as a template for creating MCP servers that integrate with Microsoft Copilot Studio. The server provides practical business tools that can be called from Copilot Studio agents to help with enterprise and IT administration tasks.