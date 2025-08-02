#  CHROME EXTENSION TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS #

COMPANY: CODTECH IT SOLUTIONS

NAME: YASH PATIL

INTERN ID: CT04DZ676

DOMAIN: FULL STACK WEB DEVELOPMENT

DURATION: 4 WEEKS

MENTOR: NEELA SANTOSH KUMAR

## DESCRIPTION ##

A powerful Chrome extension that helps users monitor their online activities, track time spent on various websites, and analyze productivity through detailed insights and charts.

## 📌 Features

- ⏳ **Real-Time Time Tracking** for each visited website
- 📊 **Productivity Reports** with pie/bar charts and weekly summaries
- 📅 **Daily/Weekly Analytics** to visualize focus and distractions
- 🧠 **Focus Mode** to block distractions during deep work
- 🔒 Secure local storage of user data (or sync to backend, if used)
- 🛠️ Simple and elegant UI for quick interaction

---

## 📁 Project Structure

 CHROME EXTENSION TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS/

├── public/

│ ├── icon.png

│ └── manifest.json 

├── src/ 

│ ├── background.js 

│ ├── content.js 

│ ├── popup.js 

│ ├── popup.html

│ └── style.css

├── dist/ 
│ └── (Generated files)

├── package.json

├── README.md # Project documentation

└── .gitignore


## 🚀 Installation

### For Users

1. Clone the repository:

   ```bash
   git clone https://github.com/yash-s29/TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS.git
   
- Go to chrome://extensions/ in your browser.

- Enable Developer Mode (top right).

- Click Load unpacked and select the frontend/ folder.

- Extension should now appear in your Chrome toolbar.

//if you're using a bundler (like Vite, Webpack, or Parcel), live development works as follows:

npm run dev

//Run build (if using bundler like Vite/Webpack):

npm install
npm run build     # Builds files to /dist

# 📈 Reports & Analytics #

- Displays time spent on each website
  
- Generates weekly summaries (in popup or dashboard)

-  productivity score based on your custom rules

- Charts rendered using Chart.js or similar library

  



