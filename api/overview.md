---
sidebar_position: 1
---

# API Documentation Overview

This section contains comprehensive API documentation for the AI-Native Physical AI & Humanoid Robotics textbook platform.

## API Categories

The platform provides several categories of APIs:

### Core APIs
- **Authentication API**: User authentication and authorization
- **Content API**: Textbook content management and retrieval
- **User Profile API**: User preferences and settings management
- **Analytics API**: Usage tracking and metrics collection

### AI Service APIs
- **RAG Chatbot API**: Question-answering and knowledge retrieval
- **Translation API**: Urdu translation services
- **Personalization API**: Content adaptation services
- **Subagent API**: AI subagent execution services

### Robot Control APIs
- **Movement API**: Robot locomotion and manipulation commands
- **Sensing API**: Sensor data and perception services
- **Navigation API**: Path planning and obstacle avoidance
- **Communication API**: ROS 2 bridge and communication

## API Standards

All APIs follow consistent standards:

- **RESTful design**: Following REST principles for predictable interfaces
- **JSON format**: Requests and responses in JSON format
- **Standard HTTP codes**: Using appropriate HTTP status codes
- **Authentication**: JWT-based authentication for protected endpoints
- **Rate limiting**: Preventing abuse with rate limiting
- **Versioning**: API versioning for backward compatibility

## Getting Started

### Authentication

Most API endpoints require authentication. Include your access token in the Authorization header:

```
Authorization: Bearer {your-access-token}
```

### Base URL

The base URL for all API requests is:
```
https://api.physical-ai-textbook.com/v1
```

### Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details"
  }
}
```

## Example Request

Here's an example of how to make an API request:

```bash
curl -X GET \
  https://api.physical-ai-textbook.com/v1/chatbot/query \
  -H 'Authorization: Bearer your-access-token' \
  -H 'Content-Type: application/json' \
  -d '{
    "query_text": "What is forward kinematics?",
    "chapter_id": "kinematics-intro"
  }'
```

## Response Format

API responses follow a consistent structure:

```json
{
  "success": true,
  "data": {
    // Response data specific to the endpoint
  },
  "meta": {
    "timestamp": "2023-12-01T10:00:00Z",
    "request_id": "unique-request-id"
  }
}
```

## Rate Limits

API usage is rate-limited to ensure fair access:

- **Unauthenticated requests**: 10 requests per minute
- **Authenticated requests**: 100 requests per minute
- **Educational use**: 1000 requests per minute (with approval)

## Testing APIs

You can test APIs using various tools:

- **Postman**: Import our Postman collection for easy testing
- **Swagger UI**: Interactive API documentation with built-in testing
- **Command line**: Use curl or similar tools for direct requests
- **SDKs**: Use our official SDKs for your preferred programming language