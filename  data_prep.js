const { resolve } = require('dns');
var fs = require('fs');

var students = [];
var programbsd = [];

exports.init = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile('./students.json', (err, data) => {
            if (err) {
                reject("Failure to read file students.json!");
            }
            else {
                students = JSON.parse(data);
                resolve(students);
            }
        })

    })
}

exports.allStudents = function()
{
    return new Promise(function (resolve, reject) {
        if(students.length > 0)
        {
            resolve(students)
        }
        else{
            reject("no results returned");
        }
    })
}

exports.highGPA = function () {
    return new Promise(function (resolve, reject) {
        if (students.length > 0) {
            var temp;
            for (var i = 0; i < students.length; i++) {
                for (var j = i + 1; j < students.length; j++) { // using bubble sort algorithm
                    if (students[i].gpa > students[j].gpa) {
                        temp = students[i];
                        students[i] = students[j];
                        students[j] = temp;
                    }
                }
            }

             
            //  If more than one
            //  student has the same highest GPA, this function returns the first student with the
            //  highest GPA. 
            // function defined below


            for (var i in students) {
                if (students[students.length - 1] != students[i]) {
                    if (students[students.length - 1].gpa == students[i].gpa) {
                        if (students[students.length - 1].studId > students[i].studId)
                        {
                            highgpa = students[i];
                            resolve(students[i]);
                            break;
                        }
                    }
                }
            }

            resolve(students[students.length - 1]);
        }

        else {
            reject("no results returned");
        }
    })
}

exports.getBSD = function () {
    return new Promise(function (resolve, reject) {
        if (students.length > 0) {
            var j = 0;
            for (var i in students) {
                if (students[i].program == "BSD") {
                    programbsd[j] = students[i];
                    j++;
                }
            }
            resolve(programbsd);
        }
        else {
            reject("no results returned");
        };
    })
}