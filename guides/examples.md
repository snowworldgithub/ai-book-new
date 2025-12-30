# Examples Guide

Practical examples and use cases for the Speckit + Docusaurus documentation system in the AI-Native Physical AI & Humanoid Robotics textbook project.

## Example 1: Documenting a Robot Control Component

### Creating a React Component with Documentation

Let's create a React component for robot control and document it properly for Speckit generation:

**File: `src/components/RobotController.jsx`**

```jsx
import React, { useState, useEffect } from 'react';

/**
 * RobotController Component
 * Provides an interactive interface for controlling robot movement and monitoring status
 *
 * This component allows users to command a robot to move to specific positions,
 * monitor its current status, and visualize its position in real-time.
 *
 * @component
 * @example
 * // Basic usage
 * return (
 *   <RobotController
 *     robotId="unitree-g1"
 *     onPositionChange={handlePositionChange}
 *     showTelemetry={true}
 *   />
 * )
 *
 * @example
 * // Advanced usage with custom configuration
 * return (
 *   <RobotController
 *     robotId="unitree-g1"
 *     config={{
 *       maxSpeed: 1.0,
 *       safetyMargin: 0.5,
 *       coordinateSystem: 'world'
 *     }}
 *   />
 * )
 *
 * @param {string} robotId - Unique identifier for the target robot
 * @param {Function} [onPositionChange] - Callback function when robot position changes
 * @param {boolean} [showTelemetry=true] - Whether to display telemetry data
 * @param {Object} [config] - Configuration options for the controller
 * @param {number} [config.maxSpeed=0.5] - Maximum movement speed (0.0 to 1.0)
 * @param {number} [config.safetyMargin=0.3] - Safety margin for obstacle avoidance
 * @param {string} [config.coordinateSystem='world'] - Coordinate system ('world' or 'robot')
 * @param {string} [className] - Additional CSS classes to apply
 * @returns {JSX.Element} Robot controller UI component
 *
 * @author Robotics Team
 * @since 1.0.0
 * @version 1.1.0
 */
export function RobotController({
  robotId,
  onPositionChange,
  showTelemetry = true,
  config = {},
  className = ''
}) {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [status, setStatus] = useState('idle');
  const [isMoving, setIsMoving] = useState(false);

  const defaultConfig = {
    maxSpeed: 0.5,
    safetyMargin: 0.3,
    coordinateSystem: 'world',
    ...config
  };

  /**
   * Move the robot to a target position
   * @async
   * @function moveTo
   * @param {Object} target - Target position coordinates
   * @param {number} target.x - Target X coordinate in meters
   * @param {number} target.y - Target Y coordinate in meters
   * @param {number} [target.z=0] - Target Z coordinate in meters
   * @returns {Promise<boolean>} True if movement started successfully
   * @throws {Error} If target position is invalid or robot is unavailable
   *
   * @example
   * const success = await moveTo({ x: 1.5, y: 2.0, z: 0.1 });
   * if (success) {
   *   console.log('Movement command sent successfully');
   * }
   */
  const moveTo = async (target) => {
    // Validate target position
    if (typeof target.x !== 'number' || typeof target.y !== 'number') {
      throw new Error('Target position must include x and y coordinates');
    }

    try {
      setIsMoving(true);
      setStatus('moving');

      // Simulate API call to robot control service
      const response = await fetch(`/api/robot/${robotId}/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target,
          speed: defaultConfig.maxSpeed,
          safetyMargin: defaultConfig.safetyMargin
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send movement command');
      }

      const result = await response.json();

      // Update local state
      setPosition(target);
      if (onPositionChange) {
        onPositionChange(target, result.taskId);
      }

      return true;
    } catch (error) {
      console.error('Movement error:', error);
      setStatus('error');
      throw error;
    } finally {
      setIsMoving(false);
    }
  };

  /**
   * Stop the robot immediately
   * @async
   * @function stop
   * @returns {Promise<boolean>} True if stop command was successful
   *
   * @example
   * const success = await stop();
   * if (success) {
   *   console.log('Robot stopped successfully');
   * }
   */
  const stop = async () => {
    try {
      const response = await fetch(`/api/robot/${robotId}/stop`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to send stop command');
      }

      setStatus('idle');
      setIsMoving(false);
      return true;
    } catch (error) {
      console.error('Stop error:', error);
      throw error;
    }
  };

  return (
    <div className={`robot-controller ${className}`}>
      <div className="robot-status">
        <h3>Robot: {robotId}</h3>
        <div className="status-indicator">
          <span className={`status ${status}`}>●</span>
          <span className="status-text">{status}</span>
        </div>
      </div>

      {showTelemetry && (
        <div className="telemetry-data">
          <h4>Current Position</h4>
          <div className="coordinates">
            <span>X: {position.x.toFixed(2)}m</span>
            <span>Y: {position.y.toFixed(2)}m</span>
            <span>Z: {position.z.toFixed(2)}m</span>
          </div>
        </div>
      )}

      <div className="control-panel">
        <button
          onClick={() => moveTo({ x: position.x + 0.5, y: position.y })}
          disabled={isMoving}
        >
          Move +X
        </button>
        <button
          onClick={() => moveTo({ x: position.x - 0.5, y: position.y })}
          disabled={isMoving}
        >
          Move -X
        </button>
        <button
          onClick={() => moveTo({ x: position.x, y: position.y + 0.5 })}
          disabled={isMoving}
        >
          Move +Y
        </button>
        <button
          onClick={() => moveTo({ x: position.x, y: position.y - 0.5 })}
          disabled={isMoving}
        >
          Move -Y
        </button>
        <button
          onClick={stop}
          disabled={!isMoving}
          className="stop-button"
        >
          STOP
        </button>
      </div>
    </div>
  );
}

