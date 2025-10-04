# Visitor Tracking - Session-Based

## 🎯 How It Works

The landing page now tracks visitors **once per browser session** using `sessionStorage`.

### Key Features:

✅ **One visitor per session** - Counts unique sessions, not page reloads  
✅ **SessionStorage-based** - Resets when browser tab/window closes  
✅ **Automatic tracking** - No user action required  
✅ **Privacy-friendly** - Only tracks session, not across sessions

---

## 📊 Tracking Behavior

### First Visit (New Session)
1. User lands on the page
2. System checks `sessionStorage` → No `visitor_tracked` key found
3. Fetches location data from ipapi.co
4. Sends visitor data to `/api/visitors`
5. Sets `sessionStorage.setItem('visitor_tracked', 'true')`
6. ✅ **Visitor counted**

### Same Session (Page Reload/Navigation)
1. User reloads page or navigates back
2. System checks `sessionStorage` → `visitor_tracked = 'true'`
3. ❌ **Does NOT send visitor data**
4. Logs: "Visitor already tracked in this session"

### New Session (Browser Restart/New Tab)
1. User closes browser and returns later
2. `sessionStorage` is cleared (browser behavior)
3. System treats as new visitor
4. ✅ **Visitor counted again**

---

## 🔍 SessionStorage vs LocalStorage vs Cookies

| Method | Duration | Use Case |
|--------|----------|----------|
| **sessionStorage** ✅ | Until tab closes | Unique sessions (our choice) |
| localStorage | Forever (until cleared) | Unique devices |
| Cookies | Set expiration | Cross-domain tracking |

**Why sessionStorage?**
- ✅ Accurately tracks unique browsing sessions
- ✅ Resets when user closes browser
- ✅ Privacy-friendly (no persistent tracking)
- ✅ No server-side state needed

---

## 🧪 Testing

### Test 1: First Visit
```bash
# Open browser console on landing page
sessionStorage.getItem('visitor_tracked')
# → null

# Page loads, visitor tracked
sessionStorage.getItem('visitor_tracked')
# → "true"

# Check console logs
# → "Visitor data sent to database"
```

### Test 2: Page Reload
```bash
# Reload the page (F5)
# Check console logs
# → "Visitor already tracked in this session"

# Verify sessionStorage
sessionStorage.getItem('visitor_tracked')
# → "true" (still set)
```

### Test 3: New Session
```bash
# Close browser tab/window
# Open new tab and visit landing page
sessionStorage.getItem('visitor_tracked')
# → null (cleared by browser)

# Page loads, visitor tracked again
# → "Visitor data sent to database"
```

### Test 4: Multiple Tabs
```bash
# Open landing page in Tab 1
# → Visitor tracked

# Open landing page in Tab 2 (same browser)
# → Visitor tracked AGAIN (different session)
```

**Note**: Each browser tab has its own `sessionStorage` instance.

---

## 📈 Analytics Implications

### Accurate Metrics:
- ✅ **Total Visitors** = Unique browsing sessions
- ✅ **Conversion Rate** = Submissions / Sessions (accurate)
- ✅ **No duplicate counts** from page reloads

### Example Scenario:
```
User Journey:
1. Visits landing page → Tracked ✅
2. Scrolls, reads content
3. Reloads page (F5) → NOT tracked (same session)
4. Submits form → Submission counted ✅
5. Navigates away, comes back → NOT tracked (same session)
6. Closes browser
7. Returns next day → Tracked ✅ (new session)

Result:
- 2 visitor records (2 sessions)
- 1 submission
- 50% conversion rate
```

---

## 🔧 Technical Implementation

### File: `components/landing/ContactForm.jsx`

**Before** (tracked every page load):
```javascript
await fetch('/api/visitors', {
  method: 'POST',
  body: JSON.stringify(visitorData)
});
```

**After** (once per session):
```javascript
// Check if visitor already tracked
const visitorTracked = sessionStorage.getItem('visitor_tracked');

if (!visitorTracked) {
  // Send visitor data
  await fetch('/api/visitors', {
    method: 'POST',
    body: JSON.stringify(visitorData)
  });
  
  // Mark as tracked
  sessionStorage.setItem('visitor_tracked', 'true');
} else {
  console.log('Visitor already tracked in this session');
}
```

---

## 🛠️ Customization Options

### Option 1: Track Once Per Day (Instead of Per Session)

Use `localStorage` with timestamp:

```javascript
const lastTracked = localStorage.getItem('visitor_last_tracked');
const now = Date.now();
const oneDay = 24 * 60 * 60 * 1000; // milliseconds

if (!lastTracked || (now - parseInt(lastTracked)) > oneDay) {
  // Track visitor
  localStorage.setItem('visitor_last_tracked', now.toString());
}
```

### Option 2: Track Once Ever (Unique Device)

Use `localStorage` without expiration:

```javascript
const hasVisited = localStorage.getItem('has_visited');

if (!hasVisited) {
  // Track visitor
  localStorage.setItem('has_visited', 'true');
}
```

### Option 3: Track with IP-based Deduplication

Server-side check (more accurate, privacy concerns):

```javascript
// In /api/visitors route
const recentVisit = await prisma.visitor.findFirst({
  where: {
    ip: visitorData.ip,
    createdAt: {
      gte: new Date(Date.now() - 30 * 60 * 1000) // Last 30 minutes
    }
  }
});

if (recentVisit) {
  return NextResponse.json({ message: 'Already tracked' });
}
```

---

## 🔍 Browser Compatibility

| Browser | sessionStorage Support |
|---------|----------------------|
| Chrome | ✅ Yes (all versions) |
| Firefox | ✅ Yes (all versions) |
| Safari | ✅ Yes (all versions) |
| Edge | ✅ Yes (all versions) |
| Mobile | ✅ Yes (iOS, Android) |

**Note**: `sessionStorage` is supported by all modern browsers.

---

## 🐛 Troubleshooting

### Visitor Counted Multiple Times on Same Visit

**Possible Causes:**
1. User is using private/incognito mode (sessionStorage cleared on each page load)
2. User is opening multiple tabs
3. User is switching between different browsers

**Solution**: This is expected behavior. Each private session and each tab is a separate session.

### Visitor Never Counted

**Check:**
1. JavaScript enabled in browser?
2. Console errors?
3. `/api/visitors` endpoint working?
4. Database connection OK?

**Debug:**
```javascript
// Add in ContactForm.jsx
console.log('SessionStorage available:', typeof sessionStorage !== 'undefined');
console.log('Visitor tracked:', sessionStorage.getItem('visitor_tracked'));
```

---

## 📊 Expected Analytics

### Before (Page Load Tracking):
```
100 visitors → 10 submissions
But visitors = multiple page loads from same user
Real conversion rate: Unknown
```

### After (Session Tracking):
```
50 unique sessions → 10 submissions
Real conversion rate: 20% ✅
```

---

## ✅ Benefits

1. **Accurate Analytics** - True session-based metrics
2. **Performance** - Reduces unnecessary API calls
3. **Database Efficiency** - Fewer duplicate records
4. **Privacy-Friendly** - Session-only tracking
5. **Better Insights** - Real user engagement metrics

---

## 🚀 Deployment

This change requires rebuilding the application:

```bash
docker-compose -f docker-compose.prod.yml up -d --build app
```

After deployment, all new visitors will be tracked once per session.

**Existing visitor counts remain unchanged.**

---

**Implementation Date**: October 2025  
**Status**: ✅ Active

