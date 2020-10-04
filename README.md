# HeyHi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.
- AngularFire 

## Problem Statement/Requirement

Chat App á la Whats App
- List of users with whom I can chat
- Open chat with one user where I can start to chat
- Display and store the chat history with the respective user


## Features

- In order to provide a clear, logical flow, Sign up and Login is added so you can login in the app in different browsers with different users and chat between them in real-time.
- A list of hardcoded users are provided which can be seen when a user logs in. With each sign up, new user will be added to this list.
- You can sign up as new user or use this test login credential for first time login - `test@test.com / 123qwe`
- You should be able to see the open chats with the test user. Alternatively you can add user from the nav bar to start chatting with them.
- Displays and Stores the chat history.


### Function Defination 

The project consist of these main logics 

- Register ==> Will generate a unique Id against the email provided 
- CreateUser ==> Will create the user against the uid in the firestore db. 
- Login ==> Using the email, firebase Auth will check for the uid and provide it.
- getCurrentUser ==> Against that uid we will fetch the data and save it as currentUser.
- DASHBOARD will be routed 
- It consist of a sidebar for conversations and a chat screen along with add and logout.
- GetAllUsers ==> To start a conversation, press getAllUsers() which will enlist all users
- SelectAUser ==> The user will be selected and now we will create a chatId in the firestore and 
add references to both the loggedIn user profile and the other profile containing each other's uid, name and chatId.
- SendMessage ==> Sending a text message will push the message in the messages Array against that chatId. 
- ScrollTo ==> Whenver a message is send, ScrollTo bottom will come in action and will move the screen bottom.
- Logout ==> User can easily log out of the system and localStorage and service will be cleared. 


### Dashboard Component UI 

- This contains a chat room UI for sending messages, fetching Users and conversations.
- Sidebar consist of our conversations which are list of people who we have chat with before. A single user conversation instance consist of an element with *uid,name,chatId* 
- Toolbar consist of sidebar toggler, Add new user and log out button.

### How chat works - Logical description 

- A chat between two users happens by maintaining a common value between two users, which for the scenario is the **chatId** 
- ChatId is the reference to the node in the collection conversations containing all the messages between two users. 
- **message** consist of simple values like ( *senderId, senderName, content* )
- Whenever a user select a user to talk to, trigger operation is exectuted consisting of the following points.
- **Creation of chatId** - A new chatId is generated and in conversation/*chatId* - {chatId:*chatId* , messages:[]} is added. 
- **ChatId user instances** - Now an instance is added in user conversations containing a chatId, unique identiier (uid) of the opposite user and the name of the opposite user. 
- This will now be seen in your sidebar conversation sections maintined in **currentUser.conversations** value. 
- **chat** - in the api.service.ts, you will find an instance of the current chat which will be maintained in this variable.
- After a user has selected another user to chat with, the above operation is executed under the hood and you have showMessages enabled and chat screen is now active. 
- **SendMessage** - your message is simply a string **message** that is passed on to the service where the message is pushed to **chat.messages** and then the chat instance, through the chatId, is updated. 
- **receiveMessage** - Whenever we use valueChanges(), we are currently looking for any change and it will reflect in the chat. 
- **Scrolling** - using the package 'ngx-scroll-to', the logic is that it will go to the very first messages that were pushed in the array with 1second timeout for smooth scrolling. Whenever a user comes this will also trigger. 
- **Conversation Filter** - This is for filtering the user in the conversation tab. 


## Notes/Pending (Things I would like to add with more time)

- No tests have been written.
- Dashboard could have been more optimized for mobile view.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



