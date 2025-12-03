# Firebase Setup Guide

## Problem: "Missing or insufficient permissions" Error

If you're seeing this error when trying to save or view projects, you need to configure Firebase Security Rules.

## Required Firestore Security Rules

Go to **Firebase Console → Firestore Database → Rules** and update your rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Projects collection - public read, authenticated write (or public write for testing)
    match /projects/{projectId} {
      // Allow anyone to read projects (for public website)
      allow read: if true;
      
      // For production: require authentication
      // allow write: if request.auth != null;
      
      // For testing/development: allow public writes
      allow create, update, delete: if true;
    }
    
    // Add other collections as needed with appropriate rules
  }
}
```

## Required Firebase Storage Security Rules

Go to **Firebase Console → Storage → Rules** and update your rules to:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Projects images - public read, authenticated write (or public write for testing)
    match /projects/{projectId}/{allPaths=**} {
      // Allow anyone to read images (for public website)
      allow read: if true;
      
      // For production: require authentication
      // allow write: if request.auth != null;
      
      // For testing/development: allow public writes
      allow write: if true;
    }
    
    // Add other storage paths as needed
  }
}
```

## Important Notes

1. **Public write access is for testing only!** In production, you should:
   - Require authentication for writes
   - Use Firebase Admin SDK on a backend server
   - Implement proper access control

2. **After updating rules**, wait a few seconds for them to propagate, then refresh your application.

3. **If you need authentication**, you'll need to:
   - Set up Firebase Authentication
   - Sign in users before allowing writes
   - Update the rules to check `request.auth != null`

## Testing the Setup

1. Save a project from the admin form (`/admin/projects/create-new-project`)
2. Check the browser console for any errors
3. Visit the public projects page (`/projects`) to see if it appears
4. Check Firebase Console → Firestore to verify the document was created
5. Check Firebase Console → Storage to verify images were uploaded

## Troubleshooting

- **"Permission denied" errors**: Check that your security rules match the above
- **"Index required" errors**: Create the composite index in Firestore (Firebase will provide a link)
- **Images not uploading**: Check Storage rules and file size limits
- **Projects not appearing**: Check that `listenToProjects` is working and Firestore rules allow reads


