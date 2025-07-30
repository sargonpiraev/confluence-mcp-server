# The Confluence Cloud REST API v2 MCP Server 🔧

![npm version](https://img.shields.io/npm/v/@sargonpiraev/confluence-mcp-server)
![npm downloads](https://img.shields.io/npm/dw/@sargonpiraev/confluence-mcp-server)
![license](https://img.shields.io/github/license/sargonpiraev/confluence-mcp-server)
![pipeline status](https://gitlab.com/sargonpiraev/confluence-mcp-server/badges/main/pipeline.svg)
![smithery badge](https://smithery.ai/badge/@sargonpiraev/confluence-mcp-server)
![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)
[![Join Discord](https://img.shields.io/discord/1331631275464671347?color=7289da&label=Discord&logo=discord)](https://discord.gg/ZsWGxRGj)

## Features

- 🔌 **Seamless AI Integration**: Direct The Confluence Cloud REST API v2 API access from Claude, Cursor, and VS Code
- 🤖 **Automated Workflows**: Automate The Confluence Cloud REST API v2 operations and data access
- 📊 **Complete API Coverage**: 206+ tools covering all major The Confluence Cloud REST API v2 features
- ⚡ **Real-time Access**: Access The Confluence Cloud REST API v2 data instantly from AI assistants
- 🔧 **Professional Integration**: Error handling, validation, and comprehensive logging

## Get Your Credentials

Before installation, you'll need a The Confluence Cloud REST API v2 API key:

1. Open The Confluence Cloud REST API v2 app or web interface
2. Go to **Settings → Account → API Access**
3. Generate new API key or copy existing one
4. Save this key for the installation steps below

## Requirements

- Node.js >= v18.0.0
- The Confluence Cloud REST API v2 API key
- Cursor, VS Code, Claude Desktop or another MCP Client

## Installation

<details>
<summary><b>Installing via Smithery</b></summary>

To install The Confluence Cloud REST API v2 MCP Server for any client automatically via [Smithery](https://smithery.ai):

```bash
npx -y @smithery/cli@latest install @sargonpiraev/confluence-mcp-server --client <CLIENT_NAME>
```

</details>

<details>
<summary><b>Install in Cursor</b></summary>

#### Cursor One-Click Installation

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=@sargonpiraev/confluence-mcp-server&config=)

#### Manual Configuration

Add to your Cursor `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "confluence-mcp-server": {
      "command": "npx",
      "args": ["-y", "@sargonpiraev/confluence-mcp-server"],
      "env": {
        "CONFLUENCE_CLIENT_ID": "your-confluence_client_id",
        "CONFLUENCE_CLIENT_SECRET": "your-confluence_client_secret"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in VS Code</b></summary>

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MCP-0098FF)](vscode:mcp/install?%7B%22name%22%3A%22confluence-mcp-server%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@sargonpiraev/confluence-mcp-server%22%5D%7D)

Or add manually to your VS Code settings:

```json
"mcp": {
  "servers": {
    "confluence-mcp-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@sargonpiraev/confluence-mcp-server"],
      "env": {
        "CONFLUENCE_CLIENT_ID": "your-confluence_client_id",
        "CONFLUENCE_CLIENT_SECRET": "your-confluence_client_secret"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Claude Desktop</b></summary>

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "confluence-mcp-server": {
      "command": "npx",
      "args": ["-y", "@sargonpiraev/confluence-mcp-server"],
      "env": {
        "CONFLUENCE_CLIENT_ID": "your-confluence_client_id",
        "CONFLUENCE_CLIENT_SECRET": "your-confluence_client_secret"
      }
    }
  }
}
```

</details>

## Available Tools

- **`get-admin-key`**: Get Admin Key
- **`enable-admin-key`**: Enable Admin Key
- **`disable-admin-key`**: Disable Admin Key
- **`get-attachments`**: Get attachments
- **`get-attachment-by-id`**: Get attachment by id
- **`delete-attachment`**: Delete attachment
- **`get-attachment-labels`**: Get labels for attachment
- **`get-attachment-operations`**: Get permitted operations for attachment
- **`get-attachment-content-properties`**: Get content properties for attachment
- **`create-attachment-property`**: Create content property for attachment
- **`get-attachment-content-properties-by-id`**: Get content property for attachment by id
- **`update-attachment-property-by-id`**: Update content property for attachment by id
- **`delete-attachment-property-by-id`**: Delete content property for attachment by id
- **`get-attachment-versions`**: Get attachment versions
- **`get-attachment-version-details`**: Get version details for attachment version
- **`get-attachment-comments`**: Get attachment comments
- **`get-blog-posts`**: Get blog posts
- **`create-blog-post`**: Create blog post
- **`get-blog-post-by-id`**: Get blog post by id
- **`update-blog-post`**: Update blog post
- **`delete-blog-post`**: Delete blog post
- **`get-blogpost-attachments`**: Get attachments for blog post
- **`get-custom-content-by-type-in-blog-post`**: Get custom content by type in blog post
- **`get-blog-post-labels`**: Get labels for blog post
- **`get-blog-post-like-count`**: Get like count for blog post
- **`get-blog-post-like-users`**: Get account IDs of likes for blog post
- **`get-blogpost-content-properties`**: Get content properties for blog post
- **`create-blogpost-property`**: Create content property for blog post
- **`get-blogpost-content-properties-by-id`**: Get content property for blog post by id
- **`update-blogpost-property-by-id`**: Update content property for blog post by id
- **`delete-blogpost-property-by-id`**: Delete content property for blogpost by id
- **`get-blog-post-operations`**: Get permitted operations for blog post
- **`get-blog-post-versions`**: Get blog post versions
- **`get-blog-post-version-details`**: Get version details for blog post version
- **`convert-content-ids-to-content-types`**: Convert content ids to content types
- **`get-custom-content-by-type`**: Get custom content by type
- **`create-custom-content`**: Create custom content
- **`get-custom-content-by-id`**: Get custom content by id
- **`update-custom-content`**: Update custom content
- **`delete-custom-content`**: Delete custom content
- **`get-custom-content-attachments`**: Get attachments for custom content
- **`get-custom-content-comments`**: Get custom content comments
- **`get-custom-content-labels`**: Get labels for custom content
- **`get-custom-content-operations`**: Get permitted operations for custom content
- **`get-custom-content-content-properties`**: Get content properties for custom content
- **`create-custom-content-property`**: Create content property for custom content
- **`get-custom-content-content-properties-by-id`**: Get content property for custom content by id
- **`update-custom-content-property-by-id`**: Update content property for custom content by id
- **`delete-custom-content-property-by-id`**: Delete content property for custom content by id
- **`get-labels`**: Get labels
- **`get-label-attachments`**: Get attachments for label
- **`get-label-blog-posts`**: Get blog posts for label
- **`get-label-pages`**: Get pages for label
- **`get-pages`**: Get pages
- **`create-page`**: Create page
- **`get-page-by-id`**: Get page by id
- **`update-page`**: Update page
- **`delete-page`**: Delete page
- **`get-page-attachments`**: Get attachments for page
- **`get-custom-content-by-type-in-page`**: Get custom content by type in page
- **`get-page-labels`**: Get labels for page
- **`get-page-like-count`**: Get like count for page
- **`get-page-like-users`**: Get account IDs of likes for page
- **`get-page-operations`**: Get permitted operations for page
- **`get-page-content-properties`**: Get content properties for page
- **`create-page-property`**: Create content property for page
- **`get-page-content-properties-by-id`**: Get content property for page by id
- **`update-page-property-by-id`**: Update content property for page by id
- **`delete-page-property-by-id`**: Delete content property for page by id
- **`post-redact-page`**: Redact Content in a Confluence Page
- **`post-redact-blog`**: Redact Content in a Confluence Blog Post
- **`update-page-title`**: Update page title
- **`get-page-versions`**: Get page versions
- **`create-whiteboard`**: Create whiteboard
- **`get-whiteboard-by-id`**: Get whiteboard by id
- **`delete-whiteboard`**: Delete whiteboard
- **`get-whiteboard-content-properties`**: Get content properties for whiteboard
- **`create-whiteboard-property`**: Create content property for whiteboard
- **`get-whiteboard-content-properties-by-id`**: Get content property for whiteboard by id
- **`update-whiteboard-property-by-id`**: Update content property for whiteboard by id
- **`delete-whiteboard-property-by-id`**: Delete content property for whiteboard by id
- **`get-whiteboard-operations`**: Get permitted operations for a whiteboard
- **`get-whiteboard-direct-children`**: Get direct children of a whiteboard
- **`get-whiteboard-descendants`**: Get descendants of a whiteboard
- **`get-whiteboard-ancestors`**: Get all ancestors of whiteboard
- **`create-database`**: Create database
- **`get-database-by-id`**: Get database by id
- **`delete-database`**: Delete database
- **`get-database-content-properties`**: Get content properties for database
- **`create-database-property`**: Create content property for database
- **`get-database-content-properties-by-id`**: Get content property for database by id
- **`update-database-property-by-id`**: Update content property for database by id
- **`delete-database-property-by-id`**: Delete content property for database by id
- **`get-database-operations`**: Get permitted operations for a database
- **`get-database-direct-children`**: Get direct children of a database
- **`get-database-descendants`**: Get descendants of a database
- **`get-database-ancestors`**: Get all ancestors of database
- **`create-smart-link`**: Create Smart Link in the content tree
- **`get-smart-link-by-id`**: Get Smart Link in the content tree by id
- **`delete-smart-link`**: Delete Smart Link in the content tree
- **`get-smart-link-content-properties`**: Get content properties for Smart Link in the content tree
- **`create-smart-link-property`**: Create content property for Smart Link in the content tree
- **`get-smart-link-content-properties-by-id`**: Get content property for Smart Link in the content tree by id
- **`update-smart-link-property-by-id`**: Update content property for Smart Link in the content tree by id
- **`delete-smart-link-property-by-id`**: Delete content property for Smart Link in the content tree by id
- **`get-smart-link-operations`**: Get permitted operations for a Smart Link in the content tree
- **`get-smart-link-direct-children`**: Get direct children of a Smart Link
- **`get-smart-link-descendants`**: Get descendants of a smart link
- **`get-smart-link-ancestors`**: Get all ancestors of Smart Link in content tree
- **`create-folder`**: Create folder
- **`get-folder-by-id`**: Get folder by id
- **`delete-folder`**: Delete folder
- **`get-folder-content-properties`**: Get content properties for folder
- **`create-folder-property`**: Create content property for folder
- **`get-folder-content-properties-by-id`**: Get content property for folder by id
- **`update-folder-property-by-id`**: Update content property for folder by id
- **`delete-folder-property-by-id`**: Delete content property for folder by id
- **`get-folder-operations`**: Get permitted operations for a folder
- **`get-folder-direct-children`**: Get direct children of a folder
- **`get-folder-descendants`**: Get descendants of folder
- **`get-folder-ancestors`**: Get all ancestors of folder
- **`get-page-version-details`**: Get version details for page version
- **`get-custom-content-versions`**: Get custom content versions
- **`get-custom-content-version-details`**: Get version details for custom content version
- **`get-spaces`**: Get spaces
- **`create-space`**: Create space
- **`get-space-by-id`**: Get space by id
- **`get-blog-posts-in-space`**: Get blog posts in space
- **`get-space-labels`**: Get labels for space
- **`get-space-content-labels`**: Get labels for space content
- **`get-custom-content-by-type-in-space`**: Get custom content by type in space
- **`get-space-operations`**: Get permitted operations for space
- **`get-pages-in-space`**: Get pages in space
- **`get-space-properties`**: Get space properties in space
- **`create-space-property`**: Create space property in space
- **`get-space-property-by-id`**: Get space property by id
- **`update-space-property-by-id`**: Update space property by id
- **`delete-space-property-by-id`**: Delete space property by id
- **`get-space-permissions-assignments`**: Get space permissions assignments
- **`get-available-space-permissions`**: Get available space permissions
- **`get-available-space-roles`**: Get available space roles
- **`get-space-roles-by-id`**: Get space role by ID
- **`get-space-role-assignments`**: Get space role assignments
- **`set-space-role-assignments`**: Set space role assignments
- **`get-page-footer-comments`**: Get footer comments for page
- **`get-page-inline-comments`**: Get inline comments for page
- **`get-blog-post-footer-comments`**: Get footer comments for blog post
- **`get-blog-post-inline-comments`**: Get inline comments for blog post
- **`get-footer-comments`**: Get footer comments
- **`create-footer-comment`**: Create footer comment
- **`get-footer-comment-by-id`**: Get footer comment by id
- **`update-footer-comment`**: Update footer comment
- **`delete-footer-comment`**: Delete footer comment
- **`get-footer-comment-children`**: Get children footer comments
- **`get-footer-like-count`**: Get like count for footer comment
- **`get-footer-like-users`**: Get account IDs of likes for footer comment
- **`get-footer-comment-operations`**: Get permitted operations for footer comment
- **`get-footer-comment-versions`**: Get footer comment versions
- **`get-footer-comment-version-details`**: Get version details for footer comment version
- **`get-inline-comments`**: Get inline comments
- **`create-inline-comment`**: Create inline comment
- **`get-inline-comment-by-id`**: Get inline comment by id
- **`update-inline-comment`**: Update inline comment
- **`delete-inline-comment`**: Delete inline comment
- **`get-inline-comment-children`**: Get children inline comments
- **`get-inline-like-count`**: Get like count for inline comment
- **`get-inline-like-users`**: Get account IDs of likes for inline comment
- **`get-inline-comment-operations`**: Get permitted operations for inline comment
- **`get-inline-comment-versions`**: Get inline comment versions
- **`get-inline-comment-version-details`**: Get version details for inline comment version
- **`get-comment-content-properties`**: Get content properties for comment
- **`create-comment-property`**: Create content property for comment
- **`get-comment-content-properties-by-id`**: Get content property for comment by id
- **`update-comment-property-by-id`**: Update content property for comment by id
- **`delete-comment-property-by-id`**: Delete content property for comment by id
- **`get-tasks`**: Get tasks
- **`get-task-by-id`**: Get task by id
- **`update-task`**: Update task
- **`get-child-pages`**: Get child pages
- **`get-child-custom-content`**: Get child custom content
- **`get-page-direct-children`**: Get direct children of a page
- **`get-page-ancestors`**: Get all ancestors of page
- **`get-page-descendants`**: Get descendants of page
- **`create-bulk-user-lookup`**: Create bulk user lookup using ids
- **`check-access-by-email`**: Check site access for a list of emails
- **`invite-by-email`**: Invite a list of emails to the site
- **`get-data-policy-metadata`**: Get data policy metadata for the workspace
- **`get-data-policy-spaces`**: Get spaces with data policies
- **`get-classification-levels`**: Get list of classification levels
- **`get-space-default-classification-level`**: Get space default classification level
- **`put-space-default-classification-level`**: Update space default classification level
- **`delete-space-default-classification-level`**: Delete space default classification level
- **`get-page-classification-level`**: Get page classification level
- **`put-page-classification-level`**: Update page classification level
- **`post-page-classification-level`**: Reset page classification level
- **`get-blog-post-classification-level`**: Get blog post classification level
- **`put-blog-post-classification-level`**: Update blog post classification level
- **`post-blog-post-classification-level`**: Reset blog post classification level
- **`get-whiteboard-classification-level`**: Get whiteboard classification level
- **`put-whiteboard-classification-level`**: Update whiteboard classification level
- **`post-whiteboard-classification-level`**: Reset whiteboard classification level
- **`get-database-classification-level`**: Get database classification level
- **`put-database-classification-level`**: Update database classification level
- **`post-database-classification-level`**: Reset database classification level
- **`put-forge-app-property`**: Create or update a Forge app property.
- **`delete-forge-app-property`**: Deletes a Forge app property.

**Total: 206 tools available** 🎯

## Support This Project

Hi! I'm Sargon, a software engineer passionate about AI tools and automation. I create open-source MCP servers to help developers integrate AI assistants with their favorite services.

Your support helps me continue developing and maintaining these tools, and motivates me to create new integrations that make AI assistants even more powerful! 🚀

[![Support on Boosty](https://img.shields.io/badge/Support-Boosty-orange?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)](https://boosty.to/sargonpiraev)

## Connect with Author

- 🌐 Visit [sargonpiraev.com](https://sargonpiraev.com)
- 📧 Email: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)
- 💬 Join [Discord](https://discord.gg/ZsWGxRGj)
