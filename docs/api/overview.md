---
sidebar_position: 1
---

# API Documentation Overview

Learn about the API documentation system for the AI-Native Physical AI & Humanoid Robotics textbook project.

## API Documentation Structure

The API documentation system provides comprehensive documentation for all APIs in the project, including:

- **REST APIs**: Traditional REST endpoints
- **GraphQL APIs**: GraphQL schemas and resolvers
- **WebSocket APIs**: Real-time communication endpoints
- **AI Service APIs**: Chatbot, translation, and personalization services
- **Robot Control APIs**: ROS 2 and robot-specific endpoints

## Auto-Generated API Docs

API documentation is automatically generated from:

- **OpenAPI/Swagger definitions**
- **FastAPI route definitions** (using `fastapi.openapi()` or `drf-spectacular`)
- **JSDoc comments** in API route handlers
- **TypeScript interfaces** and types
- **GraphQL schemas**

## API Categories

### Core APIs

- **Authentication API**: User authentication and authorization
- **Content API**: Textbook content management
- **User Profile API**: User preferences and settings
- **Analytics API**: Usage tracking and metrics

### AI Service APIs

- **RAG Chatbot API**: Question-answering and knowledge retrieval
- **Translation API**: Urdu translation services
- **Personalization API**: Content adaptation services
- **Subagent API**: AI subagent execution services

### Robot Control APIs

- **Movement API**: Robot locomotion and manipulation
- **Sensing API**: Sensor data and perception
- **Navigation API**: Path planning and obstacle avoidance
- **Communication API**: ROS 2 bridge and communication

## Documentation Format

API documentation follows the OpenAPI 3.0 specification with additional custom fields for robotics-specific functionality:

```yaml
openapi: 3.0.0
info:
  title: Physical AI & Humanoid Robotics API
  description: API for the AI-Native textbook platform
  version: 1.0.0
paths:
  /api/chatbot/query:
    post:
      summary: Query the textbook chatbot
      description: Ask a question about the textbook content
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - query_text
              properties:
                user_id:
                  type: string
                  description: User identifier
                chapter_id:
                  type: string
                  description: Current chapter identifier
                query_text:
                  type: string
                  description: The question to ask
      responses:
        '200':
          description: Query response successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  response_text:
                    type: string
                    description: The chatbot's response
                  sources:
                    type: array
                    items:
                      type: object
                      properties:
                        chapter:
                          type: string
                        section:
                          type: string
                  confidence_score:
                    type: number
                    format: float
```

## Interactive Documentation

API documentation includes interactive elements:

- **Try it out**: Execute API calls directly from the documentation
- **Parameter validation**: Real-time validation of input parameters
- **Response examples**: Sample responses for different scenarios
- **Code snippets**: Ready-to-use code examples in multiple languages

## Versioning

API documentation is versioned to match API versions:

- **Current version**: Always documents the latest stable API
- **Historical versions**: Available for backward compatibility
- **Deprecated endpoints**: Clearly marked with migration guidance
- **Beta features**: Marked as experimental

## Navigation

Use the sidebar to navigate different API sections:

- **Overview**: This page and general API information
- **Authentication**: Auth-related endpoints
- **Content**: Textbook content APIs
- **AI Services**: AI feature APIs
- **Robot Control**: Robot-specific APIs
- **Reference**: Complete API reference