export default RobotController;
```

When this component is processed by Speckit, it will generate comprehensive documentation including:

- Component description and purpose
- Props with types, defaults, and descriptions
- Available methods with parameters and return values
- Usage examples
- Version and author information

## Example 2: Documenting an API Endpoint

### Creating a Well-Documented API Route

**File: `backend/api/robot-control.js` (FastAPI example)**

```python
from fastapi import APIRouter, HTTPException, Path, Query
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

router = APIRouter(prefix="/robot", tags=["robot-control"])

# Request/Response Models
class Position(BaseModel):
    """
    Position coordinates for robot movement

    This model defines the 3D position coordinates for robot movement commands.
    All coordinates are in meters relative to the world coordinate system.
    """
    x: float = Field(..., description="X coordinate in meters", ge=-10.0, le=10.0)
    y: float = Field(..., description="Y coordinate in meters", ge=-10.0, le=10.0)
    z: float = Field(0.0, description="Z coordinate in meters", ge=-5.0, le=5.0)

class MovementCommand(BaseModel):
    """
    Movement command for robot navigation

    This model contains all parameters needed to command a robot to move
    to a specific position with certain constraints.
    """
    target: Position = Field(..., description="Target position for the robot")
    speed: float = Field(0.5, description="Movement speed (0.0 to 1.0)", ge=0.0, le=1.0)
    safety_margin: float = Field(0.3, description="Safety margin in meters", ge=0.0, le=2.0)
    frame: str = Field("world", description="Coordinate frame (world or robot)")

class MovementResponse(BaseModel):
    """
    Response model for movement commands

    Contains information about the movement task including status and estimated completion time.
    """
    success: bool = Field(..., description="Whether the command was accepted")
    task_id: str = Field(..., description="Unique identifier for the movement task")
    estimated_completion: datetime = Field(..., description="Estimated completion time")
    message: Optional[str] = Field(None, description="Additional information")

class RobotStatus(BaseModel):
    """
    Current status of a robot

    Provides comprehensive information about a robot's current state,
    position, and operational status.
    """
    robot_id: str = Field(..., description="Unique identifier for the robot")
    position: Position = Field(..., description="Current position of the robot")
    status: str = Field(..., description="Current operational status",
                      example=["idle", "moving", "charging", "error"])
    battery_level: float = Field(..., description="Battery level as percentage", ge=0.0, le=1.0)
    last_updated: datetime = Field(..., description="Last status update time")

@router.post("/{robot_id}/move",
             response_model=MovementResponse,
             summary="Command robot to move",
             description="""
             Sends a movement command to the specified robot. The robot will navigate
             to the target position using its navigation stack.

             This endpoint implements safety checks and validation to prevent
             dangerous movements or collisions.
             """,
             responses={
                 200: {"description": "Movement command accepted"},
                 400: {"description": "Invalid parameters or unsafe movement"},
                 404: {"description": "Robot not found"},
                 503: {"description": "Robot unavailable"}
             })
