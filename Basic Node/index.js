// const { error } = require("node:console");
// const fs = require("node:fs");
// //  fs = file system

// // 1. Create a file
// // fs.appendFile(path, data, callback)
// // fs.appendFile("file.txt", "Hello World", (err) => {
// //     if (err) throw err;
// //     console.log("File created successfully");
// // });
// // isuue: every time we run the code, it will append the data to the file, instead of creating a new file. To create a new file, we can use fs.writeFile() method.
// // fs.writeFile(path, data, callback)

// fs.writeFile("file.txt", "Hello World", (err) => {
//     if (err) throw err;
//     console.log("File created successfully");
// });
// // issue: when you change fileURLToPath.txt file and after that you run the file in the command line will be replaced whole file with  above given data

// //  ===================================================================================================================================

// // create a file
// // fs.mkdir("path",cb fnc)
// fs.mkdir("pages", (err) => {
//     if (err) throw err;
//     console.log("Folder created successfully");
// });

// create a nested folder
// fs.mkdir(path,{options},cb fnc)
// fs.mkdir("CSS/Home/Style",{recursive: true}, (err) => {
//     if (err) throw err;
//     console.log("Nested folder created successfully");
// });

// ============================================================================================================
// read a file
// fs.readFile(path,fnc(e,data){})
// fs.readFile("file.txt", "utf8", (e, data) => {
//   if (e) throw error;
//   console.log(data);
// });

// read a folder
// fs.readdir(path,fnc(e,data){})
// fs.readdir("CSS/Home/Style", (e, data) => {
//   if (e) throw error;
//   console.log(data);
// });
// as a response we will get an array of file names in the folder. In this case, we will get ["style.css"] as a response.

// =============================================================================================================================
// copy a file
// fs.copyFile('path with file name', 'path with file name',cb fnc)
// fs.copyFile("file.txt", "CSS/Home/Style/copy.txt", (e) => {
//     if (e) throw error;
//     console.log("File copied successfully");
// });

// =============================================================================================================================

// rename a file
// fs.rename('old'(existing file name), 'new'(new file name), cb fnc)
// fs.rename("file.txt", "newFile.txt", (e) => {
//   if (e) throw error;
//   console.log("File renamed successfully");
// });

// nest file rename and move
// fs.rename("newFile.txt", "CSS/Home/Style/newFile.txt", (e) => {
//   if (e) throw error;
//   console.log("File renamed successfully");
// });


// delete a file
// fs.unlink(path,cb fnc)
// fs.unlink("CSS/Home/Style/newFile.txt", (e) => {
//   if (e) throw error;
//   console.log("File deleted successfully");
// });
// fs.rm("CSS/Home/Style/copy.txt", (e) => {
//   if (e) throw error;
//   console.log("File deleted successfully");
// });

// delete a folder
// fs.rmdir('pages',{recursive: true, force:true}, (e) => {
//   if (e) throw error;
//   console.log("Folder deleted successfully");
// });

// fs.rm("index.js", (e) => {
//   if (e) throw error;
//   console.log("File deleted successfully");
// });

import chalk from"chalk";
console.log(chalk.blue("Hello World"));
console.log(chalk.bgBlueBright.bgCyan("Write a chalk message"));
console.log(chalk.bgGreen.black.bold("Write a green chalk message"));
