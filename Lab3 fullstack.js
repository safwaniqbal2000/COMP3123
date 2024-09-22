let http = require("http");
let employees = require("./Employee.js")
console.log("Lab 03 -  NodeJs");


//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== "GET") {
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end("<h1>Welcome to lab exercise 3</h1>")
        }

        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            console.log(JSON.stringify(employees))
            res.end(JSON.stringify(employees))
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            const sortedEmployees = employees.sort((a, b) => {
                if (a.firstName < b.firstName) return -1;
                if (a.firstName > b.firstName) return 1;
                return 0;
            });
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.end(JSON.stringify(sortedEmployees.map((employee) => {
                return (employee.firstName + employee.lastName)
            })))


        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format
            //e.g. { "total_salary" : 100 }
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.end(JSON.stringify(employees.reduce((employee, currentValue, accumulator) => {
                return accumulator += currentValue.Salary
            })))
        }
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})