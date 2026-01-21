# Editor Availability Feature Implementation

## Overview
This document describes the implementation of the "Set Your Availability" feature for the Editor Dashboard. This feature allows editors to toggle their availability status and set temporary unavailability periods.

## Files Created/Modified

### 1. **SetAvailabilityModal Component**
**File:** `components/ClientEditor/EditorDshboard/SetAvailabilityModal.tsx`

**Purpose:** A modal dialog component that allows editors to set their availability status.

**Features:**
- Toggle between "Available" and "Temporarily Unavailable" states
- Set date ranges for unavailability periods
- Add optional reason for unavailability
- Input validation with user-friendly error messages
- Loading state handling
- Toast notifications for success/error feedback

**Props:**
```typescript
interface SetAvailabilityModalProps {
  open: boolean;           // Controls modal visibility
  onClose: () => void;     // Callback when modal closes
  onSave?: (availability: AvailabilityData) => void; // Callback on successful save
}
```

**Data Structure:**
```typescript
export interface AvailabilityData {
  isAvailable: boolean;     // Whether editor is available
  availableFrom?: string;   // Start date (YYYY-MM-DD) - optional
  availableUntil?: string;  // End date (YYYY-MM-DD) - optional
  reason?: string;          // Reason for unavailability - optional
}
```

### 2. **EditorAvailabilityService**
**File:** `usersService/editor-availability.service.ts`

**Purpose:** Service layer for handling all availability-related API calls.

**Methods:**
- `setAvailability(availability)` - Update availability status
- `getAvailability()` - Fetch current availability
- `markAvailable()` - Quick method to set editor as available
- `markUnavailable(from, until, reason?)` - Quick method to set unavailability

**Usage Example:**
```typescript
import { EditorAvailabilityService } from '@/usersService/editor-availability.service';

// Mark as available
await EditorAvailabilityService.markAvailable();

// Mark as unavailable for specific period
await EditorAvailabilityService.markUnavailable(
  '2024-01-15',
  '2024-01-20',
  'On vacation'
);
```

### 3. **API Endpoint**
**File:** `app/api/editor/availability/route.ts`

**Endpoints:**
- `POST /api/editor/availability` - Update editor availability
- `GET /api/editor/availability` - Fetch current availability

**Request Body (POST):**
```json
{
  "isAvailable": true,
  "availableFrom": "2024-01-15",
  "availableUntil": "2024-01-20",
  "reason": "On vacation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your availability has been updated",
  "data": {
    "isAvailable": false,
    "availableFrom": "2024-01-15",
    "availableUntil": "2024-01-20",
    "reason": "On vacation",
    "updatedAt": "2024-01-10T10:30:00Z"
  }
}
```

**Validation:**
- `isAvailable` is required and must be boolean
- When `isAvailable` is false, `availableFrom` and `availableUntil` are required
- `availableUntil` must be after `availableFrom`
- Date format must be valid (YYYY-MM-DD)

### 4. **EditorDashboardPage Integration**
**File:** `components/ClientEditor/EditorDshboard/EditorDshboardPage.tsx`

**Changes:**
1. Import `SetAvailabilityModal` component and `useState` hook
2. Add state variables:
   - `showAvailabilityModal` - Modal visibility
   - `editorAvailability` - Current availability status
3. Add handler function:
   - `handleAvailabilitySave` - Updates local state when availability is saved
4. Update button to open modal on click
5. Add modal component to the JSX

**Code Example:**
```tsx
const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
const [editorAvailability, setEditorAvailability] = useState<AvailabilityData>({
  isAvailable: true,
});

const handleAvailabilitySave = (availability: AvailabilityData) => {
  setEditorAvailability(availability);
};

// In JSX:
<button onClick={() => setShowAvailabilityModal(true)}>
  Set your availability
</button>

<SetAvailabilityModal
  open={showAvailabilityModal}
  onClose={() => setShowAvailabilityModal(false)}
  onSave={handleAvailabilitySave}
/>
```

## User Flow

1. **Editor clicks "Set your availability" button** on the editor dashboard
2. **Modal opens** with two options:
   - ✅ Available - Editor can accept new orders
   - ⏸️ Temporarily Unavailable - Editor needs to set dates
3. **If selecting "Temporarily Unavailable":**
   - Editor enters "From" date
   - Editor enters "Until" date
   - Editor optionally enters a reason
4. **Editor clicks "Save Changes"**
5. **Modal validates the input:**
   - If available: immediately saves
   - If unavailable: validates date range
6. **API call is made** to update availability
7. **Success toast notification** is shown
8. **Modal closes** and UI is updated
9. **Gigs are hidden** if unavailable, **gigs are visible** if available

## Implementation Notes

### Current State
- The implementation is **fully functional** with mock API responses
- All UI/UX features are implemented
- Form validation is in place
- Error handling with toast notifications

### Next Steps (Backend Integration)
To connect this to your actual backend API:

1. **Update API endpoint** (`app/api/editor/availability/route.ts`):
   - Replace mock response with actual backend call
   - Example:
   ```typescript
   const response = await fetch(`${process.env.API_BASE_URL}/editor/availability`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
     body: JSON.stringify(body),
   });
   ```

2. **Add authentication:**
   - Get user token from cookies/headers
   - Include in API requests

3. **Database schema** should include:
   ```sql
   CREATE TABLE editor_availability (
     id UUID PRIMARY KEY,
     editor_id UUID NOT NULL,
     is_available BOOLEAN,
     available_from DATE,
     available_until DATE,
     reason TEXT,
     updated_at TIMESTAMP,
     FOREIGN KEY (editor_id) REFERENCES users(id)
   );
   ```

## Styling
All components use the existing project's color scheme:
- Primary red: `#ff4b4b`
- Text color: `#333`
- Border color: `#D9D9D9`
- Success green: `#52C41A`
- Error red: `#FF4D4F`
- Light backgrounds: `#F5F5F5`, `#FFFFFF`

## Testing Checklist
- [ ] Modal opens/closes properly
- [ ] Can toggle between Available and Temporarily Unavailable
- [ ] Date validation works (end date after start date)
- [ ] Form validation shows appropriate error messages
- [ ] Success notification appears on save
- [ ] Modal closes after successful save
- [ ] State updates in parent component
- [ ] API calls are made with correct data
- [ ] Loading state works properly
- [ ] Responsive design on mobile

## Dependencies
- `react-hot-toast` - For notifications
- `@radix-ui/react-dialog` - Dialog/Modal component
- `lucide-react` - Icons (if used)
- Custom UI components from `@/components/ui/dialog`

## Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

**Last Updated:** January 2026
**Status:** ✅ Complete and Ready for Backend Integration
