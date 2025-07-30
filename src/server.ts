import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import axios, { AxiosInstance } from 'axios'
import dotenv from 'dotenv'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

dotenv.config()

export const envSchema = z.object({
  CONFLUENCE_CLIENT_ID: z.string(),
  CONFLUENCE_CLIENT_SECRET: z.string(),
})

export const mcpServer = new McpServer(
  {
    name: '@sargonpiraev/confluence-mcp-server',
    version: '2.0.0',
  },
  {
    instructions: ``,
    capabilities: {
      tools: {},
      logging: {},
    },
  }
)

export const env = envSchema.parse(process.env)

export const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://{your-domain}/wiki/api/v2',
  headers: {
    'Accept': 'application/json'
  },
  timeout: 30000
})

apiClient.interceptors.request.use((config) => {
  
  return config
}, (error) => {
  return Promise.reject(error)
})

function handleResult(data: unknown): CallToolResult {
  return {
    content: [{ 
      type: 'text', 
      text: JSON.stringify(data, null, 2) 
    }]
  }
}

function handleError(error: unknown): CallToolResult {
  console.error(error)
  
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message
    return { 
      isError: true, 
      content: [{ type: 'text', text: `API Error: ${message}` }] 
    } as CallToolResult
  }
  
  return { 
    isError: true, 
    content: [{ type: 'text', text: `Error: ${error}` }] 
  } as CallToolResult
}