async def move_robot(
    robot_id: str = Path(...,
                        description="Unique identifier for the target robot",
                        example="unitree-g1"),
    command: MovementCommand = None,
    validate_only: bool = Query(False,
                               description="Validate command without executing movement")
):
    """
    Command a robot to move to a specific position.

    This endpoint accepts movement commands and validates them against
    safety constraints before executing. It returns a task ID that can
    be used to track the movement progress.

    Args:
        robot_id (str): Unique identifier for the target robot
        command (MovementCommand): Movement parameters including target position and speed
        validate_only (bool): If true, only validate the command without executing it

    Returns:
        MovementResponse: Information about the movement task

    Raises:
        HTTPException: 400 if command is invalid, 404 if robot not found, 503 if robot unavailable

    Example:
        POST /robot/unitree-g1/move
        {
            "target": {"x": 1.5, "y": 2.0, "z": 0.0},
            "speed": 0.7,
            "safety_margin": 0.5
        }
    """
    # Validate robot exists
    if not robot_exists(robot_id):
        raise HTTPException(status_code=404, detail=f"Robot {robot_id} not found")

    # Validate movement parameters
    if not is_safe_movement(command.target, command.safety_margin):
        raise HTTPException(status_code=400, detail="Movement would be unsafe")

    if validate_only:
        return MovementResponse(
            success=True,
            task_id="",
            estimated_completion=datetime.now(),
            message="Command validated successfully"
        )

    # Execute movement
    task_id = schedule_movement(robot_id, command)
    estimated_completion = estimate_completion_time(command)

    return MovementResponse(
        success=True,
        task_id=task_id,
        estimated_completion=estimated_completion
    )

@router.get("/{robot_id}/status",
            response_model=RobotStatus,
            summary="Get robot status",
            description="Retrieve current status information for the specified robot.")
async def get_robot_status(robot_id: str = Path(..., description="Unique identifier for the robot")):
    """
    Get the current status of a robot.

    Returns comprehensive information about the robot's current state
    including position, operational status, and battery level.

    Args:
        robot_id (str): Unique identifier for the target robot

    Returns:
        RobotStatus: Current status information for the robot

    Raises:
        HTTPException: 404 if robot not found
    """
    robot = get_robot(robot_id)
    if not robot:
        raise HTTPException(status_code=404, detail=f"Robot {robot_id} not found")

    return RobotStatus(
        robot_id=robot_id,
        position=robot.position,
        status=robot.status,
        battery_level=robot.battery_level,
        last_updated=robot.last_updated
    )
```

## Example 3: Documenting a Complex Algorithm

### Kinematics Algorithm with Comprehensive Documentation

**File: `src/algorithms/kinematics.js`**

```javascript
/**
 * @fileoverview Kinematics algorithms for robotic systems
 *
 * This module provides implementations of forward and inverse kinematics
 * algorithms for various robotic configurations. It includes support for
 * both serial and parallel manipulators.
 *
 * @module kinematics
 * @requires mathjs - Mathematical operations library
 * @requires tf2 - Transform operations library
 */

import { matrix, multiply, inv, transpose, det, zeros } from 'mathjs';
import { Transform, Vector3, Quaternion } from './math/transforms';

/**
 * Forward Kinematics Calculator
 *
 * Calculates the end-effector position and orientation based on joint angles.
 * Supports various robot configurations including articulated, SCARA, and delta robots.
 *
 * @class ForwardKinematics
 * @example
 * // Create calculator for 6-DOF robot arm
 * const fk = new ForwardKinematics(robotConfig);
 *
 * // Calculate end-effector pose
 * const pose = fk.calculate([0, Math.PI/2, 0, 0, Math.PI/4, 0]);
 * console.log(pose.position); // { x: 0.5, y: 0, z: 0.3 }
 *
 * @param {Object} config - Robot configuration
 * @param {Array<Object>} config.dhParameters - Denavit-Hartenberg parameters
 * @param {Array<number>} config.linkLengths - Link lengths in meters
 * @param {Array<string>} config.jointTypes - Joint types ('revolute' or 'prismatic')
 */
export class ForwardKinematics {
  constructor(config) {
    this.dhParameters = config.dhParameters;
    this.linkLengths = config.linkLengths;
    this.jointTypes = config.jointTypes;
    this.numJoints = config.dhParameters.length;

    if (this.numJoints !== this.linkLengths.length ||
        this.numJoints !== this.jointTypes.length) {
      throw new Error('Configuration arrays must have the same length');
    }
  }

