# SetAvailability Feature - Technical Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                               │
│  EditorDashboardPage - "Set your availability" Button               │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   │ onClick()
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    MODAL COMPONENT LAYER                            │
│  SetAvailabilityModal.tsx                                           │
│  ├── State Management                                               │
│  │   ├── isAvailable: boolean                                       │
│  │   ├── availableFrom: string                                      │
│  │   ├── availableUntil: string                                     │
│  │   ├── reason: string                                             │
│  │   └── loading: boolean                                           │
│  │                                                                   │
│  ├── UI Components                                                  │
│  │   ├── Radio Toggle (Available/Unavailable)                       │
│  │   ├── Date Pickers                                               │
│  │   ├── Text Area (Reason)                                         │
│  │   └── Action Buttons                                             │
│  │                                                                   │
│  └── Event Handlers                                                 │
│      ├── handleSave() - Validates & submits                         │
│      ├── useEffect() - Form reset on modal open                     │
│      └── onChange() - Form field updates                            │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   │ handleSave()
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                                    │
│  EditorAvailabilityService                                          │
│  ├── setAvailability(data)                                          │
│  ├── getAvailability()                                              │
│  ├── markAvailable()                                                │
│  └── markUnavailable(from, until, reason)                           │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   │ Fetch.post()
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    API COMMUNICATION                                │
│  Fetch.ts (HTTP Client)                                             │
│  ├── Method: POST                                                   │
│  ├── URL: /api/editor/availability                                  │
│  └── Headers: { "Content-Type": "application/json" }                │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   │ HTTP Request
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                 NEXT.JS API ROUTE                                   │
│  app/api/editor/availability/route.ts                               │
│  ├── Validation                                                     │
│  │   ├── Check isAvailable (boolean)                                │
│  │   ├── If unavailable: validate dates                             │
│  │   └── Validate date range                                        │
│  │                                                                   │
│  ├── Processing                                                     │
│  │   ├── Transform request body                                     │
│  │   ├── (TODO: Call backend API)                                   │
│  │   └── Generate response                                          │
│  │                                                                   │
│  └── Response                                                       │
│      ├── Success: 200 + data                                        │
│      ├── Validation Error: 400                                      │
│      └── Server Error: 500                                          │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   │ HTTP Response
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    RESPONSE HANDLING                                │
│  Service Layer (Error Handling)                                     │
│  ├── Success: Return response data                                  │
│  └── Error: Throw error with details                                │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   │ Callback
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  STATE UPDATE & UI                                  │
│  EditorDashboardPage                                                │
│  ├── handleAvailabilitySave(availability)                           │
│  │   └── setEditorAvailability(availability)                        │
│  │                                                                   │
│  └── Toast Notification                                             │
│      └── toast.success() / toast.error()                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│ User Input (Modal Form)                                      │
│ {                                                             │
│   isAvailable: boolean,                                       │
│   availableFrom?: "YYYY-MM-DD",                               │
│   availableUntil?: "YYYY-MM-DD",                              │
│   reason?: string                                             │
│ }                                                             │
└────────────────┬─────────────────────────────────────────────┘
                 │
         ┌───────▼────────┐
         │  Validation    │
         │  • Check types │
         │  • Check dates │
         │  • Check range │
         └───────┬────────┘
                 │
    ┌────────────▼──────────────┐
    │  Valid?                   │
    └────┬─────────────────┬────┘
         │ No              │ Yes
         │                 │
    ┌────▼──────┐     ┌────▼─────────────┐
    │ Show Error │     │ Call Service    │
    │ Message    │     │ API Request     │
    └────────────┘     └────┬────────────┘
                            │
                   ┌────────▼──────────┐
                   │ API Response      │
                   │ Success? Error?   │
                   └────┬──────────┬───┘
                        │          │
                   ┌────▼──┐   ┌───▼─────┐
                   │Success│   │  Error  │
                   │Response   │Response │
                   └────┬──┘   └───┬─────┘
                        │          │
              ┌─────────▼──┐   ┌───▼──────┐
              │ Update     │   │ Show     │
              │ State      │   │ Error    │
              │ Close Modal│   │ Toast    │
              │ Show Toast │   │ Keep Open│
              └────────────┘   └──────────┘
```

---

## 🔗 Component Dependencies

```
SetAvailabilityModal
├── React (hooks: useState, useEffect)
├── @radix-ui/react-dialog (Dialog components)
├── react-hot-toast (Notifications)
├── EditorAvailabilityService (API calls)
└── @/components/ui/dialog (Dialog wrapper)

EditorDashboardPage
├── SetAvailabilityModal
├── React (hooks: useState)
├── Images, Links, Icons
└── DataTable (existing component)

EditorAvailabilityService
├── @/lib/Fetch (HTTP client)
└── TypeScript (types & interfaces)