// Register tools
mcpServer.tool(
  'get-admin-key',
  `Get Admin Key`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/admin-key',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'enable-admin-key',
  `Enable Admin Key`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/admin-key',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'disable-admin-key',
  `Disable Admin Key`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: '/admin-key',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachments',
  `Get attachments`,
  {
    sort: z.string().optional(),
    cursor: z.string().optional(),
    status: z.string().optional(),
    mediaType: z.string().optional(),
    filename: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/attachments',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachment-by-id',
  `Get attachment by id`,
  {
    id: z.string(),
    version: z.string().optional(),
    include-labels: z.string().optional(),
    include-properties: z.string().optional(),
    include-operations: z.string().optional(),
    include-versions: z.string().optional(),
    include-version: z.string().optional(),
    include-collaborators: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/attachments/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-attachment',
  `Delete attachment`,
  {
    id: z.string(),
    purge: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/attachments/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachment-labels',
  `Get labels for attachment`,
  {
    id: z.string(),
    prefix: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/attachments/${id}/labels`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachment-operations',
  `Get permitted operations for attachment`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/attachments/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachment-content-properties',
  `Get content properties for attachment`,
  {
    attachment-id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { attachment-id, ...queryParams } = args
      const url = `/attachments/${attachment-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-attachment-property',
  `Create content property for attachment`,
  {
    attachment-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { attachment-id, ...requestData } = args
      const url = `/attachments/${attachment-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachment-content-properties-by-id',
  `Get content property for attachment by id`,
  {
    attachment-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { attachment-id, property-id, ...queryParams } = args
      const url = `/attachments/${attachment-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-attachment-property-by-id',
  `Update content property for attachment by id`,
  {
    attachment-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { attachment-id, property-id, ...requestData } = args
      const url = `/attachments/${attachment-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-attachment-property-by-id',
  `Delete content property for attachment by id`,
  {
    attachment-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { attachment-id, property-id, ...queryParams } = args
      const url = `/attachments/${attachment-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachment-versions',
  `Get attachment versions`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/attachments/${id}/versions`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachment-version-details',
  `Get version details for attachment version`,
  {
    attachment-id: z.string(),
    version-number: z.string(),
  },
  async (args, extra) => {
    try {
      const { attachment-id, version-number, ...queryParams } = args
      const url = `/attachments/${attachment-id}/versions/${version-number}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-attachment-comments',
  `Get attachment comments`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
    version: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/attachments/${id}/footer-comments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-posts',
  `Get blog posts`,
  {
    id: z.string().optional(),
    space-id: z.string().optional(),
    sort: z.string().optional(),
    status: z.string().optional(),
    title: z.string().optional(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/blogposts',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-blog-post',
  `Create blog post`,
  {
    private: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/blogposts',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-by-id',
  `Get blog post by id`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    get-draft: z.string().optional(),
    status: z.string().optional(),
    version: z.string().optional(),
    include-labels: z.string().optional(),
    include-properties: z.string().optional(),
    include-operations: z.string().optional(),
    include-likes: z.string().optional(),
    include-versions: z.string().optional(),
    include-version: z.string().optional(),
    include-favorited-by-current-user-status: z.string().optional(),
    include-webresources: z.string().optional(),
    include-collaborators: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-blog-post',
  `Update blog post`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/blogposts/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-blog-post',
  `Delete blog post`,
  {
    id: z.string(),
    purge: z.string().optional(),
    draft: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blogpost-attachments',
  `Get attachments for blog post`,
  {
    id: z.string(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    status: z.string().optional(),
    mediaType: z.string().optional(),
    filename: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/attachments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-by-type-in-blog-post',
  `Get custom content by type in blog post`,
  {
    id: z.string(),
    type: z.string(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    body-format: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/custom-content`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-labels',
  `Get labels for blog post`,
  {
    id: z.string(),
    prefix: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/labels`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-like-count',
  `Get like count for blog post`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/likes/count`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-like-users',
  `Get account IDs of likes for blog post`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/likes/users`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blogpost-content-properties',
  `Get content properties for blog post`,
  {
    blogpost-id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { blogpost-id, ...queryParams } = args
      const url = `/blogposts/${blogpost-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-blogpost-property',
  `Create content property for blog post`,
  {
    blogpost-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { blogpost-id, ...requestData } = args
      const url = `/blogposts/${blogpost-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blogpost-content-properties-by-id',
  `Get content property for blog post by id`,
  {
    blogpost-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { blogpost-id, property-id, ...queryParams } = args
      const url = `/blogposts/${blogpost-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-blogpost-property-by-id',
  `Update content property for blog post by id`,
  {
    blogpost-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { blogpost-id, property-id, ...requestData } = args
      const url = `/blogposts/${blogpost-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-blogpost-property-by-id',
  `Delete content property for blogpost by id`,
  {
    blogpost-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { blogpost-id, property-id, ...queryParams } = args
      const url = `/blogposts/${blogpost-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-operations',
  `Get permitted operations for blog post`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-versions',
  `Get blog post versions`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/versions`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-version-details',
  `Get version details for blog post version`,
  {
    blogpost-id: z.string(),
    version-number: z.string(),
  },
  async (args, extra) => {
    try {
      const { blogpost-id, version-number, ...queryParams } = args
      const url = `/blogposts/${blogpost-id}/versions/${version-number}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'convert-content-ids-to-content-types',
  `Convert content ids to content types`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/content/convert-ids-to-types',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-by-type',
  `Get custom content by type`,
  {
    type: z.string(),
    id: z.string().optional(),
    space-id: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    body-format: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/custom-content',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-custom-content',
  `Create custom content`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/custom-content',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-by-id',
  `Get custom content by id`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    version: z.string().optional(),
    include-labels: z.string().optional(),
    include-properties: z.string().optional(),
    include-operations: z.string().optional(),
    include-versions: z.string().optional(),
    include-version: z.string().optional(),
    include-collaborators: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/custom-content/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-custom-content',
  `Update custom content`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/custom-content/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-custom-content',
  `Delete custom content`,
  {
    id: z.string(),
    purge: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/custom-content/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-attachments',
  `Get attachments for custom content`,
  {
    id: z.string(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    status: z.string().optional(),
    mediaType: z.string().optional(),
    filename: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/custom-content/${id}/attachments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-comments',
  `Get custom content comments`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/custom-content/${id}/footer-comments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-labels',
  `Get labels for custom content`,
  {
    id: z.string(),
    prefix: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/custom-content/${id}/labels`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-operations',
  `Get permitted operations for custom content`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/custom-content/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-content-properties',
  `Get content properties for custom content`,
  {
    custom-content-id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { custom-content-id, ...queryParams } = args
      const url = `/custom-content/${custom-content-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-custom-content-property',
  `Create content property for custom content`,
  {
    custom-content-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { custom-content-id, ...requestData } = args
      const url = `/custom-content/${custom-content-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-content-properties-by-id',
  `Get content property for custom content by id`,
  {
    custom-content-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { custom-content-id, property-id, ...queryParams } = args
      const url = `/custom-content/${custom-content-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-custom-content-property-by-id',
  `Update content property for custom content by id`,
  {
    custom-content-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { custom-content-id, property-id, ...requestData } = args
      const url = `/custom-content/${custom-content-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-custom-content-property-by-id',
  `Delete content property for custom content by id`,
  {
    custom-content-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { custom-content-id, property-id, ...queryParams } = args
      const url = `/custom-content/${custom-content-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-labels',
  `Get labels`,
  {
    label-id: z.string().optional(),
    prefix: z.string().optional(),
    cursor: z.string().optional(),
    sort: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/labels',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-label-attachments',
  `Get attachments for label`,
  {
    id: z.string(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/labels/${id}/attachments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-label-blog-posts',
  `Get blog posts for label`,
  {
    id: z.string(),
    space-id: z.string().optional(),
    body-format: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/labels/${id}/blogposts`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-label-pages',
  `Get pages for label`,
  {
    id: z.string(),
    space-id: z.string().optional(),
    body-format: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/labels/${id}/pages`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-pages',
  `Get pages`,
  {
    id: z.string().optional(),
    space-id: z.string().optional(),
    sort: z.string().optional(),
    status: z.string().optional(),
    title: z.string().optional(),
    body-format: z.string().optional(),
    subtype: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/pages',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-page',
  `Create page`,
  {
    embedded: z.string().optional(),
    private: z.string().optional(),
    root-level: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/pages',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-by-id',
  `Get page by id`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    get-draft: z.string().optional(),
    status: z.string().optional(),
    version: z.string().optional(),
    include-labels: z.string().optional(),
    include-properties: z.string().optional(),
    include-operations: z.string().optional(),
    include-likes: z.string().optional(),
    include-versions: z.string().optional(),
    include-version: z.string().optional(),
    include-favorited-by-current-user-status: z.string().optional(),
    include-webresources: z.string().optional(),
    include-collaborators: z.string().optional(),
    include-direct-children: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-page',
  `Update page`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/pages/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-page',
  `Delete page`,
  {
    id: z.string(),
    purge: z.string().optional(),
    draft: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-attachments',
  `Get attachments for page`,
  {
    id: z.string(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    status: z.string().optional(),
    mediaType: z.string().optional(),
    filename: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/attachments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-by-type-in-page',
  `Get custom content by type in page`,
  {
    id: z.string(),
    type: z.string(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    body-format: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/custom-content`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-labels',
  `Get labels for page`,
  {
    id: z.string(),
    prefix: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/labels`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-like-count',
  `Get like count for page`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/likes/count`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-like-users',
  `Get account IDs of likes for page`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/likes/users`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-operations',
  `Get permitted operations for page`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-content-properties',
  `Get content properties for page`,
  {
    page-id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { page-id, ...queryParams } = args
      const url = `/pages/${page-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-page-property',
  `Create content property for page`,
  {
    page-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { page-id, ...requestData } = args
      const url = `/pages/${page-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-content-properties-by-id',
  `Get content property for page by id`,
  {
    page-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { page-id, property-id, ...queryParams } = args
      const url = `/pages/${page-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-page-property-by-id',
  `Update content property for page by id`,
  {
    page-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { page-id, property-id, ...requestData } = args
      const url = `/pages/${page-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-page-property-by-id',
  `Delete content property for page by id`,
  {
    page-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { page-id, property-id, ...queryParams } = args
      const url = `/pages/${page-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-redact-page',
  `Redact Content in a Confluence Page`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/pages/${id}/redact`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-redact-blog',
  `Redact Content in a Confluence Blog Post`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/blogposts/${id}/redact`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-page-title',
  `Update page title`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/pages/${id}/title`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-versions',
  `Get page versions`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/versions`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-whiteboard',
  `Create whiteboard`,
  {
    private: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/whiteboards',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-whiteboard-by-id',
  `Get whiteboard by id`,
  {
    id: z.string(),
    include-collaborators: z.string().optional(),
    include-direct-children: z.string().optional(),
    include-operations: z.string().optional(),
    include-properties: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/whiteboards/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-whiteboard',
  `Delete whiteboard`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/whiteboards/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-whiteboard-content-properties',
  `Get content properties for whiteboard`,
  {
    id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/whiteboards/${id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-whiteboard-property',
  `Create content property for whiteboard`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/whiteboards/${id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-whiteboard-content-properties-by-id',
  `Get content property for whiteboard by id`,
  {
    whiteboard-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { whiteboard-id, property-id, ...queryParams } = args
      const url = `/whiteboards/${whiteboard-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-whiteboard-property-by-id',
  `Update content property for whiteboard by id`,
  {
    whiteboard-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { whiteboard-id, property-id, ...requestData } = args
      const url = `/whiteboards/${whiteboard-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-whiteboard-property-by-id',
  `Delete content property for whiteboard by id`,
  {
    whiteboard-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { whiteboard-id, property-id, ...queryParams } = args
      const url = `/whiteboards/${whiteboard-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-whiteboard-operations',
  `Get permitted operations for a whiteboard`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/whiteboards/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-whiteboard-direct-children',
  `Get direct children of a whiteboard`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/whiteboards/${id}/direct-children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-whiteboard-descendants',
  `Get descendants of a whiteboard`,
  {
    id: z.string(),
    limit: z.string().optional(),
    depth: z.string().optional(),
    cursor: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/whiteboards/${id}/descendants`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-whiteboard-ancestors',
  `Get all ancestors of whiteboard`,
  {
    id: z.string(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/whiteboards/${id}/ancestors`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-database',
  `Create database`,
  {
    private: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/databases',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-database-by-id',
  `Get database by id`,
  {
    id: z.string(),
    include-collaborators: z.string().optional(),
    include-direct-children: z.string().optional(),
    include-operations: z.string().optional(),
    include-properties: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/databases/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-database',
  `Delete database`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/databases/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-database-content-properties',
  `Get content properties for database`,
  {
    id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/databases/${id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-database-property',
  `Create content property for database`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/databases/${id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-database-content-properties-by-id',
  `Get content property for database by id`,
  {
    database-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { database-id, property-id, ...queryParams } = args
      const url = `/databases/${database-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-database-property-by-id',
  `Update content property for database by id`,
  {
    database-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { database-id, property-id, ...requestData } = args
      const url = `/databases/${database-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-database-property-by-id',
  `Delete content property for database by id`,
  {
    database-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { database-id, property-id, ...queryParams } = args
      const url = `/databases/${database-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-database-operations',
  `Get permitted operations for a database`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/databases/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-database-direct-children',
  `Get direct children of a database`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/databases/${id}/direct-children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-database-descendants',
  `Get descendants of a database`,
  {
    id: z.string(),
    limit: z.string().optional(),
    depth: z.string().optional(),
    cursor: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/databases/${id}/descendants`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-database-ancestors',
  `Get all ancestors of database`,
  {
    id: z.string(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/databases/${id}/ancestors`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-smart-link',
  `Create Smart Link in the content tree`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/embeds',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-smart-link-by-id',
  `Get Smart Link in the content tree by id`,
  {
    id: z.string(),
    include-collaborators: z.string().optional(),
    include-direct-children: z.string().optional(),
    include-operations: z.string().optional(),
    include-properties: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/embeds/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-smart-link',
  `Delete Smart Link in the content tree`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/embeds/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-smart-link-content-properties',
  `Get content properties for Smart Link in the content tree`,
  {
    id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/embeds/${id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-smart-link-property',
  `Create content property for Smart Link in the content tree`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/embeds/${id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-smart-link-content-properties-by-id',
  `Get content property for Smart Link in the content tree by id`,
  {
    embed-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { embed-id, property-id, ...queryParams } = args
      const url = `/embeds/${embed-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-smart-link-property-by-id',
  `Update content property for Smart Link in the content tree by id`,
  {
    embed-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { embed-id, property-id, ...requestData } = args
      const url = `/embeds/${embed-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-smart-link-property-by-id',
  `Delete content property for Smart Link in the content tree by id`,
  {
    embed-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { embed-id, property-id, ...queryParams } = args
      const url = `/embeds/${embed-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-smart-link-operations',
  `Get permitted operations for a Smart Link in the content tree`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/embeds/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-smart-link-direct-children',
  `Get direct children of a Smart Link`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/embeds/${id}/direct-children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-smart-link-descendants',
  `Get descendants of a smart link`,
  {
    id: z.string(),
    limit: z.string().optional(),
    depth: z.string().optional(),
    cursor: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/embeds/${id}/descendants`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-smart-link-ancestors',
  `Get all ancestors of Smart Link in content tree`,
  {
    id: z.string(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/embeds/${id}/ancestors`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-folder',
  `Create folder`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/folders',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-folder-by-id',
  `Get folder by id`,
  {
    id: z.string(),
    include-collaborators: z.string().optional(),
    include-direct-children: z.string().optional(),
    include-operations: z.string().optional(),
    include-properties: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/folders/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-folder',
  `Delete folder`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/folders/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-folder-content-properties',
  `Get content properties for folder`,
  {
    id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/folders/${id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-folder-property',
  `Create content property for folder`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/folders/${id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-folder-content-properties-by-id',
  `Get content property for folder by id`,
  {
    folder-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { folder-id, property-id, ...queryParams } = args
      const url = `/folders/${folder-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-folder-property-by-id',
  `Update content property for folder by id`,
  {
    folder-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { folder-id, property-id, ...requestData } = args
      const url = `/folders/${folder-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-folder-property-by-id',
  `Delete content property for folder by id`,
  {
    folder-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { folder-id, property-id, ...queryParams } = args
      const url = `/folders/${folder-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-folder-operations',
  `Get permitted operations for a folder`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/folders/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-folder-direct-children',
  `Get direct children of a folder`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/folders/${id}/direct-children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-folder-descendants',
  `Get descendants of folder`,
  {
    id: z.string(),
    limit: z.string().optional(),
    depth: z.string().optional(),
    cursor: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/folders/${id}/descendants`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-folder-ancestors',
  `Get all ancestors of folder`,
  {
    id: z.string(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/folders/${id}/ancestors`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-version-details',
  `Get version details for page version`,
  {
    page-id: z.string(),
    version-number: z.string(),
  },
  async (args, extra) => {
    try {
      const { page-id, version-number, ...queryParams } = args
      const url = `/pages/${page-id}/versions/${version-number}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-versions',
  `Get custom content versions`,
  {
    custom-content-id: z.string(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { custom-content-id, ...queryParams } = args
      const url = `/custom-content/${custom-content-id}/versions`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-version-details',
  `Get version details for custom content version`,
  {
    custom-content-id: z.string(),
    version-number: z.string(),
  },
  async (args, extra) => {
    try {
      const { custom-content-id, version-number, ...queryParams } = args
      const url = `/custom-content/${custom-content-id}/versions/${version-number}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-spaces',
  `Get spaces`,
  {
    ids: z.string().optional(),
    keys: z.string().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    labels: z.string().optional(),
    favorited-by: z.string().optional(),
    not-favorited-by: z.string().optional(),
    sort: z.string().optional(),
    description-format: z.string().optional(),
    include-icon: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/spaces',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-space',
  `Create space`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/spaces',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-by-id',
  `Get space by id`,
  {
    id: z.string(),
    description-format: z.string().optional(),
    include-icon: z.string().optional(),
    include-operations: z.string().optional(),
    include-properties: z.string().optional(),
    include-permissions: z.string().optional(),
    include-role-assignments: z.string().optional(),
    include-labels: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-posts-in-space',
  `Get blog posts in space`,
  {
    id: z.string(),
    sort: z.string().optional(),
    status: z.string().optional(),
    title: z.string().optional(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/blogposts`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-labels',
  `Get labels for space`,
  {
    id: z.string(),
    prefix: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/labels`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-content-labels',
  `Get labels for space content`,
  {
    id: z.string(),
    prefix: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/content/labels`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-custom-content-by-type-in-space',
  `Get custom content by type in space`,
  {
    id: z.string(),
    type: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    body-format: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/custom-content`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-operations',
  `Get permitted operations for space`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-pages-in-space',
  `Get pages in space`,
  {
    id: z.string(),
    depth: z.string().optional(),
    sort: z.string().optional(),
    status: z.string().optional(),
    title: z.string().optional(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/pages`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-properties',
  `Get space properties in space`,
  {
    space-id: z.string(),
    key: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { space-id, ...queryParams } = args
      const url = `/spaces/${space-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-space-property',
  `Create space property in space`,
  {
    space-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { space-id, ...requestData } = args
      const url = `/spaces/${space-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-property-by-id',
  `Get space property by id`,
  {
    space-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { space-id, property-id, ...queryParams } = args
      const url = `/spaces/${space-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-space-property-by-id',
  `Update space property by id`,
  {
    space-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { space-id, property-id, ...requestData } = args
      const url = `/spaces/${space-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-space-property-by-id',
  `Delete space property by id`,
  {
    space-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { space-id, property-id, ...queryParams } = args
      const url = `/spaces/${space-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-permissions-assignments',
  `Get space permissions assignments`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/permissions`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-available-space-permissions',
  `Get available space permissions`,
  {
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/space-permissions',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-available-space-roles',
  `Get available space roles`,
  {
    space-id: z.string().optional(),
    role-type: z.string().optional(),
    principal-id: z.string().optional(),
    principal-type: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/space-roles',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-roles-by-id',
  `Get space role by ID`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/space-roles/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-role-assignments',
  `Get space role assignments`,
  {
    id: z.string(),
    role-id: z.string().optional(),
    role-type: z.string().optional(),
    principal-id: z.string().optional(),
    principal-type: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/role-assignments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'set-space-role-assignments',
  `Set space role assignments`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/spaces/${id}/role-assignments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-footer-comments',
  `Get footer comments for page`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    status: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/footer-comments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-inline-comments',
  `Get inline comments for page`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    status: z.string().optional(),
    resolution-status: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/inline-comments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-footer-comments',
  `Get footer comments for blog post`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    status: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/footer-comments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-inline-comments',
  `Get inline comments for blog post`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    status: z.string().optional(),
    resolution-status: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/inline-comments`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-footer-comments',
  `Get footer comments`,
  {
    body-format: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/footer-comments',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-footer-comment',
  `Create footer comment`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/footer-comments',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-footer-comment-by-id',
  `Get footer comment by id`,
  {
    comment-id: z.string(),
    body-format: z.string().optional(),
    version: z.string().optional(),
    include-properties: z.string().optional(),
    include-operations: z.string().optional(),
    include-likes: z.string().optional(),
    include-versions: z.string().optional(),
    include-version: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { comment-id, ...queryParams } = args
      const url = `/footer-comments/${comment-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-footer-comment',
  `Update footer comment`,
  {
    comment-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { comment-id, ...requestData } = args
      const url = `/footer-comments/${comment-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-footer-comment',
  `Delete footer comment`,
  {
    comment-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { comment-id, ...queryParams } = args
      const url = `/footer-comments/${comment-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-footer-comment-children',
  `Get children footer comments`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/footer-comments/${id}/children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-footer-like-count',
  `Get like count for footer comment`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/footer-comments/${id}/likes/count`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-footer-like-users',
  `Get account IDs of likes for footer comment`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/footer-comments/${id}/likes/users`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-footer-comment-operations',
  `Get permitted operations for footer comment`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/footer-comments/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-footer-comment-versions',
  `Get footer comment versions`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/footer-comments/${id}/versions`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-footer-comment-version-details',
  `Get version details for footer comment version`,
  {
    id: z.string(),
    version-number: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, version-number, ...queryParams } = args
      const url = `/footer-comments/${id}/versions/${version-number}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-inline-comments',
  `Get inline comments`,
  {
    body-format: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/inline-comments',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-inline-comment',
  `Create inline comment`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/inline-comments',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-inline-comment-by-id',
  `Get inline comment by id`,
  {
    comment-id: z.string(),
    body-format: z.string().optional(),
    version: z.string().optional(),
    include-properties: z.string().optional(),
    include-operations: z.string().optional(),
    include-likes: z.string().optional(),
    include-versions: z.string().optional(),
    include-version: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { comment-id, ...queryParams } = args
      const url = `/inline-comments/${comment-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-inline-comment',
  `Update inline comment`,
  {
    comment-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { comment-id, ...requestData } = args
      const url = `/inline-comments/${comment-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-inline-comment',
  `Delete inline comment`,
  {
    comment-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { comment-id, ...queryParams } = args
      const url = `/inline-comments/${comment-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-inline-comment-children',
  `Get children inline comments`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/inline-comments/${id}/children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-inline-like-count',
  `Get like count for inline comment`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/inline-comments/${id}/likes/count`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-inline-like-users',
  `Get account IDs of likes for inline comment`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/inline-comments/${id}/likes/users`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-inline-comment-operations',
  `Get permitted operations for inline comment`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/inline-comments/${id}/operations`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-inline-comment-versions',
  `Get inline comment versions`,
  {
    id: z.string(),
    body-format: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/inline-comments/${id}/versions`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-inline-comment-version-details',
  `Get version details for inline comment version`,
  {
    id: z.string(),
    version-number: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, version-number, ...queryParams } = args
      const url = `/inline-comments/${id}/versions/${version-number}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-comment-content-properties',
  `Get content properties for comment`,
  {
    comment-id: z.string(),
    key: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { comment-id, ...queryParams } = args
      const url = `/comments/${comment-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-comment-property',
  `Create content property for comment`,
  {
    comment-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { comment-id, ...requestData } = args
      const url = `/comments/${comment-id}/properties`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-comment-content-properties-by-id',
  `Get content property for comment by id`,
  {
    comment-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { comment-id, property-id, ...queryParams } = args
      const url = `/comments/${comment-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-comment-property-by-id',
  `Update content property for comment by id`,
  {
    comment-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { comment-id, property-id, ...requestData } = args
      const url = `/comments/${comment-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-comment-property-by-id',
  `Delete content property for comment by id`,
  {
    comment-id: z.string(),
    property-id: z.string(),
  },
  async (args, extra) => {
    try {
      const { comment-id, property-id, ...queryParams } = args
      const url = `/comments/${comment-id}/properties/${property-id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-tasks',
  `Get tasks`,
  {
    body-format: z.string().optional(),
    include-blank-tasks: z.string().optional(),
    status: z.string().optional(),
    task-id: z.string().optional(),
    space-id: z.string().optional(),
    page-id: z.string().optional(),
    blogpost-id: z.string().optional(),
    created-by: z.string().optional(),
    assigned-to: z.string().optional(),
    completed-by: z.string().optional(),
    created-at-from: z.string().optional(),
    created-at-to: z.string().optional(),
    due-at-from: z.string().optional(),
    due-at-to: z.string().optional(),
    completed-at-from: z.string().optional(),
    completed-at-to: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/tasks',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-task-by-id',
  `Get task by id`,
  {
    id: z.string(),
    body-format: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/tasks/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'update-task',
  `Update task`,
  {
    id: z.string(),
    body-format: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/tasks/${id}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-child-pages',
  `Get child pages`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-child-custom-content',
  `Get child custom content`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/custom-content/${id}/children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-direct-children',
  `Get direct children of a page`,
  {
    id: z.string(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/direct-children`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-ancestors',
  `Get all ancestors of page`,
  {
    id: z.string(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/ancestors`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-descendants',
  `Get descendants of page`,
  {
    id: z.string(),
    limit: z.string().optional(),
    depth: z.string().optional(),
    cursor: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/descendants`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'create-bulk-user-lookup',
  `Create bulk user lookup using ids`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/users-bulk',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'check-access-by-email',
  `Check site access for a list of emails`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/user/access/check-access-by-email',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'invite-by-email',
  `Invite a list of emails to the site`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: '/user/access/invite-by-email',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-data-policy-metadata',
  `Get data policy metadata for the workspace`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/data-policies/metadata',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-data-policy-spaces',
  `Get spaces with data policies`,
  {
    ids: z.string().optional(),
    keys: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.string().optional(),
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/data-policies/spaces',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-classification-levels',
  `Get list of classification levels`,
  {
  },
  async (args, extra) => {
    try {

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: '/classification-levels',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-space-default-classification-level',
  `Get space default classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/classification-level/default`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-space-default-classification-level',
  `Update space default classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/spaces/${id}/classification-level/default`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-space-default-classification-level',
  `Delete space default classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/spaces/${id}/classification-level/default`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-page-classification-level',
  `Get page classification level`,
  {
    id: z.string(),
    status: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/pages/${id}/classification-level`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-page-classification-level',
  `Update page classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/pages/${id}/classification-level`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-page-classification-level',
  `Reset page classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/pages/${id}/classification-level/reset`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-blog-post-classification-level',
  `Get blog post classification level`,
  {
    id: z.string(),
    status: z.string().optional(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/blogposts/${id}/classification-level`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-blog-post-classification-level',
  `Update blog post classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/blogposts/${id}/classification-level`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-blog-post-classification-level',
  `Reset blog post classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/blogposts/${id}/classification-level/reset`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-whiteboard-classification-level',
  `Get whiteboard classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/whiteboards/${id}/classification-level`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-whiteboard-classification-level',
  `Update whiteboard classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/whiteboards/${id}/classification-level`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-whiteboard-classification-level',
  `Reset whiteboard classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/whiteboards/${id}/classification-level/reset`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-database-classification-level',
  `Get database classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...queryParams } = args
      const url = `/databases/${id}/classification-level`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-database-classification-level',
  `Update database classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/databases/${id}/classification-level`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-database-classification-level',
  `Reset database classification level`,
  {
    id: z.string(),
  },
  async (args, extra) => {
    try {
      const { id, ...requestData } = args
      const url = `/databases/${id}/classification-level/reset`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-forge-app-property',
  `Create or update a Forge app property.`,
  {
    propertyKey: z.string(),
  },
  async (args, extra) => {
    try {
      const { propertyKey, ...requestData } = args
      const url = `/app/properties/${propertyKey}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-forge-app-property',
  `Deletes a Forge app property.`,
  {
    propertyKey: z.string(),
  },
  async (args, extra) => {
    try {
      const { propertyKey, ...queryParams } = args
      const url = `/app/properties/${propertyKey}`

      // Extract authorization token from HTTP request headers
      const authorization = extra?.requestInfo?.headers?.authorization as string
      const bearer = authorization?.replace('Bearer ', '')
  
      
      const response = await apiClient.request({
        headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

