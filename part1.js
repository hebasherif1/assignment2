
const path = require("path");
const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");
const zlib = require("zlib");
const { pipeline } = require("stream");


// 1.Write a function that logs the current file path and directory.
// Output Example: {File: “/home/user/project/index.js”, Dir: “/home/user/project”}
function logCurrentFilePathAndDirectory() {
    const filePath = __filename;
    const dirPath = __dirname;
    console.log({ File: filePath, Dir: dirPath });
}

//2. Write a function that takes a file path and returns its file name.
//• Input Example: /user/files/report.pdf
//• Output Example:"report.pdf "
function getFileName(filePath) {
    return path.basename(filePath);
}

//3. Write a function that builds a path from an object 
//• Input Example:{ dir:"/folder", name:"app", ext:".js"}
//• Output Example: “/folder/app.js”
function buildPath({ dir, name, ext }) {
    return path.join(dir, name + ext);
}


//4. Write a function that returns the file extension from a given file path.
//• Input Example: /docs/readme.md"
//• Output Example: “.md”
function getFileExtension(filePath) {
    return path.extname(filePath);
}


//5. Write a function that parses a given path and returns its name and ext.
//• Input Example: /home/app/main.js
//• Output Example:{Name: “main”, Ext:“.js”}
function getNameAndExt(filePath) {
    const result = path.parse(filePath);
    return {Name: result.name,Ext: result.ext};
}


//6. Write a function that checks whether a given path is absolute.
//• Input Example: /home/user/file.txt
//• Output Example: true
function isAbsolutePath(filePath) {
    return path.isAbsolute(filePath);
}


//7. Write a function that joins multiple segments 
//• Input:"src","components", "App.js"
//• Output Example: src/components/App.js
function joinPath(...segments) {
    return path.join(...segments);
}


//8. Write a function that resolves a relative path to an absolute one.
//• Input Example: ./index.js
//• Output Example: /home/user/project/src/index.js
function resolveAbsolutePath(relativePath) {
    return path.resolve(relativePath);
}


//9. Write a function that joins two paths.
//• Input Example: /folder1, folder2/file.txt
//• Output Example: /folder1/folder2/file.txt
function joinTwoPaths(path1, path2) {
    return path.join(path1, path2);
}


//10. Write a function that deletes a file asynchronously.
//• Input Example: /path/to/file.txt
//• Output Example: The file.txt is deleted.
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`${filePath.split("/").pop()} is deleted.`);
    });
}


//11. Write a function that creates a folder synchronously.
//• Output Example: “Success”
function createFolder(folderPath) {
    fs.mkdirSync(folderPath);
    console.log("Folder created successfully.");
}


//12. Create an event emitter that listens for a "start" event and logs a welcome message.
//• Output Example: Welcome event triggered!
emitter.on("start", () => {
    console.log("Welcome event triggered!");
});
emitter.emit("start");

//13. Emit a custom "login" event with a username parameter.
//• Input Example: "Ahmed"
//• Output Example:“User logged in: Ahmed”
emitter.on("login", (username) => {
    console.log(`User logged in: ${username}`);
});
emitter.emit("login", "Ahmed");


//14. Read a file synchronously and log its contents.
//• Input Example: "./notes.txt"
//• Output Example: the file content => “This is a note.”
function readFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    console.log(content);
}


//15. Write asynchronously to a file.
//• Input: path: "./async.txt", content: "Async save"
function writeFileAsync(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("File written asynchronously.");
    });
}



//16. Check if a directory exists. 
//• Input Example: "./notes.txt"
//• Output Example: true
function checkDirectoryExists(dirPath) {
    return fs.existsSync(dirPath);
}


//17. Write a function that returns the OS platform and CPU architecture. 
//• Output Example: {Platform: “win32”, Arch: “x64”}
function getOSInfo() {
    return {
        Platform: os.platform(),
        Arch: os.arch()
    };
}


//18. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
//• Input Example: "./big.txt"
//• Output Example: log each chunk
function readFileInChunks(filePath) {
    const readableStream = fs.createReadStream(filePath, { encoding: "utf-8" });
    readableStream.on("data", (chunk) => {
        console.log(chunk);
    });
}


//19. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
//• Input Example: "./source.txt", "./dest.txt"
//• Output Example: File copied using streams
function copyFileUsingStreams(sourcePath, destPath) {
    const readableStream = fs.createReadStream(sourcePath);
    const writableStream = fs.createWriteStream(destPath);

    readableStream.pipe(writableStream);

    writableStream.on("finish", () => {
        console.log("File copied using streams");
    });
}


//20. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
//• Input Example: "./data.txt", "./data.txt.gz"
function compressFile(source, destination) {
    const readableStream = fs.createReadStream(source);
    const gzip = zlib.createGzip();
    const writableStream = fs.createWriteStream(destination);

    pipeline(
        readableStream,
        gzip,
        writableStream,
        (err) => {
            if (err) {
                console.log(err.message);
                return;
            }

            console.log("File compressed successfully");
        }
    );
}