  /**
   * Calculate end-effector pose from joint angles
   *
   * This method implements the standard forward kinematics algorithm using
   * homogeneous transformation matrices. For each joint, it calculates
   * the transformation matrix and multiplies them together to get the
   * final end-effector pose.
   *
   * @param {Array<number>} jointAngles - Joint angles in radians
   * @returns {Object} End-effector pose with position and orientation
   * @returns {Object} return.position - Position as {x, y, z}
   * @returns {Object} return.orientation - Orientation as {x, y, z, w} quaternion
   * @returns {Array<Array<number>>} return.transformationMatrix - 4x4 transformation matrix
   *
   * @example
   * const pose = fk.calculate([0, Math.PI/2, 0, 0, Math.PI/4, 0]);
   * console.log(pose.position.x); // End-effector X position
   *
   * @throws {Error} If joint angles array length doesn't match robot configuration
   * @throws {Error} If any joint angle is not a valid number
   */
  calculate(jointAngles) {
    if (!Array.isArray(jointAngles) || jointAngles.length !== this.numJoints) {
      throw new Error(`Expected ${this.numJoints} joint angles, got ${jointAngles?.length || 'none'}`);
    }

    if (jointAngles.some(angle => typeof angle !== 'number' || isNaN(angle))) {
      throw new Error('All joint angles must be valid numbers');
    }

    // Start with identity transformation
    let cumulativeTransform = matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]);

    // Calculate transformation for each joint
    for (let i = 0; i < this.numJoints; i++) {
      const dh = this.dhParameters[i];
      const jointAngle = jointAngles[i];

      // Calculate joint transformation matrix based on DH parameters
      const jointTransform = this.calculateJointTransform(dh, jointAngle);

      // Combine with previous transformations
      cumulativeTransform = multiply(cumulativeTransform, jointTransform);
    }

    // Extract position and orientation from final transformation matrix
    const position = this.extractPosition(cumulativeTransform);
    const orientation = this.extractOrientation(cumulativeTransform);

    return {
      position,
      orientation,
      transformationMatrix: cumulativeTransform.toArray()
    };
  }

  /**
   * Calculate individual joint transformation matrix
   *
   * Computes the 4x4 homogeneous transformation matrix for a single joint
   * using the Denavit-Hartenberg parameters and joint angle.
   *
   * @private
   * @param {Object} dh - Denavit-Hartenberg parameters for the joint
   * @param {number} dh.a - Link length (X translation)
   * @param {number} dh.alpha - Link twist (X rotation)
   * @param {number} dh.d - Link offset (Z translation)
   * @param {number} dh.theta - Joint angle (Z rotation)
   * @param {number} jointAngle - Current joint angle in radians
   * @returns {Matrix} 4x4 homogeneous transformation matrix
   *
   * @example
   * const dh = { a: 0.1, alpha: Math.PI/2, d: 0, theta: 0 };
   * const transform = calculateJointTransform(dh, Math.PI/4);
   */
  calculateJointTransform(dh, jointAngle) {
    const cosTheta = Math.cos(dh.theta + jointAngle);
    const sinTheta = Math.sin(dh.theta + jointAngle);
    const cosAlpha = Math.cos(dh.alpha);
    const sinAlpha = Math.sin(dh.alpha);

    return matrix([
      [cosTheta, -sinTheta * cosAlpha, sinTheta * sinAlpha, dh.a * cosTheta],
      [sinTheta, cosTheta * cosAlpha, -cosTheta * sinAlpha, dh.a * sinTheta],
      [0, sinAlpha, cosAlpha, dh.d],
      [0, 0, 0, 1]
    ]);
  }

  /**
   * Extract position from transformation matrix
   *
   * @private
   * @param {Matrix} transform - 4x4 homogeneous transformation matrix
   * @returns {Object} Position as {x, y, z} coordinates
   */
  extractPosition(transform) {
    const arr = transform.toArray();
    return {
      x: arr[0][3],
      y: arr[1][3],
      z: arr[2][3]
    };
  }

  /**
   * Extract orientation from transformation matrix
   *
   * Converts the rotation matrix portion of the transformation matrix
   * to a quaternion representation.
   *
   * @private
   * @param {Matrix} transform - 4x4 homogeneous transformation matrix
   * @returns {Object} Orientation as {x, y, z, w} quaternion
   */
  extractOrientation(transform) {
    const arr = transform.toArray();
    const rotationMatrix = [
      [arr[0][0], arr[0][1], arr[0][2]],
      [arr[1][0], arr[1][1], arr[1][2]],
      [arr[2][0], arr[2][1], arr[2][2]]
    ];

    // Convert rotation matrix to quaternion
    return this.rotationMatrixToQuaternion(rotationMatrix);
  }

  /**
   * Convert rotation matrix to quaternion
   *
   * Uses the standard algorithm to convert a 3x3 rotation matrix to
   * a unit quaternion representation.
   *
   * @private
   * @param {Array<Array<number>>} rotMat - 3x3 rotation matrix
   * @returns {Object} Quaternion as {x, y, z, w}
   */
  rotationMatrixToQuaternion(rotMat) {
    const trace = rotMat[0][0] + rotMat[1][1] + rotMat[2][2];

    let w, x, y, z;

    if (trace > 0) {
      const s = Math.sqrt(trace + 1.0) * 2; // S=4*w
      w = 0.25 * s;
      x = (rotMat[2][1] - rotMat[1][2]) / s;
      y = (rotMat[0][2] - rotMat[2][0]) / s;
      z = (rotMat[1][0] - rotMat[0][1]) / s;
    } else if ((rotMat[0][0] > rotMat[1][1]) && (rotMat[0][0] > rotMat[2][2])) {
      const s = Math.sqrt(1.0 + rotMat[0][0] - rotMat[1][1] - rotMat[2][2]) * 2; // S=4*x
      w = (rotMat[2][1] - rotMat[1][2]) / s;
      x = 0.25 * s;
      y = (rotMat[0][1] + rotMat[1][0]) / s;
      z = (rotMat[0][2] + rotMat[2][0]) / s;
    } else if (rotMat[1][1] > rotMat[2][2]) {
      const s = Math.sqrt(1.0 + rotMat[1][1] - rotMat[0][0] - rotMat[2][2]) * 2; // S=4*y
      w = (rotMat[0][2] - rotMat[2][0]) / s;
      x = (rotMat[0][1] + rotMat[1][0]) / s;
      y = 0.25 * s;
      z = (rotMat[1][2] + rotMat[2][1]) / s;
    } else {
      const s = Math.sqrt(1.0 + rotMat[2][2] - rotMat[0][0] - rotMat[1][1]) * 2; // S=4*z
      w = (rotMat[1][0] - rotMat[0][1]) / s;
      x = (rotMat[0][2] + rotMat[2][0]) / s;
      y = (rotMat[1][2] + rotMat[2][1]) / s;
      z = 0.25 * s;
    }

    return { x, y, z, w };
  }
}

