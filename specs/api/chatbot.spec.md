---
title: Chatbot API Specification
description: Specification for the RAG Chatbot API in the Physical AI & Humanoid Robotics textbook platform
sidebar_label: Chatbot API
---

# Chatbot API Specification

## Overview

The RAG (Retrieval-Augmented Generation) Chatbot API provides intelligent question-answering capabilities for the Physical AI & Humanoid Robotics textbook. It leverages textbook content to provide accurate, context-aware responses to student queries.

## Base URL

```
https://api.physical-ai-textbook.com/v1
```

## Authentication

All endpoints require Bearer token authentication:

```
Authorization: Bearer {access_token}
```

## Endpoints

### POST /chatbot/query

Ask a question about the textbook content.

#### Request

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body:**
```json
{
  "query_text": "string",
  "user_id": "string (optional)",
  "chapter_id": "string (optional)",
  "context_range": "enum (chapter|book|custom) (default: book)",
  "selected_text": "string (optional)",
  "include_sources": "boolean (default: true)"
}
```

**Parameters:**
- `query_text` (required): The question to ask
- `user_id` (optional): User identifier for personalization
- `chapter_id` (optional): Current chapter for context
- `context_range` (optional): Scope of content to consider (default: book)
- `selected_text` (optional): Specific text the user has selected
- `include_sources` (optional): Whether to include source references (default: true)

#### Response

**Success Response (200):**
```json
{
  "response_text": "string",
  "sources": [
    {
      "chapter": "string",
      "section": "string",
      "page_reference": "string",
      "confidence": "number (0-1)"
    }
  ],
  "confidence_score": "number (0-1)",
  "followup_questions": ["string"],
  "meta": {
    "query_id": "string",
    "timestamp": "string (ISO 8601)",
    "processing_time_ms": "number"
  }
}
```

**Error Response (400):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "string",
    "details": "object"
  }
}
```

**Error Response (429):**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later."
  }
}
```

#### Example Request

```bash
curl -X POST \
  https://api.physical-ai-textbook.com/v1/chatbot/query \
  -H 'Authorization: Bearer your-access-token' \
  -H 'Content-Type: application/json' \
  -d '{
    "query_text": "What is forward kinematics?",
    "chapter_id": "kinematics-intro",
    "context_range": "chapter"
  }'
```

#### Example Response

```json
{
  "response_text": "Forward kinematics is the process of determining the position and orientation of the end effector of a robotic arm based on the known joint angles. It involves calculating the transformation matrices for each joint and combining them to find the final position.",
  "sources": [
    {
      "chapter": "Kinematics Fundamentals",
      "section": "Forward Kinematics",
      "page_reference": "p. 145",
      "confidence": 0.95
    }
  ],
  "confidence_score": 0.92,
  "followup_questions": [
    "What is inverse kinematics?",
    "How is forward kinematics calculated?",
    "What are the applications of forward kinematics?"
  ],
  "meta": {
    "query_id": "query-12345",
    "timestamp": "2023-12-01T10:00:00Z",
    "processing_time_ms": 450
  }
}
```

### POST /chatbot/query-selected

Ask about specific selected text in the textbook.

#### Request

**Body:**
```json
{
  "selected_text": "string (required)",
  "question": "string (required)",
  "user_id": "string (optional)",
  "chapter_id": "string (optional)"
}
```

**Parameters:**
- `selected_text` (required): The text that was selected by the user
- `question` (required): The question about the selected text
- `user_id` (optional): User identifier for personalization
- `chapter_id` (optional): Current chapter for context

#### Response

Same as `/chatbot/query` endpoint.

#### Example Request

```bash
curl -X POST \
  https://api.physical-ai-textbook.com/v1/chatbot/query-selected \
  -H 'Authorization: Bearer your-access-token' \
  -H 'Content-Type: application/json' \
  -d '{
    "selected_text": "The Jacobian matrix relates joint velocities to end-effector velocities",
    "question": "Can you explain this concept?",
    "chapter_id": "kinematics-advanced"
  }'
```

