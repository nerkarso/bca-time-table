<p align="center">
  <img src="public/img/icons/android-chrome-192x192.png" width="96" alt="Icon" />
</p>

<h1 align="center">BCA Time Table</h1>

<p align="center">A user-friendly web app of the BCA class time table.</p>

**For the latest version see [PCTE Timetable](https://github.com/nerkarso/pcte-timetable).**

## Development

### Dependencies

- [Bulma](https://bulma.io)
- [Inter UI](https://github.com/rsms/inter)
- [Sass](https://sass-lang.com)
- [vue-icon](https://github.com/qinshenxue/vue-icon)
- [Vue.js](https://vuejs.org)
- [Vue Router](https://router.vuejs.org)

### Requirements

- [Node.js](https://nodejs.org) `10.x`
- [Yarn](https://yarnpkg.com)

### Installation

- Clone the repository. `git clone https://<repo-url>.git`
- Run `yarn install` to install Node.js dependencies.

## Usage

### Commands

```bash
# Export Excel sheet to JSON file
yarn export
# Exports to ./data/table.json

# Compiles and hot-reloads for development
yarn serve

# Compiles and minifies for production
yarn build
# Output directory ./dist/
```

## Data

### Process

1. Download the time table PDF file from your e-mail inbox.
2. Export the PDF file to an Excel sheet and save it as `sheet.xlsx`.
3. Unmerge all cells and delete all empty columns in the Excel sheet.
4. Put the Excel sheet in `./data/` folder.
5. Open [./data/db.json](./data/db.json) and change the date.
6. Run `yarn export`.

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
    "12:30 - 01:30",
    "01:35 - 02:35",
    "02:40 - 03:40",
    "03:40 - 04:40"
  ]
}
```

#### Dictionary

In the `"dictionary"` key, you can specify which values from the Excel sheet will be replaced when it is exported to a JSON file.

```json
"dictionary": [
  [
    "FIND_THIS",
    {
      "REPLACE": "WITH_THIS"
    }
  ]
]
```