API Route (/api/editor/availability)
├── NextRequest/NextResponse
├── TypeScript (validation)
└── Error handling
```

---

## 📋 Request/Response Schema

### POST Request
```typescript
POST /api/editor/availability

Body:
{
  "isAvailable": boolean,
  "availableFrom"?: "YYYY-MM-DD",
  "availableUntil"?: "YYYY-MM-DD",
  "reason"?: string
}

Headers:
{
  "Content-Type": "application/json"
}
```

### Success Response (200)
```json
{
  "success": true,
  "message": "Your availability has been updated",
  "data": {
    "isAvailable": boolean,
    "availableFrom": "YYYY-MM-DD",
    "availableUntil": "YYYY-MM-DD",
    "reason": "string",
    "updatedAt": "ISO-8601-timestamp"
  }
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

---

## 🎯 Validation Rules

```
┌─────────────────────────────────────────┐
│ Input Validation Layer                  │
├─────────────────────────────────────────┤
│                                         │
│ 1. Type Checking                        │
│    └─ isAvailable must be boolean      │
│                                         │
│ 2. Conditional Required Fields          │
│    ├─ If isAvailable = false:          │
│    │  ├─ availableFrom required        │
│    │  └─ availableUntil required       │
│    └─ If isAvailable = true:           │
│       └─ dates optional                 │
│                                         │
│ 3. Date Validation                      │
│    ├─ Valid format (YYYY-MM-DD)        │
│    ├─ ValidDate objects                │
│    └─ Range check (from < until)       │
│                                         │
│ 4. Length Validation                    │
│    └─ Reason optional, max length?     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔐 Error Handling Strategy

```
Try-Catch Block
│
├─ Form Validation Errors
│  ├─ Missing dates: "Please select..."
│  └─ Invalid range: "End date must be after..."
│
├─ API Errors
│  ├─ Network Error: "Connection failed"
│  ├─ Validation Error: "Invalid request"
│  ├─ Server Error: "Internal server error"
│  └─ Unknown Error: "Failed to update"
│
└─ User Feedback
   ├─ Console.error() for debugging
   ├─ Toast.error() for user
   └─ setLoading(false) to unlock UI
```

---

## 🚀 Performance Considerations

```
┌──────────────────────────────────────┐
│ Optimization Points                  │
├──────────────────────────────────────┤
│                                      │
│ 1. State Management                  │
│    └─ Local state (no Redux needed) │
│                                      │
│ 2. Re-rendering                      │
│    └─ Modal isolated from others     │
│                                      │
│ 3. API Calls                         │
│    └─ Single POST request            │
│                                      │
│ 4. Debouncing                        │
│    └─ Save button disabled on submit │
│                                      │
│ 5. Bundle Size                       │
│    └─ Uses existing dependencies     │
│                                      │
└──────────────────────────────────────┘
```

---

## 🔄 State Lifecycle

```
Modal Closed
    │
    │ User clicks button
    ↓
Modal Opens → useEffect() fires
    │
    │ Reset all state:
    │ ├─ isAvailable = true
    │ ├─ availableFrom = ""
    │ ├─ availableUntil = ""
    │ └─ reason = ""
    │
    │ User interacts with form
    ↓
Form State Changes
    │
    │ onChange() handlers update state
    ↓
User Clicks Save
    │
    │ validation
    │ └─ setLoading(true)
    │ └─ handleSave()
    ↓
API Call In Progress
    │
    ├─ Success
    │  ├─ toast.success()
    │  ├─ onSave() callback
    │  └─ onClose()
    │
    └─ Error
       ├─ toast.error()
       └─ Keep modal open
    │
    │ setLoading(false)
    ↓
Modal Closed / Stays Open
```

---

## 📱 Responsive Breakpoints

```
Desktop (≥1024px)
├─ Full modal width
├─ All fields visible
└─ Proper spacing

Tablet (768px - 1023px)
├─ Slightly smaller modal
├─ Adjusted padding
└─ Touch-friendly buttons

Mobile (<768px)
├─ Full-width modal
├─ Stacked layout
├─ Larger touch targets
└─ Vertical scrolling if needed
```

---

## 🧪 Testing Strategy

```
Unit Tests
├─ Modal rendering
├─ State management
├─ Form validation
└─ Error handling

Integration Tests
├─ API communication
├─ Service calls
├─ State updates
└─ Callback execution

E2E Tests
├─ User opens modal
├─ User fills form
├─ User submits
├─ Success notification
└─ Modal closes

Edge Cases
├─ Invalid dates
├─ Network failures
├─ Rapid clicks
└─ Browser back/forward
```

---

**Diagram Version:** 1.0  
**Last Updated:** January 2026  
**Status:** ✅ Complete
