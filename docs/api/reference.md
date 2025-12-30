# API Reference

Complete reference for all APIs in the AI-Native Physical AI & Humanoid Robotics textbook project.

## Authentication API

### POST /api/auth/signup

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "hardware_specs": {
    "gpu_model": "RTX 4080",
    "ram_gb": 32,
    "cpu_model": "i9-13900K"
  },
  "operating_system": "Linux",
  "robotics_background": "intermediate",
  "ai_ml_background": "beginner"
}
```

**Response:**
```json
{
  "user_id": "uuid-string",
  "access_token": "jwt-token",
  "refresh_token": "jwt-refresh-token"
}
```

### POST /api/auth/login

Authenticate user and get access tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "user_id": "uuid-string",
  "access_token": "jwt-token",
  "refresh_token": "jwt-refresh-token"
}
```

### GET /api/auth/profile

Get current user's profile information.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": "uuid-string",
  "email": "user@example.com",
  "hardware_specs": {
    "gpu_model": "RTX 4080",
    "ram_gb": 32,
    "cpu_model": "i9-13900K"
  },
  "operating_system": "Linux",
  "robotics_background": "intermediate",
  "ai_ml_background": "beginner",
  "preferred_difficulty": "intermediate",
  "time_budget": "standard"
}
```

## RAG Chatbot API

### POST /api/chatbot/query

Ask a question about the textbook content.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "user_id": "uuid-string",
  "chapter_id": "chapter-uuid",
  "query_text": "What is forward kinematics?",
  "context_range": "chapter"
}
```

**Response:**
```json
{
  "response_text": "Forward kinematics is the process of determining the position and orientation of the end effector of a robotic arm based on the joint angles...",
  "sources": [
    {
      "chapter": "Kinematics",
      "section": "Forward Kinematics",
      "page_reference": "p. 145"
    }
  ],
  "confidence_score": 0.92,
  "followup_questions": [
    "What is inverse kinematics?",
    "How is forward kinematics calculated?"
  ]
}
```

### POST /api/chatbot/query-selected

Ask about specific selected text.

**Request Body:**
```json
{
  "user_id": "uuid-string",
  "chapter_id": "chapter-uuid",
  "selected_text": "The Jacobian matrix relates joint velocities to end-effector velocities",
  "question": "Can you explain this concept?"
}
```

**Response:**
```json
{
  "response_text": "The Jacobian matrix is a fundamental concept in robotics that describes the relationship between joint space velocities and Cartesian space velocities...",
  "sources": [...],
  "confidence_score": 0.88
}
```

## Personalization API

### POST /api/personalization/get-content

Get personalized chapter content based on user profile.

**Request Body:**
```json
{
  "user_id": "uuid-string",
  "chapter_slug": "kinematics-fundamentals",
  "adaptation_preferences": {
    "difficulty_level": "beginner",
    "hardware_focus": "jetson-orin",
    "time_constraint": "constrained"
  }
}
```

**Response:**
```json
{
  "chapter_slug": "kinematics-fundamentals",
  "title": "Kinematics Fundamentals",
  "content": "Simplified explanation of kinematics for beginners...",
  "adaptation_metadata": {
    "applied_difficulty": "beginner",
    "applied_hardware_focus": "jetson-orin",
    "content_modifications": ["simplified_explanations", "reduced_mathematical_complexity"]
  }
}
```

### POST /api/personalization/generate-version

Generate a specific version of content for a user.

**Request Body:**
```json
{
  "user_id": "uuid-string",
  "chapter_slug": "ros2-introduction",
  "target_level": "expert",
  "hardware_specs": {
    "gpu_model": "RTX 4080",
    "ram_gb": 32
  }
}
```

**Response:**
```json
{
  "chapter_slug": "ros2-introduction",
  "title": "ROS 2 Introduction (Expert Version)",
  "content": "Advanced ROS 2 concepts including...",
  "adaptation_metadata": {
    "target_level": "expert",
    "content_depth": "advanced"
  }
}
```

## Translation API

### POST /api/translation/urdu

Translate content to Urdu.

**Request Body:**
```json
{
  "content": "Forward kinematics is the process of determining the position and orientation of the end effector",
  "preserve_technical_terms": true
}
```

**Response:**
```json
{
  "urdu_translation": "فرورڈ کنیمیٹکس ایک عمل ہے جس میں اینڈ ایفیکٹر کی پوزیشن اور اورینٹیشن کا تعین کیا جاتا ہے",
  "translation_metadata": {
    "confidence": 0.95,
    "technical_terms_preserved": true
  }
}
```

## Subagent API

### POST /api/subagents/{`agent_type`}/execute

Execute a specific AI subagent.

**Path Parameters:**
- `agent_type`: Type of subagent (e.g., "ros2-coding", "gazebo-builder", "isaac-debugger")

**Request Body:**
```json
{
  "user_input": "How do I create a ROS 2 publisher in Python?",
  "context_data": {
    "current_chapter": "ros2-fundamentals",
    "user_level": "beginner"
  },
  "parameters": {
    "include_examples": true,
    "target_language": "python"
  }
}
```

**Response:**
```json
{
  "agent_output": "To create a ROS 2 publisher in Python, you need to...",
  "execution_metadata": {
    "agent_type": "ros2-coding",
    "execution_time": 1250,
    "confidence": 0.91
  }
}
```

### GET /api/subagents/available

Get list of available subagents.

**Response:**
```json
[
  {
    "agent_id": "ros2-coding-agent",
    "agent_type": "ros2-coding",
    "capabilities": ["code-generation", "debugging", "examples"],
    "description": "Assists with ROS 2 code development"
  },
  {
    "agent_id": "gazebo-builder-agent",
    "agent_type": "gazebo-builder",
    "capabilities": ["world-creation", "model-import", "simulation-setup"],
    "description": "Helps build Gazebo simulation environments"
  },
  {
    "agent_id": "isaac-debugger-agent",
    "agent_type": "isaac-debugger",
    "capabilities": ["debugging", "troubleshooting", "optimization"],
    "description": "Assists with Isaac Sim issues"
  }
]
```

## Robot Control API

### POST /api/robot/{`robot_id`}/move

Command a robot to move to a target position.

**Path Parameters:**
- `robot_id`: Unique identifier for the robot

**Request Body:**
```json
{
  "target": {
    "x": 1.5,
    "y": 2.0,
    "z": 0.0
  },
  "speed": 0.5,
  "frame": "world"
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "move-task-uuid",
  "estimated_completion": "2023-12-01T10:30:00Z"
}
```

### GET /api/robot/{`robot_id`}/status

Get current robot status.

**Response:**
```json
{
  "robot_id": "robot-1",
  "position": {
    "x": 1.2,
    "y": 1.8,
    "z": 0.0
  },
  "orientation": {
    "x": 0.0,
    "y": 0.0,
    "z": 0.707,
    "w": 0.707
  },
  "battery_level": 0.85,
  "status": "idle",
  "last_updated": "2023-12-01T10:25:30Z"
}
```

## Error Handling

All API endpoints follow consistent error response format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details"
  }
}
```

### Common Error Codes

- `AUTH_001`: Authentication required
- `AUTH_002`: Invalid credentials
- `VALIDATION_001`: Invalid input parameters
- `RESOURCE_001`: Resource not found
- `PERMISSION_001`: Insufficient permissions
- `INTERNAL_001`: Internal server error