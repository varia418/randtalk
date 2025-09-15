# RandTalk

<p align="center">
  <img src="/public/randtalk-logo.png" alt="RandTalk Logo" width="200"/>
</p>

<p align="center">
  A real-time chat application built with modern web technologies.
</p>

## Features

-   **Real-time Messaging**: Instantly send and receive messages in chat rooms.
-   **Multiple Rooms**: Create and join different chat rooms.
-   **User Presence**: See who is currently online in a chat room.
-   **Username Selection**: Users can set their own username.
-   **Emoji Picker**: Easily add emojis to your messages.
-   **File Sharing**: Share files with other users in the chat.

## Tech Stack

-   **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
-   **Backend & Real-time**: [Supabase](https://supabase.io/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.

## Completed features

### Basic requirements

-   [x] Create a chat room feature.
-   [x] Display a list of chat rooms.
-   [x] Implement the ability to join chat rooms.
-   [x] Enable chat functionality within the rooms.
-   [x] Deploy the application to a publicly accessible platform.

### Advanced Requirements

-   [x] Implement file transfer functionality within the chat rooms.
-   [ ] Enable video conferencing using WebRTC.

## Known Issues and Limitations

-   Number of participants in a room might not be accurate.
-   Cannot download files from the chat room.

## Future Improvements

-   **Full User Authentication**: Implement a secure authentication system with email/password and/or OAuth providers to manage user accounts.
-   **Direct Messaging**: Add functionality for users to initiate private one-on-one conversations.
-   **Typing Indicators & Read Receipts**: Enhance the user experience by showing when other users are typing and whether messages have been read.
-   **User Profiles**: Allow users to create profiles with avatars, status messages, and other information.
-   **Advanced Moderation Tools**: Introduce roles (admin, moderator) with privileges to manage chat rooms and users effectively.
-   **Search Functionality**: Implement a feature to search through message history within rooms.
-   **Notifications**: Add browser notifications to alert users of new messages when the application is in the background.
