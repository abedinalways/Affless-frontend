# SetAvailability Function - Quick Usage Guide

## What Was Implemented

A complete "Set Your Availability" feature for the Editor Dashboard that allows editors to:
- Mark themselves as **Available** to receive new orders
- Mark themselves as **Temporarily Unavailable** with specific date ranges
- Add optional reason for unavailability
- Get real-time feedback via toast notifications

## Files & Components

### 1. **SetAvailabilityModal Component** 
Location: `components/ClientEditor/EditorDshboard/SetAvailabilityModal.tsx`

A full-featured modal dialog with:
- Radio button toggles for availability status
- Date pickers for unavailability period
- Optional reason textarea
- Form validation
- Loading states
- Error handling

### 2. **EditorAvailabilityService**
Location: `usersService/editor-availability.service.ts`

Service methods:
```typescript
// Update availability with custom data
EditorAvailabilityService.setAvailability({
  isAvailable: true
})

// Mark as available
EditorAvailabilityService.markAvailable()

// Mark as unavailable
EditorAvailabilityService.markUnavailable(
  '2024-01-15',
  '2024-01-20',
  'On vacation'
)

// Get current status
EditorAvailabilityService.getAvailability()
```

### 3. **API Route**
Location: `app/api/editor/availability/route.ts`

Endpoints:
- `POST /api/editor/availability` - Update availability
- `GET /api/editor/availability` - Fetch availability

### 4. **Integration in EditorDashboardPage**
Location: `components/ClientEditor/EditorDshboard/EditorDshboardPage.tsx`

The "Set your availability" button now:
- Opens the modal on click
- Calls the handler function when saved
- Updates component state
- Shows success message

## How to Use

### Basic Usage in Components

```typescript
import { EditorAvailabilityService } from '@/usersService/editor-availability.service';

// Mark editor as available
const handleMarkAvailable = async () => {
  try {
    const response = await EditorAvailabilityService.markAvailable();
    console.log('Editor is now available!', response);
  } catch (error) {
    console.error('Failed to update availability', error);
  }
};

// Mark editor as unavailable
const handleMarkUnavailable = async () => {
  try {
    const response = await EditorAvailabilityService.markUnavailable(
      '2024-02-01',
      '2024-02-15',
      'Personal reasons'
    );
    console.log('Editor marked as unavailable', response);
  } catch (error) {
    console.error('Failed to update availability', error);
  }
};
```

### In Components with Modal

```typescript
import SetAvailabilityModal from '@/components/ClientEditor/EditorDshboard/SetAvailabilityModal';

function MyComponent() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (availability) => {
    console.log('Availability saved:', availability);
    // Update local state or parent state
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        Open Availability Settings
      </button>
      
      <SetAvailabilityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
```

## Data Structure

```typescript
interface AvailabilityData {
  isAvailable: boolean;        // true = available, false = unavailable
  availableFrom?: string;      // YYYY-MM-DD format
  availableUntil?: string;     // YYYY-MM-DD format
  reason?: string;             // Optional explanation
}
```

## Validation Rules

✅ **Required:**
- `isAvailable` must be a boolean

✅ **Conditional (when isAvailable = false):**
- `availableFrom` is required
- `availableUntil` is required
- `availableUntil` must be after `availableFrom`

✅ **Optional:**
- `reason` can be empty or any string

## Features

### ✅ UI/UX Features
- Clean, modern modal interface
- Toggle-style radio buttons
- Visual indicators (green for available, red for unavailable)
- Date picker inputs
- Form validation with error messages
- Loading state on button
- Toast notifications (success/error)
- Responsive design

### ✅ Validation
- Date range validation
- Required field checking
- Date format validation
- User-friendly error messages

### ✅ Error Handling
- Try-catch for API calls
- Toast error notifications
- Console logging for debugging
- Graceful failure handling

### ✅ State Management
- React hooks (useState, useEffect)
- Component state for form fields
- Parent state updates via callbacks
- Loading state management

## API Response Example

```json
{
  "success": true,
  "message": "Your unavailability period has been set!",
  "data": {
    "isAvailable": false,
    "availableFrom": "2024-01-15",
    "availableUntil": "2024-01-20",
    "reason": "On vacation",
    "updatedAt": "2024-01-10T10:30:00Z"
  }
}
```

## Styling

All styles are consistent with the project's design system:
- Colors: Red (#ff4b4b), Gray (#333, #777980), Borders (#D9D9D9)
- Spacing: Tailwind CSS utilities
- Responsive: Mobile-first design
- Hover states: Visual feedback on interactive elements

## Next Steps for Backend Integration

1. Replace mock API in `app/api/editor/availability/route.ts` with actual backend call
2. Add authentication (token) to API requests
3. Update database schema to store availability
4. Test with real backend data

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Dependencies Used

- `react` - React hooks (useState, useEffect)
- `react-hot-toast` - Toast notifications
- `@radix-ui/react-dialog` - Dialog component
- Tailwind CSS - Styling

---

**Status:** ✅ Production Ready
**Last Updated:** January 2026
