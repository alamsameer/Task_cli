### fs.existsSync()
The fs.existsSync() method is used to synchronously check if a file already exists in the given path or not. It returns a boolean value which indicates the presence of a file.

Syntax:
```
fs.existsSync( path )
```
Return Value: It returns a boolean value i.e true if the file exists otherwise returns false.

### fs.createWriteStream

The createWriteStream() method is an inbuilt application programming interface of fs module which allows to quickly make a writable stream for the purpose of writing data to a file. This method may be a smarter option compared to methods like fs.writeFile when it comes to very large amounts of data.

Syntax:

fs.createReadStream( path, options )
Parameters: This method accept two parameters as mentioned above and described below:

path: This parameter holds the path of the file where to read the file. It can be String, Buffer or URL.
options: It is an optional parameter that holds string or object.
Return Value: This method returns the fs.ReadStream object.

### fs.writefile

