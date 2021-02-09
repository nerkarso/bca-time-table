<p align="center">
  <img src="src/static/logo.png" width="96" alt="Icon" />
</p>

<h1 align="center">BCA Time Table</h1>

<p align="center">A human readable format of class BCA-1B time table.</p>

**For the latest version see [PCTE Timetable](https://github.com/nerkarso/pcte-timetable).**

## Development

### Dependencies

- [Bulma](https://bulma.io)
- [node-xlsx](https://github.com/mgcrea/node-xlsx)
- [Sass](https://sass-lang.com)
- [vue-icon](https://github.com/qinshenxue/vue-icon)
- [Vue.js](https://vuejs.org)
- [Vue Router](https://router.vuejs.org)

### Requirements

- [Node.js](https://nodejs.org) `10.x`
- [npm](https://www.npmjs.com)

### Installation

- Clone the repository. `git clone https://<repo-url>.git`
- Run `npm install` to install Node.js dependencies.

## Usage

### Commands

```bash
# Export Excel sheet to JSON file
npm run export
# Exports to ./data/table.json

# Starts up Parcel development server
npm start
# Output directory is ./dist/

# Builds the assets once for production
npm run build
# Output directory ./build/

# Upload build files to local server
npm run upload:local
# Output directory is D:/www/apps/bca-time-table/

# Deploy locally
npm run deploy:local
# This runs export, build and upload in a sequence
```

### Database

A small [JSON file](./data/db.json) to hold necessary values during the export process. If this file is not present, then please create one just like the example below and save it as `./data/db.json`.

#### Example

```json
{
  "class": "CLASSNAME",
  "date": "DATE",
  "dictionary": [
    [
      "CODE",
      {
        "code": "CODE",
        "name": "NAME"
      }
    ]
  ],
  "weekdays": [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  "time": [
    "09:00 - 10:00",
    "10:05 - 11:05",
    "11:25 - 12:25",
    "12:30 - 1:30",
    "01:35 - 02:35",
    "02:40 - 03:40",
    "03.40 - 04.40"
  ]
}
```

#### Dictionary

In the `"dictionary"` key, you can specify which value from the Excel sheet will be replaced when it is exported to a JSON file.

```json
"dictionary": [
  [
    "FIND_THIS",
    {
      // REPLACE_WITH_THIS
    }
  ]
]
```