/**
 * Calculate Jacobian matrix for a robot configuration
 *
 * The Jacobian matrix relates joint velocities to end-effector velocities.
 * It's essential for motion control, trajectory planning, and singularity analysis.
 *
 * @function calculateJacobian
 * @param {ForwardKinematics} fkCalculator - Forward kinematics calculator
 * @param {Array<number>} jointAngles - Current joint angles
 * @param {number} [epsilon=1e-6] - Small value for numerical differentiation
 * @returns {Array<Array<number>>} 6xN Jacobian matrix (N = number of joints)
 *
 * @example
 * const jacobian = calculateJacobian(fk, [0, Math.PI/4, 0, 0, 0, 0]);
 * console.log(jacobian[0]); // First row: linear velocity w.r.t. joint 1
 *
 * @throws {Error} If joint angles don't match calculator configuration
 */
export function calculateJacobian(fkCalculator, jointAngles, epsilon = 1e-6) {
  if (jointAngles.length !== fkCalculator.numJoints) {
    throw new Error(`Joint angles length (${jointAngles.length}) doesn't match robot DOF (${fkCalculator.numJoints})`);
  }

  const numJoints = jointAngles.length;
  const jacobian = Array(6).fill().map(() => Array(numJoints).fill(0));

  // Calculate base pose
  const basePose = fkCalculator.calculate(jointAngles);

  // For each joint, calculate the effect of small changes
  for (let j = 0; j < numJoints; j++) {
    // Create perturbed joint angles
    const perturbedAngles = [...jointAngles];
    perturbedAngles[j] += epsilon;

    // Calculate perturbed pose
    const perturbedPose = fkCalculator.calculate(perturbedAngles);

    // Calculate velocity (change in pose over change in joint angle)
    const dx = (perturbedPose.position.x - basePose.position.x) / epsilon;
    const dy = (perturbedPose.position.y - basePose.position.y) / epsilon;
    const dz = (perturbedPose.position.z - basePose.position.z) / epsilon;

    // Calculate angular velocity using quaternion difference
    const angular = calculateAngularVelocity(
      basePose.orientation,
      perturbedPose.orientation,
      epsilon
    );

    // Fill Jacobian columns
    jacobian[0][j] = dx; // X linear velocity
    jacobian[1][j] = dy; // Y linear velocity
    jacobian[2][j] = dz; // Z linear velocity
    jacobian[3][j] = angular.x; // X angular velocity
    jacobian[4][j] = angular.y; // Y angular velocity
    jacobian[5][j] = angular.z; // Z angular velocity
  }

  return jacobian;
}

