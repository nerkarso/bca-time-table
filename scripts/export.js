const xlsx = require("node-xlsx").default;
const fs = require("fs");

// Global variables
const DATA_DIR = "./data";
const SHEET_PATH = DATA_DIR + "/sheet.xlsx";
const DB = require("." + DATA_DIR + "/db.json");

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
  const dir = DATA_DIR;

  // Check if directory exists
  if (!fs.existsSync(dir)) {
    // Create output folder
    fs.mkdirSync(dir);
  }

  // Write to a JSON file
  fs.writeFile(`${dir}/${filename}`, JSON.stringify(content, null, 2), (error) => {
    console.log(`Exported to ${dir}/${filename}`);
  });
}

/**
 * Get Day by index
 * 
 * @param {*} index 
 * @returns {string} name of the day.
 */
function getDay(index) {
  return DB.weekdays[index];
}

/**
 * Get Time by index
 * 
 * @param {integer} index 
 * @returns {string} lecture time duration.
 */
function getTime(index) {
  return DB.time[index];
}

/**
 * Replace Value
 * 
 * @returns 
 */
function replaceValue(arr) {
  // Map array
  arr.map((value, index) => {
    // Iterate through database
    for (let i = 0; i < DB.dictionary.length; i++) {
      // Check if value matches DB
      if (value.toLowerCase() == DB.dictionary[i][0].toLowerCase()) {
        // Replace value
        arr[index] = DB.dictionary[i][1];
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
  const content = xlsx.parse(SHEET_PATH);

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
    if (value[1] == DB.class) {
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
    class: DB.class,
    date: DB.date,
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
