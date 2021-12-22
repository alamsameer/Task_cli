// Requiring module
const fs = require("fs");

// Accessing arguments #process argv gives the the location of
//  node module and the javascript file it return the array
const args = process.argv;
//  accessing current working directory and slice to know the direetory except the working file
const currentWorkingDirectory = args[1].slice(0, -7);
// console.log(args);
console.log(currentWorkingDirectory);

//  checking if the file exist or not then it create it

if (fs.existsSync(currentWorkingDirectory + "todo.txt") === false) {
  let createStream = fs.createWriteStream("todo.txt");
  createStream.end();
}

if (fs.existsSync(currentWorkingDirectory + "done.txt") === false) {
  let createStream = fs.createWriteStream("done.txt");
  createStream.end();
}

const helper = () => {
  const UsageText = `
    Usage :-
    $ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
    $ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
    $ ./task del INDEX            # Delete the incomplete item with the given index
    $ ./task done INDEX           # Mark the incomplete item with the given index as complete
    $ ./task help                 # Show usage
    $ ./task report               # Statistics`;

  console.log(UsageText);
};

function listTodos() {
  let Data = [];
  // Read from todo.txt and convert it
  // into a string
  const Todos = fs
    .readFileSync(currentWorkingDirectory + "todo.txt")
    .toString();
  Data = Todos.split('\n');
  // console.log(Data[0].length);
  //  filter the empty dat got from the todo.txt
  console.log(Data);
  let filteredTodos = Data.filter((value) => {
    value=value.trim()
    return value.length !== 0;
  });
  // console.log(filteredTodos);
  let filteredTodosObj=filteredTodos.map((task)=>{
    return {task:task,
      priority:+task[task.length-2]
    }
  })
  // console.log(filteredTodosObj);
   let todoPriorityList=filteredTodosObj.sort((a,b)=>{return a.priority-b.priority})
  //  console.log(todoPriorityList);
  //   checking th length of  the todos
  if (filteredTodos.length === 0) {
    console.log("There is no pending Task");
  }
  for (let i = 0; i < todoPriorityList.length; i++) {
    console.log(i+1+' '+todoPriorityList[i].task);
  }
}
function addTodos() {
  //   this will contain if any command is passed or not
  const newPriorty = args[3];
  const newTask=args[4]
  // console.log(newPriorty);
  // check for the command
  if (newPriorty&&newTask) {
    //   creating a empty data
    let data=[];
    // read the data from todos.txt
    // convert it is string
    const Todos = fs
      .readFileSync(currentWorkingDirectory + "todo.txt")
      .toString();
      data=Todos.split('\n').filter((val)=>{
        val.trim() 
        return val.length !== 0}).join('\n')
        console.log(data);
    // adding a new task to the  perivios dat we  got from the todo .txt
    fs.writeFile(
      currentWorkingDirectory + "todo.txt",
      data + "\n" + newTask +' '+'['+newPriorty+']',
      function (err) {
        if (err) throw err;
        console.log('Added Task: "' + newTask +' '+'with priority'+' '+newPriorty);
      }
    );
  } else {
    console.log("Error:Missing todo string . Nothind added");
  }
}
function deleteTodos() {
  const deleteIndex = args[3];
  if (deleteIndex) {
    let Data = [];
    const todosList = fs
      .readFileSync(currentWorkingDirectory + "todo.txt")
      .toString();
      console.log(todosList);
    Data = todosList.split('\n');
    console.log(Data);
    let filteredTodos = Data.filter((value) => {
      value=value.trimEnd()
      return value.length !== 0;
    });
    console.log(filteredTodos.length);
    if (deleteIndex > filteredTodos.length || deleteIndex < 0) {
      console.log(`Error:todo# ${deleteIndex} does not exist .Nothing deleted`);
    } else {
      // remove task
    let k=  filteredTodos.splice(deleteIndex, 1);
    console.log(k);
      //  joinging the task
      const newTodo = filteredTodos.join('\n');
      // console.log(newTodo);
      // writing phir se taaki wo ja ke add ho jaaye
      fs.writeFile(
        currentWorkingDirectory + "todo.txt",
        newTodo,
        function (err) {
          if (err) throw err;
          // Logs the deleted index
          console.log("Deleted todo #" + deleteIndex);
        }
      );
    }
  }
   else {
    console.log("Error:Missing Number for  deleting todo");
  }
}

function doneTodos() {
  // Store the index passed as argument
  const doneIndex = args[3];
  if (doneIndex) {
    let data = [];
    //  reading from todo.txt
    const todosList = fs
      .readFileSync(currentWorkingDirectory + "todo.txt")
      .toString();
    // reading from done.txt
    const doneTodosList = fs
      .readFileSync(currentWorkingDirectory + "done.txt")
      .toString();
    data = todosList.split("\n");
    let filteredTodos = data.filter((value) => {
      return value != "";
    });
    if (doneIndex > filteredTodos.length || doneIndex < 0) {
      console.log("Error: todo #" + doneIndex + " does not exist.");
    } else {
      //  delete from todo and strore in done.txt
      const deletedTodo = filteredTodos.splice(doneIndex, 1);
      const newData = filteredTodos.join("\n");

      //  wriing back to todo.txt after removing completed one
      fs.writeFile(
        currentWorkingDirectory + "todo.txt",
        newData,
        function (err) {
          if (err) throw err;
        }
      );
      //  writinf to done.txt
      fs.writeFile(
        currentWorkingDirectory + "done.txt",
        deletedTodo + doneTodosList,
        function (err) {
          if (err) throw err;
          console.log("Marked todo #" + doneIndex + " as done.");
        }
      );
    }
  } else {
    // If argument was not passed
    console.log("Error: Missing NUMBER for" + " marking todo as done.");
  }
}

function reportTodos() {
  let todoData = [];
  let doneTodo = [];
  // Read data from both the files
  const todo = fs.readFileSync(currentWorkingDirectory + "todo.txt").toString();
  const done = fs.readFileSync(currentWorkingDirectory + "done.txt").toString();

  // Split the data from both files
  todoData = todo.split('\n');

  doneTodo = done.split('\n');

  let filterTodoData=todoData.filter((value)=>{
    value=value.trimEnd()
    return value.length !== 0;
  })
  let filterTodoDataObj=filterTodoData.map((task)=>{
    return {task:task,
      priority:+task[task.length-2]
    }
  })
  let todoDataPriorityList=filterTodoDataObj.sort((a,b)=>{return a.priority-b.priority})
   
  
  let filterDoneData=doneTodo.filter((value)=>{
    value=value.trimEnd()
    return value.length !== 0;
  })
  let filterDoneDataObj=filterDoneData.map((task)=>{
    return {task:task,
      priority:+task[task.length-2]
    }
  })
  let todoDoneDataPriorityList=filterDoneDataObj.sort((a,b)=>{return a.priority-b.priority})
   
  //  displaying pending task from todo.txt
  console.log('pending:'+filterTodoData.length);
  todoDataPriorityList.forEach((val)=>{
    console.log(val.task);
  })
  
  console.log(`completed:${filterDoneData.length}`);
  todoDoneDataPriorityList.forEach((val)=>{
    console.log(val.task);
  })
}

switch(args[2]){
  case 'add':{
    addTodos();
    break;
  }
  case 'ls':{
    listTodos();
    break;
  }
  case 'del':{
    deleteTodos();
    break;
  }
  case 'done':{
    doneTodos();
    break;
  }
  case 'report':{
    reportTodos();
    break;
  }
  default:{
    helper();
  }
}