/**
 * Calculate angular velocity from quaternion difference
 *
 * @private
 * @param {Object} q1 - First quaternion
 * @param {Object} q2 - Second quaternion
 * @param {number} dt - Time difference
 * @returns {Object} Angular velocity vector {x, y, z}
 */
function calculateAngularVelocity(q1, q2, dt) {
  // Convert quaternion difference to angular velocity
  // This is a simplified calculation - in practice, you'd use more sophisticated methods
  const dq = {
    x: q2.x - q1.x,
    y: q2.y - q1.y,
    z: q2.z - q1.z,
    w: q2.w - q1.w
  };

  // Normalize and convert to angular velocity
  const norm = Math.sqrt(dq.x * dq.x + dq.y * dq.y + dq.z * dq.z + dq.w * dq.w);
  if (norm < 1e-10) return { x: 0, y: 0, z: 0 };

  return {
    x: 2 * dq.x / dt,
    y: 2 * dq.y / dt,
    z: 2 * dq.z / dt
  };
}
```

## Example 4: Creating Interactive Documentation

### Component Playground Example

Create an interactive example using React Live:

**File: `docs/robot-controller-playground.md`**

```mdx
---
title: Robot Controller Playground
description: Interactive example of the Robot Controller component
---

import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { RobotController } from '../src/components/RobotController';

# Robot Controller Playground

Experiment with the Robot Controller component in this interactive playground.

## Basic Example

<LiveProvider code={`<RobotController robotId="test-robot" />`} scope={{ RobotController }}>
  <LivePreview />
  <LiveError />
</LiveProvider>

## Advanced Example

<LiveProvider code={`function App() {
  const [position, setPosition] = React.useState({ x: 0, y: 0, z: 0 });

  return (
    <div>
      <RobotController
        robotId="advanced-robot"
        onPositionChange={(pos) => setPosition(pos)}
        config={{ maxSpeed: 0.7 }}
      />
      <div style={{ marginTop: '20px' }}>
        <h4>Current Position:</h4>
        <p>X: {position.x.toFixed(2)} Y: {position.y.toFixed(2)} Z: {position.z.toFixed(2)}</p>
      </div>
    </div>
  );
}`} scope={{ RobotController }}>
  <LivePreview />
  <LiveEditor style={{
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '10px'
  }} />
  <LiveError style={{
    color: 'red',
    padding: '10px',
    backgroundColor: '#ffe6e6',
    borderRadius: '4px',
    marginTop: '10px'
  }} />
</LiveProvider>
```

## Example 5: API Documentation with OpenAPI

### Creating OpenAPI Specification

**File: `api/robot-control-openapi.yaml`**

```yaml
openapi: 3.0.0
info:
  title: Robot Control API
  description: API for controlling robots in the Physical AI & Humanoid Robotics system
  version: 1.0.0
  contact:
    name: Robotics API Support
    email: api-support@robotics-project.org
  license:
    name: MIT
    url: http://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
servers:
  - url: https://api.robotics-project.org/v1
    description: Production server
  - url: https://staging-api.robotics-project.org/v1
    description: Staging server
