# 💰 Project Cost Tracker

**Project Cost Tracker** is a scalable, modular web app designed to track and manage expenses across items and miscellaneous costs. Built with React, Redux Toolkit, Firebase, and Chakra UI, it provides authenticated users a clean, intuitive dashboard to manage their project finances in real time.

---

## ⚙️ Tech Stack

- **Frontend**: React, Chakra UI
- **State Management**: Redux Toolkit + Async Thunks
- **Backend**: Firebase Authentication + Firestore
- **Tooling**: Create React App

---

## 🚀 Features

- 🔐 Secure authentication (login/signup)
- 📦 Track items and other miscellaneous costs
- 🧾 Add, edit, and view itemized entries
- 🔄 Real-time updates via Firebase Firestore
- 💡 Clean Chakra UI components with responsive design
- 🧠 Modular Redux structure with slices & thunks

---

<h2 class="code-line" data-line-start=0 data-line-end=1 ><a id="projectcosttracker_folder_structure_0"></a>project-cost-tracker folder structure</h2>
<p class="has-line-data" data-line-start="1" data-line-end="41">│<br>
├── node_modules/<br>
│<br>
├── public/<br>
│ ├── favicon.ico<br>
│ ├── index.html<br>
│ ├── manifest.json<br>
│ └── robots.txt<br>
│<br>
├── src/<br>
│ ├── components/<br>
│ │ ├── AuthPage.js # Authentication component (login/signup)<br>
│ │ ├── Dashboard.js # Main dashboard after login<br>
│ │ ├── ItemForm.js # Form for adding/editing items<br>
│ │ ├── ItemsList.js # Component to display items in a table<br>
│ │ ├── OtherCostForm.js # Form for adding/editing other costs<br>
│ │ └── OtherCostsList.js # Component to display other costs in a table<br>
│ │<br>
│ ├── redux/<br>
│ │ ├── authSlice.js # Redux slice for auth state<br>
│ │ ├── authThunks.js # Async thunks for auth operations<br>
│ │ ├── itemsSlice.js # Redux slice for items state<br>
│ │ ├── itemsThunks.js # Async thunks for items operations<br>
│ │ ├── otherCostsSlice.js # Redux slice for other costs state<br>
│ │ ├── otherCostsThunks.js # Async thunks for other costs operations<br>
│ │ └── store.js # Redux store configuration<br>
│ │<br>
│ ├── services/<br>
│ │ ├── authService.js # Firebase auth service functions<br>
│ │ ├── itemsService.js # Firestore CRUD for items<br>
│ │ └── otherCostsService.js # Firestore CRUD for other costs<br>
│ │<br>
│ ├── App.js # Main App component<br>
│ ├── firebase.js # Firebase configuration<br>
│ └── index.js # Entry point<br>
│<br>
├── .gitignore<br>
├── package.json<br>
├── package-lock.json<br>
└── <a href="http://README.md">README.md</a></p>


## Live Demo 
https://project-cost-tracker-delta.vercel.app/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

