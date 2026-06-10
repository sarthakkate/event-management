# API Testing Guide

This document provides examples of how to test the API endpoints using cURL or Postman.

## Testing with cURL

### 1. Authentication

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response will include a token. Save it for subsequent requests:
```bash
TOKEN="your_token_here"
```

#### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### 2. Events

#### Get All Events
```bash
curl -X GET "http://localhost:5000/api/events"
```

#### Get Events with Filters
```bash
curl -X GET "http://localhost:5000/api/events?category=Conference&page=1&limit=10"
```

#### Get Single Event
```bash
curl -X GET http://localhost:5000/api/events/EVENT_ID
```

#### Create Event (Admin Only)
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Conference 2026",
    "description": "Annual technology conference discussing latest trends",
    "date": "2026-07-15",
    "time": "09:00",
    "location": "Convention Center, New York",
    "category": "Conference",
    "capacity": 500,
    "image": "https://example.com/image.jpg"
  }'
```

#### Update Event (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/events/EVENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "capacity": 600
  }'
```

#### Delete Event (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/events/EVENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Registrations

#### Register for Event
```bash
curl -X POST http://localhost:5000/api/registrations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "EVENT_ID"
  }'
```

#### Get User's Registrations
```bash
curl -X GET http://localhost:5000/api/registrations/user \
  -H "Authorization: Bearer $TOKEN"
```

#### Cancel Registration
```bash
curl -X DELETE http://localhost:5000/api/registrations/REGISTRATION_ID \
  -H "Authorization: Bearer $TOKEN"
```

#### Get Event Registrations (Admin)
```bash
curl -X GET http://localhost:5000/api/registrations/event/EVENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Admin

#### Get Dashboard
```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

#### Get All Users
```bash
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer $TOKEN"
```

#### Get All Registrations
```bash
curl -X GET http://localhost:5000/api/admin/registrations \
  -H "Authorization: Bearer $TOKEN"
```

#### Update User Role
```bash
curl -X PUT http://localhost:5000/api/admin/users/USER_ID/role \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin"
  }'
```

## Testing with Postman

1. Download and install [Postman](https://www.postman.com/downloads/)

2. Create a new Collection called "Event Management"

3. Set up Environment Variables:
   - `BASE_URL`: http://localhost:5000/api
   - `TOKEN`: (set after login)

4. Create requests for each endpoint

5. For authenticated endpoints:
   - In the Authorization tab, select "Bearer Token"
   - Enter: `{{TOKEN}}`

## Expected Responses

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Status Codes

- **200**: OK - Request successful
- **201**: Created - Resource created successfully
- **400**: Bad Request - Invalid input
- **401**: Unauthorized - Missing or invalid token
- **403**: Forbidden - Not authorized for this action
- **404**: Not Found - Resource not found
- **500**: Server Error - Internal server error

## Health Check

Check if server is running:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-06-10T12:00:00.000Z"
}
```

## Debugging Tips

1. **Enable logging**: Check server console for requests
2. **Check token**: Ensure token is valid and not expired
3. **Validate JSON**: Use a JSON validator before sending
4. **Check CORS**: Ensure CORS is enabled if testing from different origin
5. **Database**: Verify MongoDB is connected

## Common Issues

### 401 Unauthorized
- Token is missing or expired
- Use a fresh token from login response

### 403 Forbidden
- User doesn't have required permissions (admin role)
- Promote user to admin in database

### 404 Not Found
- Resource ID is incorrect
- Resource has been deleted

### CORS Error
- Check CLIENT_URL in server/.env
- Verify request origin matches allowed origins
