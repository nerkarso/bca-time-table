const fs = require("fs");
const path = require("path");

// Variables
const source = "./build/";
const destination = "D:/www/apps/pcte-time-table/";

/**
 * Delete Files
 * 
 * @param {*} directory 
 */
function deleteFiles(directory) {
  // Read directory
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
        console.log("Delete", file);
      });
    }
  });
}

/**
 * Copy Files
 * 
 * @param {*} source 
 * @param {*} destination 
 */
function copyFiles(source, destination) {
  // Read directory
  fs.readdir(source, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.copyFile(path.join(source, file), path.join(destination, file), (err) => {
        if (err) throw err;
        console.log("Copy", file);
      });
    }
  });
}

/**
 * Initialize
 */
async function init() {
  await deleteFiles(destination);
  copyFiles(source, destination);
}

init();
