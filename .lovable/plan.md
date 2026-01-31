
# Complete Password Reset Flow Implementation

This plan implements a robust, production-ready password reset system with dedicated routes for password reset and email confirmation, following best practices for authentication flows.

---

## Overview

The current implementation handles password recovery via an `onAuthStateChange` event listener on the `/auth` page. However, for a more reliable and user-friendly experience, we'll create dedicated pages with explicit URL handling.

---

## What Will Be Changed

### 1. Create Dedicated Reset Password Page (`/reset-password`)

A new page at `/reset-password` that:
- Automatically detects when a user arrives via a password reset link
- Shows the password update form with validation
- Handles the `supabase.auth.updateUser()` call
- Shows a success message and redirects to sign in

### 2. Create Email Confirmed Page (`/email-confirmed`)

A new page at `/email-confirmed` that:
- Welcomes users after email confirmation
- Provides a clear call-to-action to sign in
- Improves the user experience after account verification

### 3. Update Redirect URLs

Update all authentication redirect URLs to use the production domain:
- Password reset: `https://juicyfish.online/reset-password`
- Email confirmation: `https://juicyfish.online/email-confirmed`

### 4. Update Routing

Add new routes to `App.tsx` for the dedicated pages.

### 5. Clean Up Auth Page

Remove the password recovery state handling from `/auth` since it will now be handled by the dedicated page.

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/ResetPassword.tsx` | Dedicated password reset form page |
| `src/pages/EmailConfirmed.tsx` | Email confirmation landing page |

## Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add routes for `/reset-password` and `/email-confirmed` |
| `src/pages/Auth.tsx` | Update redirect URL in forgot password handler, remove password recovery state |
| `src/hooks/useAuth.tsx` | Update email redirect URL for signup |

---

## Technical Details

### Reset Password Page Logic

```text
User clicks reset link in email
        ↓
Arrives at /reset-password with hash tokens
        ↓
Supabase automatically handles session from URL hash
        ↓
PASSWORD_RECOVERY event detected → Show password form
        ↓
User submits new password
        ↓
supabase.auth.updateUser({ password }) called
        ↓
Success → Show confirmation → Link to sign in
```

### Email Confirmed Page Logic

```text
User clicks confirmation link in email
        ↓
Supabase verifies email and redirects to /email-confirmed
        ↓
User sees welcome message
        ↓
User clicks "Continue to Sign In"
        ↓
Redirected to /auth
```

---

## URL Configuration Reminder

After implementation, you'll need to ensure your backend has the following redirect URLs configured:

- **Site URL**: `https://juicyfish.online`
- **Allowed Redirect URLs**:
  - `https://juicyfish.online`
  - `https://juicyfish.online/*`

This can be done in the Lovable Cloud dashboard under auth settings.

---

## Testing Checklist

After implementation:
1. Delete old password reset emails from your inbox
2. Go to `/auth` and click "Forgot password?"
3. Enter your email and request a reset
4. Open the reset link in an incognito window
5. Verify you're taken to `/reset-password`
6. Set a new password
7. Verify you can sign in with the new password

For email confirmation:
1. Create a new account
2. Check your email for the confirmation link
3. Click the link and verify you land on `/email-confirmed`
4. Click to continue to sign in
