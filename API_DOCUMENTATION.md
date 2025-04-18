# API Documentation

This document describes the available API endpoints for the Laravel backend.

---

## Authentication

### Register
- **POST** `/register`
- **Body:** `{ "name": string, "email": string, "password": string, "password_confirmation": string }`
- **Response:** User object and access token

### Login
- **POST** `/login`
- **Body:** `{ "email": string, "password": string }`
- **Response:** User object and access token

### Logout
- **POST** `/logout`
- **Header:** `Authorization: Bearer {token}`
- **Response:** Success message

---

## User Profile

### Get Profile
- **GET** `/profile`
- **Header:** `Authorization: Bearer {token}`
- **Response:** User object

### Update Profile
- **PUT** `/profile`
- **Header:** `Authorization: Bearer {token}`
- **Body:** `{ "name"?: string, "email"?: string, "password"?: string, "password_confirmation"?: string }`
- **Response:** Updated user object

---

## Trips

### List Trips
- **GET** `/trips`
- **Header:** `Authorization: Bearer {token}`
- **Response:** List of user's trips

### Create Trip
- **POST** `/trips`
- **Header:** `Authorization: Bearer {token}`
- **Body:** `{ "name": string, "description"?: string }`
- **Response:** Created trip object

### Get Trip
- **GET** `/trips/{trip}`
- **Header:** `Authorization: Bearer {token}`
- **Response:** Trip object with contents

### Update Trip
- **PUT** `/trips/{trip}`
- **Header:** `Authorization: Bearer {token}`
- **Body:** `{ "name"?: string, "description"?: string }`
- **Response:** Updated trip object

### Delete Trip
- **DELETE** `/trips/{trip}`
- **Header:** `Authorization: Bearer {token}`
- **Response:** Success message

### Add Content to Trip
- **POST** `/trips/{trip}/contents`
- **Header:** `Authorization: Bearer {token}`
- **Body:** `{ "content_id": integer }`
- **Response:** Trip object with updated contents

### Remove Content from Trip
- **DELETE** `/trips/{trip}/contents/{content}`
- **Header:** `Authorization: Bearer {token}`
- **Response:** Trip object with updated contents

---

## Wishlist

### List Wishlists
- **GET** `/wishlists`
- **Header:** `Authorization: Bearer {token}`

### Add/Remove Content from Wishlist
- **POST** `/wishlists/{content}`
- **Header:** `Authorization: Bearer {token}`

### Check if Content is Wishlisted
- **GET** `/wishlists/{content}/check`
- **Header:** `Authorization: Bearer {token}`
- **Response:** `{ "is_wishlisted": boolean }`

---

## Favorites

### List Favorites
- **GET** `/favorites`
- **Header:** `Authorization: Bearer {token}`

### Add/Remove Favorite
- **POST** `/favorites/{content}`
- **Header:** `Authorization: Bearer {token}`

### Check if Content is Favorited
- **GET** `/favorites/{content}/check`
- **Header:** `Authorization: Bearer {token}`
- **Response:** `{ "is_favorited": boolean }`

---

## Content

### Destinations
- **GET** `/destinations`

### Outbounds
- **GET** `/outbounds`

### Cultures
- **GET** `/cultures`

### Food and Beverages
- **GET** `/food-and-beverages`

### Top Favorites
- **GET** `/top-favorites`

### Top Favorites by Category
- **GET** `/top-favorites-by-category`

---

## Recommendations

### Get Recommendations
- **GET** `/recommendations`
- **Header:** `Authorization: Bearer {token}`

---

## Notes
- All protected endpoints require authentication using Laravel Sanctum tokens (send as Bearer token in the `Authorization` header).
- All responses are in JSON format.
- Validation errors return HTTP 422 with error details.

---

For further details on request/response examples or specific fields, refer to the corresponding controller or resource classes in the codebase.