paths:
  /robot/{robotId}/move:
    post:
      summary: Command robot to move to position
      description: |
        Sends a movement command to the specified robot. The robot will
        navigate to the target position using its navigation stack.

        This endpoint implements safety checks and validation to prevent
        dangerous movements or collisions.
      operationId: moveRobot
      tags:
        - Robot Control
      parameters:
        - name: robotId
          in: path
          required: true
          description: Unique identifier for the target robot
          schema:
            type: string
            example: "unitree-g1"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MovementCommand'
            examples:
              simpleMove:
                summary: Simple movement command
                value:
                  target:
                    x: 1.5
                    y: 2.0
                    z: 0.0
                  speed: 0.5
              complexMove:
                summary: Complex movement with safety
                value:
                  target:
                    x: 3.0
                    y: 1.5
                    z: 0.2
                  speed: 0.7
                  safety_margin: 0.5
      responses:
        '200':
          description: Movement command accepted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MovementResponse'
          links:
            getStatus:
              operationId: getRobotStatus
              parameters:
                robotId: '$response.body#/robotId'
        '400':
          $ref: '#/components/responses/BadRequest'
        '404':
          $ref: '#/components/responses/NotFound'
        '503':
          $ref: '#/components/responses/ServiceUnavailable'
  /robot/{robotId}/status:
    get:
      summary: Get robot status
      description: Retrieve current status information for the specified robot
      operationId: getRobotStatus
      tags:
        - Robot Status
      parameters:
        - name: robotId
          in: path
          required: true
          description: Unique identifier for the robot
          schema:
            type: string
            example: "unitree-g1"
      responses:
        '200':
          description: Current robot status
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RobotStatus'
        '404':
          $ref: '#/components/responses/NotFound'
components:
  schemas:
    Position:
      type: object
      required:
        - x
        - y
      properties:
        x:
          type: number
          description: X coordinate in meters
          example: 1.5
          minimum: -10.0
          maximum: 10.0
        y:
          type: number
          description: Y coordinate in meters
          example: 2.0
          minimum: -10.0
          maximum: 10.0
        z:
          type: number
          description: Z coordinate in meters
          example: 0.0
          minimum: -5.0
          maximum: 5.0
    MovementCommand:
      type: object
      required:
        - target
      properties:
        target:
          $ref: '#/components/schemas/Position'
        speed:
          type: number
          description: Movement speed (0.0 to 1.0)
          default: 0.5
          minimum: 0.0
          maximum: 1.0
          example: 0.7
        safety_margin:
          type: number
          description: Safety margin in meters
          default: 0.3
          minimum: 0.0
          maximum: 2.0
          example: 0.5
        frame:
          type: string
          description: Coordinate frame
          default: "world"
          enum: [world, robot]
    MovementResponse:
      type: object
      required:
        - success
        - task_id
        - estimated_completion
      properties:
        success:
          type: boolean
          description: Whether the command was accepted
          example: true
        task_id:
          type: string
          description: Unique identifier for the movement task
          example: "move-task-12345"
        estimated_completion:
          type: string
          format: date-time
          description: Estimated completion time
          example: "2023-12-01T10:30:00Z"
        message:
          type: string
          description: Additional information
          example: "Movement command scheduled successfully"
    RobotStatus:
      type: object
      required:
        - robot_id
        - position
        - status
        - battery_level
        - last_updated
      properties:
        robot_id:
          type: string
          description: Unique identifier for the robot
          example: "unitree-g1"
        position:
          $ref: '#/components/schemas/Position'
        status:
          type: string
          description: Current operational status
          enum: [idle, moving, charging, error, offline]
          example: "idle"
        battery_level:
          type: number
          description: Battery level as percentage
          minimum: 0.0
          maximum: 1.0
          example: 0.85
        last_updated:
          type: string
          format: date-time
          description: Last status update time
          example: "2023-12-01T10:25:30Z"
  responses:
    BadRequest:
      description: Invalid parameters or unsafe movement
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: "VALIDATION_ERROR"
              message: "Movement would be unsafe: obstacle detected in path"
    NotFound:
      description: Robot not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: "ROBOT_NOT_FOUND"
              message: "Robot with ID 'nonexistent-robot' not found"
    ServiceUnavailable:
      description: Robot unavailable
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
security:
  - BearerAuth: []
```

These examples demonstrate how to create well-documented code that Speckit can automatically process to generate comprehensive documentation. The examples cover different types of documentation needs:

1. **React Components**: Complete component documentation with props, methods, and usage examples
2. **API Endpoints**: Well-documented API routes with request/response schemas
3. **Algorithms**: Complex algorithms with mathematical explanations
4. **Interactive Documentation**: Live examples using React Live
5. **OpenAPI Specifications**: Formal API documentation

When processed by Speckit, these examples will generate rich, structured documentation that integrates seamlessly with the Docusaurus site.