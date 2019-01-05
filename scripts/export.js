const xlsx = require("node-xlsx").default;
const fs = require("fs");

// Global variables
const sheetPath = "./data/sheet.xlsx";
const className = "BCA-1B";
const date = "Monday Jan 7, 2019";

/**
 * Save JSON
 * 
 * Save content to a JSON file.
 * @param {*} content file content.
 * @param {string} filename name of the file. `loremipsum.json`
 * @returns void
 */
function saveJson(content, filename) {
  // Output directory
  const dir = "./data";

  // Check if directory exists
  if (!fs.existsSync(dir)) {
    // Create output folder
    fs.mkdirSync(dir);
  }

  // Write to a JSON file
  fs.writeFile(`${dir}/${filename}`, JSON.stringify(content, null, 2), (error) => {
    console.log(`Content saved to ${dir}/${filename}!`);
  });
}

/**
 * Get Day by index
 * 
 * @param {*} index 
 * @returns {string} name of the day.
 */
function getDay(index) {
  switch (index) {
    case 0:
      return "Monday";
      break;
    case 1:
      return "Tuesday";
      break;
    case 2:
      return "Wednesday";
      break;
    case 3:
      return "Thursday";
      break;
    case 4:
      return "Friday";
      break;
    case 5:
      return "Saturday";
      break;
    default:
      return "";
  }
}

/**
 * Get Time by index
 * 
 * @param {integer} index 
 * @returns {string} lecture time duration.
 */
function getTime(index) {
  switch (index) {
    case 0:
      return "09:00 - 10:00";
      break;
    case 1:
      return "10:05 - 11:05";
      break;
    case 2:
      return "11:25 - 12:25";
      break;
    case 3:
      return "12:30 - 1:30";
      break;
    case 4:
      return "01:35 - 02:35";
      break;
    case 5:
      return "02:40 - 03:40";
      break;
    case 6:
      return "03.40 - 04.40";
      break;
    default:
      return "";
  }
}

/**
 * Replace Value
 * 
 * @returns 
 */
function replaceValue(arr) {
  // Variables
  const dictionary = [
    // Subjects
    ["BSBC201", {
      code: "BSBC201",
      name: "Communication"
    }],
    ["BSBC202", {
      code: "BSBC202",
      name: "Mathematics"
    }],
    ["BSBC203", {
      code: "BSBC203",
      name: "Web Development"
    }],
    ["BSBC204", {
      code: "BSBC204",
      name: "CSA"
    }],
    ["BSBC205", {
      code: "BSBC205",
      name: "C++"
    }],
    ["BSBC206", {
      code: "BSBC206",
      name: "C++ (Lab)"
    }],
    ["EVSC", {
      code: "EVSC101",
      name: "Environmental Science"
    }],
    // Faculty
    ["NB", {
      code: "NB",
      name: "NB"
    }],
    ["PK", {
      code: "PK",
      name: "Prabhjot Kaur"
    }],
    ["GK", {
      code: "GK",
      name: "Gurpreet Kaur"
    }],
    ["RA", {
      code: "GK",
      name: "Gurpreet Kaur"
    }],
    ["HPS", {
      code: "HPS",
      name: "Harinder Pal Singh"
    }],
    ["SNEHA", {
      code: "SNEHA",
      name: "SNEHA"
    }]
  ]

  // Map array
  arr.map((value, index) => {
    // Iterate through dictionary
    for (let i = 0; i < dictionary.length; i++) {
      // Check if value matches dictionary
      if (value.toLowerCase() == dictionary[i][0].toLowerCase()) {
        // Replace value
        arr[index] = dictionary[i][1];
      }
    }
  });

  // Return array
  return arr;
}

/**
 * Group By Subject
 * 
 * @param {*} arr array of subjects, faculties and rooms.
 * @returns {*} groups of subjects.
 */
function groupBySubject(arr) {
  // Variables
  const limit = 3;
  let groups = [];

  // Slice into groups of 3 and create a new array
  for (let i = 0, end = arr.length / limit; i < end; ++i) {
    // Add new array to groups array
    groups.push(arr.slice(i * limit, (i + 1) * limit));
  }

  // Return groups of subjects
  return groups;
}

/**
 * Group By Lecture
 * 
 * @param {*} arr array of groups of subjects
 * @returns {*} groups of lectures with time.
 */
function groupByLecture(arr) {
  // Variables
  let groups = [];

  // Map each item to given time
  arr.map((item, index) => {
    // Add time and item to groups array
    groups.push({
      time: getTime(index),
      subject: item[0] || "",
      faculty: item[1] || "",
      room: item[2] || ""
    });
  });

  // Return groups of lectures with time
  return groups;
}

/**
 * Import Sheet
 * 
 * @returns {*} JSON content.
 */
function importSheet() {
  // Parse Excel file
  const content = xlsx.parse(sheetPath);

  // Return JSON content
  return content;
}

/**
 * Export Table
 * 
 * @param {*} content JSON content from Excel sheet.
 * @returns void
 */
async function exportTable(content) {
  // Variables
  let data = [];
  let table = [];

  // Map content data
  await content[0].data.map((value, index) => {
    // Check if value matches
    if (value[1] == className) {
      // Remove first 2 items of value array
      value.splice(0, 2);
      // Add value array to data array
      data.push(value);
    }
  });

  // Map data
  await data.map((value, index) => {
    // Add value array to table array
    table.push({
      day: getDay(index),
      lectures: groupByLecture(groupBySubject(replaceValue(value)))
    });
  });

  // Write content to JSON file
  saveJson({
    class: className,
    date: date,
    data: table
  }, "table.json");
}

/**
 * Initialize
 * 
 * @returns void
 */
async function init() {
  // Import Excel sheet as JSON
  const content = await importSheet();

  // Export table
  exportTable(content);
}

init();