### GET /chatbot/health

Check the health status of the chatbot service.

#### Response

**Success Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "string (ISO 8601)",
  "services": {
    "vector_db": "healthy",
    "llm": "healthy",
    "content_index": "up_to_date"
  }
}
```

## Rate Limits

- **Queries per minute**: 60 requests per authenticated user
- **Queries per hour**: 1000 requests per authenticated user
- **Concurrent requests**: 5 per user

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| CHAT_001 | 400 | Invalid query parameters |
| CHAT_002 | 401 | Authentication required |
| CHAT_003 | 403 | Insufficient permissions |
| CHAT_004 | 429 | Rate limit exceeded |
| CHAT_005 | 500 | Internal server error |
| CHAT_006 | 503 | Service temporarily unavailable |

## Response Confidence Levels

The API provides confidence scores to indicate the reliability of responses:

- **0.9-1.0**: Very high confidence - Response is highly accurate
- **0.7-0.9**: High confidence - Response is accurate with minor uncertainties
- **0.5-0.7**: Medium confidence - Response is generally accurate but may have limitations
- **0.3-0.5**: Low confidence - Response should be verified
- **0.0-0.3**: Very low confidence - Response may be inaccurate

## Personalization

The API supports personalization based on user profiles:

- **Difficulty level**: Responses adapted to user's skill level
- **Learning pace**: Explanation depth based on user preferences
- **Hardware focus**: Examples and explanations tailored to user's hardware

## Privacy and Data Usage

- **Query logs**: Stored for service improvement (anonymized after 30 days)
- **Personal data**: Not used for model training without explicit consent
- **Content access**: Only textbook content is used for responses
- **User preferences**: Used to improve response relevance

## Integration Guidelines

### Frontend Integration

```javascript
// Example JavaScript integration
async function askQuestion(queryText, chapterId) {
  try {
    const response = await fetch('/api/chatbot/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query_text: queryText,
        chapter_id: chapterId,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response_text;
  } catch (error) {
    console.error('Chatbot API error:', error);
    throw error;
  }
}
```

### Error Handling Best Practices

1. **Graceful degradation**: Provide fallback when API is unavailable
2. **Rate limit awareness**: Implement client-side rate limiting
3. **User feedback**: Show loading states and error messages
4. **Retry logic**: Implement exponential backoff for transient errors

## Performance Metrics

- **Average response time**: &lt;500ms for 95% of requests
- **Availability**: 99.9% uptime
- **Accuracy**: >90% accuracy for textbook-related queries
- **Latency**: &lt;200ms for simple queries, &lt;800ms for complex queries

## Testing

### Unit Tests

```javascript
// Example unit test
test('should return relevant response for kinematics query', async () => {
  const response = await chatbotAPI.query({
    query_text: 'What is forward kinematics?',
    chapter_id: 'kinematics-intro'
  });

  expect(response.response_text).toContain('end effector');
  expect(response.confidence_score).toBeGreaterThan(0.7);
  expect(response.sources.length).toBeGreaterThan(0);
});
```

### Integration Tests

Test the complete flow from user input to response delivery, including:
- Authentication validation
- Request parameter validation
- Response formatting
- Error handling
- Rate limiting enforcement

## Migration Guide

### From v1 to v2

- **New endpoint**: `/chatbot/query-selected` for selected text queries
- **Enhanced responses**: Additional metadata in response objects
- **Improved confidence scoring**: More granular confidence levels
- **Better source attribution**: More detailed source references
- **Rate limiting changes**: Updated rate limits and error codes

## Troubleshooting

### Common Issues

**Issue**: Getting 429 errors frequently
**Solution**: Implement client-side rate limiting and exponential backoff

**Issue**: Low confidence responses
**Solution**: Verify query is related to textbook content and well-formulated

**Issue**: No sources in response
**Solution**: Check that the query relates to indexed textbook content

**Issue**: Slow response times
**Solution**: Optimize query complexity and check network connectivity

### Debugging

Include the `query_id` from the response in any support requests to help with debugging.