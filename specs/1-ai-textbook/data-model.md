# Data Model for AI-Native Textbook

## User Profile Entity

**Description**: Stores user information for personalization and authentication

**Fields**:
- `id`: string (UUID) - Primary identifier
- `email`: string (unique) - User's email address
- `password_hash`: string - Securely hashed password
- `hardware_specs`: object - User's hardware specifications
  - `gpu_model`: string - GPU model (e.g., "RTX 4080")
  - `ram_gb`: integer - RAM in gigabytes
  - `cpu_model`: string - CPU model
- `operating_system`: string - "Windows", "Linux", or "Mac"
- `robotics_background`: string - "beginner", "intermediate", or "expert"
- `ai_ml_background`: string - Experience level with AI/ML
- `preferred_difficulty`: string - Default content difficulty level
- `time_budget`: string - "constrained", "standard", or "extended"
- `created_at`: datetime - Account creation timestamp
- `updated_at`: datetime - Last profile update timestamp

**Validation Rules**:
- Email must be valid email format
- Hardware specs must be properly structured
- Background levels must be from defined set
- Required fields: email, hardware_specs, operating_system

## Chapter Content Entity

**Description**: Stores chapter content with multiple versions for personalization

**Fields**:
- `id`: string (UUID) - Primary identifier
- `title`: string - Chapter title
- `slug`: string (unique) - URL-friendly identifier
- `part_number`: integer - Part number in the book (1-5)
- `chapter_number`: integer - Chapter number within part
- `content_versions`: object - Content variations by difficulty
  - `beginner`: string - Beginner-level content
  - `intermediate`: string - Intermediate-level content
  - `expert`: string - Expert-level content
- `hardware_adaptations`: object - Content variations by hardware
  - `rtx_4070_ti`: string - Content for RTX 4070 Ti
  - `rtx_4080`: string - Content for RTX 4080
  - `rtx_4090`: string - Content for RTX 4090
  - `jetson_orin`: string - Content for Jetson platforms
- `ai_subagent_integration`: array - Subagent IDs relevant to this chapter
- `prerequisites`: array - Required knowledge topics
- `learning_objectives`: array - Learning objectives for the chapter
- `estimated_duration`: integer - Estimated reading time in minutes
- `tags`: array - Content tags for search and organization
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp

**Validation Rules**:
- Slug must be unique
- Part and chapter numbers must form unique combination
- Content versions must be properly structured
- Required fields: title, slug, part_number, chapter_number

## AI Interaction Entity

**Description**: Tracks AI interactions for analytics and improvement

**Fields**:
- `id`: string (UUID) - Primary identifier
- `user_id`: string (foreign key) - Reference to user profile
- `chapter_id`: string (foreign key) - Reference to chapter content
- `interaction_type`: string - "chatbot", "translation", "personalization"
- `input_content`: string - User input or query
- `output_content`: string - AI-generated response
- `timestamp`: datetime - Interaction timestamp
- `feedback_rating`: integer (optional) - User rating (1-5)
- `feedback_comment`: string (optional) - User feedback comment
- `session_id`: string - Session identifier for interaction grouping

**Validation Rules**:
- User and chapter IDs must reference valid entities
- Interaction type must be from defined set
- Required fields: user_id, chapter_id, interaction_type, input_content

## Subagent Entity

**Description**: Defines available AI subagents for specialized assistance

**Fields**:
- `id`: string (UUID) - Primary identifier
- `name`: string - Display name for the subagent
- `type`: string - Subagent type (e.g., "ros2-coding", "gazebo-builder")
- `description`: string - Brief description of capabilities
- `skills`: array - Skills used by this subagent
- `input_schema`: object - Expected input format
- `output_schema`: object - Expected output format
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp

**Validation Rules**:
- Name and type must be unique
- Required fields: name, type, description, skills

## Chapter-Subagent Mapping Entity

**Description**: Links subagents to relevant chapters

**Fields**:
- `id`: string (UUID) - Primary identifier
- `chapter_id`: string (foreign key) - Reference to chapter
- `subagent_id`: string (foreign key) - Reference to subagent
- `context_prompt`: string - Context-specific prompt for the subagent
- `enabled`: boolean - Whether the subagent is active for this chapter
- `created_at`: datetime - Creation timestamp

**Validation Rules**:
- Chapter and subagent IDs must reference valid entities
- Combination of chapter_id and subagent_id must be unique
- Required fields: chapter_id, subagent_id, context_prompt

## Translation Cache Entity

**Description**: Caches translated content to improve performance

**Fields**:
- `id`: string (UUID) - Primary identifier
- `original_content_hash`: string - Hash of original content
- `target_language`: string - Target language code (e.g., "ur")
- `original_content`: string - Original content
- `translated_content`: string - Translated content
- `translation_metadata`: object - Additional translation info
- `created_at`: datetime - Creation timestamp
- `expires_at`: datetime - Cache expiration timestamp

**Validation Rules**:
- Content hash and language combination must be unique
- Required fields: original_content_hash, target_language, original_content

## Relationships

- User Profile (1) → (M) AI Interaction
- Chapter Content (1) → (M) AI Interaction
- Chapter Content (1) → (M) Chapter-Subagent Mapping
- Subagent (1) → (M) Chapter-Subagent Mapping
- Chapter Content (1) → (M) Translation Cache (via content hash)

## State Transitions

**User Profile**:
- Account creation: New user registers → Profile created with default settings
- Profile update: User modifies preferences → Profile updated with new preferences
- Account deletion: User requests deletion → Profile anonymized or deleted

**Chapter Content**:
- Draft creation: Author creates new chapter → Content in draft state
- Review process: Content reviewed → Content in review state
- Publication: Content approved → Content published and available
- Updates: Content modified → Content updated with version tracking