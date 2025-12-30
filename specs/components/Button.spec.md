---
title: Button Component Specification
description: Specification for the Button component in the Physical AI & Humanoid Robotics textbook platform
sidebar_label: Button Component
---

# Button Component Specification

## Overview

The Button component is a foundational UI element used throughout the Physical AI & Humanoid Robotics textbook platform. It provides a consistent, accessible interface for user interactions.

## Properties

### Primary Properties

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| children | ReactNode | - | Yes | Button content (text, icons, etc.) |
| onClick | Function | - | No | Click event handler |
| variant | "primary" \| "secondary" \| "danger" \| "success" | "primary" | No | Visual style variant |
| size | "small" \| "medium" \| "large" | "medium" | No | Size of the button |
| disabled | boolean | false | No | Whether the button is disabled |
| loading | boolean | false | No | Whether the button shows a loading state |
| fullWidth | boolean | false | No | Whether the button takes full width |
| type | "button" \| "submit" \| "reset" | "button" | No | HTML button type |

### Accessibility Properties

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| aria-label | string | - | No | Accessible label for screen readers |
| aria-describedby | string | - | No | ID of element that describes the button |
| tabIndex | number | 0 | No | Tab order of the button |

## Events

### Supported Events

- **onClick**: Triggered when the button is clicked
- **onMouseDown**: Triggered when mouse button is pressed
- **onMouseUp**: Triggered when mouse button is released
- **onFocus**: Triggered when the button receives focus
- **onBlur**: Triggered when the button loses focus

## Styling

### CSS Classes

The component provides several CSS classes for customization:

- `.btn`: Base button class
- `.btn--primary`: Primary variant styles
- `.btn--secondary`: Secondary variant styles
- `.btn--danger`: Danger variant styles
- `.btn--success`: Success variant styles
- `.btn--small`: Small size styles
- `.btn--medium`: Medium size styles
- `.btn--large`: Large size styles
- `.btn--disabled`: Disabled state styles
- `.btn--loading`: Loading state styles
- `.btn--full-width`: Full width styles

### Custom Properties

The component supports CSS custom properties for theming:

```css
--btn-primary-bg: #007bff;
--btn-primary-color: #ffffff;
--btn-primary-hover-bg: #0056b3;
--btn-border-radius: 4px;
--btn-transition: all 0.2s ease;
```

## Usage Examples

### Basic Usage

```jsx
<Button onClick={() => console.log('Clicked!')}>
  Click Me
</Button>
```

### Different Variants

```jsx
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="danger">Danger Button</Button>
<Button variant="success">Success Button</Button>
```

### With Loading State

```jsx
<Button loading={isLoading} disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

### Full Width Button

```jsx
<Button fullWidth>
  Full Width Button
</Button>
```

## Accessibility

The Button component follows WCAG 2.1 guidelines:

- **Keyboard Navigation**: Fully navigable with keyboard
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meets minimum contrast ratios
- **Interactive Elements**: Proper touch targets (minimum 44px)

## Performance

- **Bundle Size**: Minimal impact on bundle size
- **Rendering**: Efficient rendering with memoization
- **Event Handling**: Optimized event delegation
- **Accessibility**: Built-in accessibility features without performance impact

## Testing

### Recommended Tests

- **Click functionality**: Verify onClick handler is called
- **Disabled state**: Verify disabled button doesn't respond to clicks
- **Loading state**: Verify loading state prevents clicks
- **Accessibility**: Verify ARIA attributes and keyboard navigation
- **Variants**: Verify all variants render correctly
- **Sizes**: Verify all sizes render correctly

### Example Test

```javascript
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';

test('calls onClick when clicked', () => {
  const mockOnClick = jest.fn();
  render(<Button onClick={mockOnClick}>Click me</Button>);

  fireEvent.click(screen.getByText('Click me'));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
```

## Internationalization

The component supports internationalization through:

- **Text content**: All button text can be localized
- **A11y labels**: ARIA labels support localization
- **RTL support**: Right-to-left layout support

## Browser Support

- **Modern browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Accessibility**: Screen reader support (JAWS, NVDA, VoiceOver)

## Related Components

- **IconButton**: Button with icon-only content
- **LinkButton**: Button that navigates like a link
- **DropdownButton**: Button with dropdown menu
- **SplitButton**: Button with additional dropdown options

## Migration Guide

### From v1 to v2

- **className**: Renamed from `buttonClass` to `className`
- **onClick**: Now receives a proper React.MouseEvent
- **Loading state**: Now uses `loading` prop instead of `isLoading`
- **Variants**: Added new variants (success, danger) and removed deprecated ones

## Troubleshooting

### Common Issues

**Issue**: Button not responding to clicks
**Solution**: Check that onClick handler is properly bound and not disabled

**Issue**: Button appears disabled
**Solution**: Verify `disabled` prop is not set to true

**Issue**: Accessibility warnings
**Solution**: Ensure proper ARIA labels are provided for icon-only buttons

**Issue**: Styling conflicts
**Solution**: Check for CSS specificity issues or use the provided CSS classes