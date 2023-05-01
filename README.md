# Antaris-web technical documentation

Antaris is a project from ENGR 498 Capstone class at the University of Arizona designed and developed by team 23062.

---
_Table of contents:_

- [Software concept and explanation](#installation)
  - Researcher domain
  - Participant domain
- [Packages and dependencies](#nextjs-usage)
- [Database schemas]()
- [Project structure](#nextjs-middlewares-usage)
- [Components](#advanced-usage)
  - [Researcher dashboard](#coding-best-practices)
      - UI components
      - Utilities
  - [Researcher survey overview](#session-wrappers)
      - UI components
      - Utilities
  - [Researcher participant overview]
      - UI components
      - Utilities
  - [Participant dashboard](#express)
      - UI components
      - Utilities
- [API](#api)
  - [ironOptions](#ironoptions)
  - [Next.js: withIronSessionApiRoute(handler, ironOptions | (req: NextApiRequest, res: NextApiResponse) => IronOptions | Promise\<IronOptions\>)](#nextjs-withironsessionapiroutehandler-ironoptions--req-nextapirequest-res-nextapiresponse--ironoptions--promiseironoptions)
  - [Next.js: withIronSessionSsr(handler, ironOptions | (req: IncomingMessage, res: ServerResponse) => IronOptions | Promise\<IronOptions\>)](#nextjs-withironsessionssrhandler-ironoptions--req-incomingmessage-res-serverresponse--ironoptions--promiseironoptions)
  - [Express: ironSession(ironOptions)](#express-ironsessionironoptions)
  - [session.save()](#sessionsave)
  - [session.destroy()](#sessiondestroy)
- [FAQ](#faq)
  - [Why use pure cookies for sessions?](#why-use-pure-cookies-for-sessions)
  - [What are the drawbacks?](#what-are-the-drawbacks)
  - [How is this different from JWT?](#how-is-this-different-from-jwt)
- [Project status](#project-status)
- [Credits](#credits)
- [References](#references)
- [Contributors](#contributors)


## Software concept and explanation
---
### Researcher domain

Antaris-web is created with Next.js framework which allows the application to operate the backend and frontend in a single repository. The frontend delivers a graphical user interface (GUI) to the researcher with information fetched through the backend. Antaris-web makes use of MyDataHelps API to populate up-to-date data about surveys and participants within a MyDataHelps project and leverages MongoDB for data storage.

As a researcher enters Antaris, they will be asked to sign up with credentials from a Service Account created inside MyDataHelps (including a Service Account ID, a project ID, and a private key) and a self-selected password. The credentials from the Service Account will provide the needed details and grant Antaris the permission to access the researcher's profile on MyDataHelps to discover surveys and participants, while the password will allow the researcher to sign back in without having to re-input all private information. More specifically, after the initial registration, the researcher can sign in to their portal using a pair of Service Account ID and the password.


In the dashboard, the researcher shall be able to see a list of surveys, a list of participants (both lists are fetched from MyDataHelps API) and a list of responses via Alexa from participants if any.

Antaris allows researchers to view any survey and participants in details by populating in-depth details in following pages (details are discussed in ...)
- For survey: `/re/dashboard/surveys/:surveyId`
- For participant: `/re/dashboard/participants/:participantId`

Since MyDataHelps APIs do not provide clients with the already-imported survey content, Antaris requires researchers to manually import the survey using the JSON template from MyDataHelps, then save the parsed content into database with other details.

When researchers perform any assignment-related actions, like "Send" or "Send and notify", with an Antaris-imported survey to an eligible participant, the reference of that survey will be assigned to pre-defined fields inside the document of that participant in database.

As an Antaris-registered participant starts to interact with their Alexa devices, an API call with selected details will be sent to Antaris to request the information about the participant including the assigned surveys retrieved through the references created through actions from researchers. 

### Participant domain

Write something here

## Packages and dependencies

---

Details about all packages and dependencies can be found in `package.json` in the root directory.

### User interface and styling

| **Name**             | Description                                                                 | Usage                                                                             |
|----------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **bootstrap**        | An open-source CSS framework for front-end development.                     | Enable quick and consistent styling for UI components.                            |
| **react-bootstrap**  | React-adapted UI framework built on top of bootstrap.                       | Enable quick development of reusable UI components.                               |
| **chart.js**         | An open-source JavaScript library for data visualization.                   |                                                                                   |
| **react-chartjs-2**  | React-adapted data visualization framework built on top of chart.js         | Visualize survey statistics.                                                      |
| **react-date-range** | A date library agnostic React component for choosing dates and date ranges. | Build date range picker for responses filter in researcher dashboard.             |
| **react-select**     | A flexible and beautiful Select Input control for React.                    | Build a respondents select dropdown for responsed filter in researcher dashboard. |
| **Font Awesome**     | Icon library and toolkit for front-end development                          | Add descriptive icons to UI components like buttons.                              |

### Tools and helpers

| **Name**         | Description                                                                         | Usage                                                                                   |
|------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| **Axios**        | A promise-based HTTP client library.                                                | Make HTTP request to both internal and external RESTful API to populate data.           |
| **bcrypt**       | A Javascript library that handles hashing and validating passwords.                 | Process and store passwords of researcher accounts to database.                         |
| **iron-session** | Node.js stateless session utility using signed and encrypted cookies to store data. | Implement server-side session storage for authentication and short-term data retention. |
| **jwt-simple**   | JWT encode and decode module for node.js.                                           | Sign, encode, and decode json payload for authentication.                               |
| **react-csv**    | React-adapted library for creating CSV files.                                       | Enable construct and export response data in CSV format.                                |
| **swr**          | A React hook for data fetching implementing HTTP cache invalidation strategy.       | Fetch and auto-validate data from RESTful API routes.                                   |
| **uuid**         | A Javascript implementation of UUID.                                                | Generate unique strings for authentication-related tasks.                               |                   |
### Database

| **Name**     | Description                                                                     | Usage                                                     |
|--------------|---------------------------------------------------------------------------------|-----------------------------------------------------------|
| **mongodb**  | A database program.                                                             | Store all data.                                           |
| **mongoose** | A MongoDB object modeling tool designed to work in an asynchronous environment. | Define schemas and simplify querying and processing data. |

## Database schemas

Antaris data storage is categorized into 5 collections: `amazonaccounts`, `participantresponses`, `serviceaccounts`, `participants`, and `surveys`. The code implementation for these 5 schemas/models can be found in `@/core/models`.
- amazonaccounts: stores accounts of participants who sign up with Antaris using Amazon credentials

```js
{
  name: String,
  email: String,
  lwa_access_token: String,
  lwa_refresh_token: String,
  lwa_token_expires_at: Date,
  alexa_metadata: {
    skill_id: { type: String, default: process.env.SKILL_ID },
    user_id: { type: String, default: '' },
    account_linked: { type: Boolean, default: false },
    skill_enabled: { type: Boolean, default: false },
    project_id: { type: String, default: '' },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Participant',
        default: [],
      },
    ],
  },
}
```

- serviceaccounts: stores accounts of researchers who sign up with Antaris using Service Account credentials from MyDataHelps
```js
{
  project_id: String,
  mdh_id: String,
  private_key_encoded: String,
  password_hash: String,
  access_token: String,
  token_expires_at: Date,
  last_accessed: { type: Date, default: Date.now() },
}
```
- participants: stores information about a participant 
```js
{
  participant_identifier: { type: String, default: '' },
  secondary_identifier: { type: String, default: '' },
  project_id: { type: String, default: '' },
  amazon_email: { type: String, default: '' },
  alexa_metadata: {
    skill_id: { type: String, default: process.env.SKILL_ID },
    user_id: { type: String, default: '' },
    account_linked: { type: Boolean, default: true },
    skill_enabled: { type: Boolean, default: true },
    assigned_surveys: [
      {
        survey: { type: Schema.Types.ObjectId, ref: 'Survey' },
        completed: { type: Boolean, default: false },
        assigned_at: { type: Date, default: Date.now() },
        progress: { type: Number, default: 0 },
        notified: { type: Boolean, default: false },
        last_notified: Date,
        _id: false,
      },
    ],
  },
  demographics: {
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
  },
}
```
- surveys: stores information about a survey
```js
{
  project_id: { type: String, default: '' },
  mdh_id: { type: String, default: '' },
  name: { type: String, default: '' },
  display_name: { type: String, default: '' },
  description: { type: String, default: '' },
  alexa_completed: { type: Boolean, default: false },
  content: {
    imported_at: { type: Date, default: Date.now() },
    questions: [
      {
        type: { type: String, default: '' },
        text: { type: String, default: '' },
        title: { type: String, default: '' },
        identifier: { type: String, default: '' },
        _id: false,
      },
    ],
  },
  assigned_to: {
    type: [
      {
        progress: { type: Number, default: 0 },
        participant: { type: Schema.Types.ObjectId, ref: 'Participant' },
        completed: { type: Boolean, default: false },
        assigned_at: { type: Date, default: Date.now() },
        notified: { type: Boolean, default: false },
        last_notified: Date,
        _id: false,
      },
    ],
    default: [],
  },
}
```
- participantresponses: stores information about responses via Alexa of participants
```js
{
  project_id: { type: String, default: '' },
  responded_by: { type: Schema.Types.ObjectId, ref: 'Participant' },
  responded_to: { type: Schema.Types.ObjectId, ref: 'Survey' },
  content: [
    {
      question_text: { type: String, default: '' },
      question_identifier: { type: String, default: '' },
      answer_text: { type: String, default: '' },
      provided_at: { type: Date, default: Date.now() },
      _id: false,
    },
  ],
  started_at: { type: Date, default: Date.now() },
  completed_at: Date,
  completed: { type: Boolean, default: false },
}
```

## Project structure
---

```
├── src
│   ├── controller
│   │   ├── **/*.css
│   ├── views
│   ├── model
│   ├── index.js
├── public
│   ├── css
│   │   ├── **/*.css
│   ├── images
│   ├── js
│   ├── index.html
├── dist (or build
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore
```

```tree
core
 ┣ auth
 ┃ ┣ index.js
 ┃ ┗ sessionCookie.js
 ┣ components
 ┃ ┣ AuthCardWrapper
 ┃ ┃ ┣ AuthCardWrapper.jsx
 ┃ ┃ ┣ AuthCardWrapper.module.css
 ┃ ┃ ┗ index.js
 ┃ ┣ DarkOverlay
 ┃ ┃ ┣ DarkOverlay.jsx
 ┃ ┃ ┣ DarkOverlay.module.css
 ┃ ┃ ┗ index.js
 ┃ ┣ InputField
 ┃ ┃ ┣ InputField.jsx
 ┃ ┃ ┗ index.js
 ┃ ┣ LinkAlexaButton
 ┃ ┃ ┣ LinkAlexaButton.jsx
 ┃ ┃ ┣ LinkAlexaButton.module.css
 ┃ ┃ ┗ index.js
 ┃ ┣ LoginWithAmazonButton
 ┃ ┃ ┣ LoginWithAmazonButton.jsx
 ┃ ┃ ┣ LoginWithAmazonButton.module.css
 ┃ ┃ ┗ index.js
 ┃ ┣ PageSectionWrapper
 ┃ ┃ ┣ PageSectionWrapper.jsx
 ┃ ┃ ┗ index.js
 ┃ ┣ PageTitle
 ┃ ┃ ┣ PageTitle.jsx
 ┃ ┃ ┣ PageTitle.module.css
 ┃ ┃ ┗ index.js
 ┃ ┣ SubmitButton
 ┃ ┃ ┣ SubmitButton.jsx
 ┃ ┃ ┗ index.js
 ┃ ┣ TextareaField
 ┃ ┃ ┣ TextareaField.jsx
 ┃ ┃ ┗ index.js
 ┃ ┗ index.js
 ┣ db
 ┃ ┗ connectToDb.js
 ┣ models
 ┃ ┣ AmazonAccount.js
 ┃ ┣ Participant.js
 ┃ ┣ ParticipantResponse.js
 ┃ ┣ ServiceAccount.js
 ┃ ┣ Survey.js
 ┃ ┗ index.js
 ┗ utils
 ┃ ┣ auth
 ┃ ┃ ┣ index.js
 ┃ ┃ ┗ with-ssr-auth.js
 ┃ ┣ datetime
 ┃ ┃ ┣ get-expiration-timestamp.js
 ┃ ┃ ┣ get-formatted-date.js
 ┃ ┃ ┣ get-relative-time.js
 ┃ ┃ ┗ index.js
 ┃ ┣ response
 ┃ ┃ ┣ get-response-filter-from-session.js
 ┃ ┃ ┗ index.js
 ┃ ┣ session
 ┃ ┃ ┣ index.js
 ┃ ┃ ┣ with-session-api-route.js
 ┃ ┃ ┗ with-session.js
 ┃ ┣ survey
 ┃ ┃ ┣ group-survey-by-id.js
 ┃ ┃ ┗ index.js
 ┃ ┣ tools
 ┃ ┃ ┣ hide-when-clicked-outside.js
 ┃ ┃ ┣ index.js
 ┃ ┃ ┣ jsonify.js
 ┃ ┃ ┗ jwt-utils.js
 ┃ ┗ index.js
```

