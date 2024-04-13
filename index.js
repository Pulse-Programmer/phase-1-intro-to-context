function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(nestedArr) {
  nestedArr.map((arr) => {
    return createEmployeeRecord(arr);
  });
}

function createTimeInEvent(recordObj, dateStamp) {
  recordObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.substring(11)),
    date: dateStamp.substring(0, 10),
  });

  return recordObj;
}

function createTimeOutEvent(recordObj, dateStamp) {
  recordObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.substring(11)),
    date: dateStamp.substring(0, 10),
  });

  return recordObj;
}

function hoursWorkedOnDate(recordObj, date) {
  const timeInDateMatch = recordObj.timeInEvents.find(
    (item) => item.date === date,
  );
  const timeOutDateMatch = recordObj.timeOutEvents.find(
    (item) => item.date === date,
  );
  let hoursWorked = (timeOutDateMatch.hour - timeInDateMatch.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(recordObj, date) {
  const hoursWorked = hoursWorkedOnDate(recordObj, date);

  const payOwed = hoursWorked * recordObj.payPerHour;

  return payOwed;
}

function allWagesFor(recordObj) {
  const dates = recordObj.timeInEvents.map((record) => record.date);

  let totalWage = dates.reduce(
    (total, date) => total + wagesEarnedOnDate(recordObj, date),
    0,
  );

  return totalWage;
}

function calculatePayroll(employeeRecordsArray) {
  const totalPayroll = employeeRecordsArray.reduce(
    (total, employeeRecord) => total + allWagesFor(employeeRecord),
    0,
  );
  return totalPayroll;
}

// let employee = [
//   {
//     firstName: "array[0]",
//     familyName: "array[1]",
//     title: "array[2]",
//     payPerHour: 10,
//     timeInEvents: [
//       {
//         type: "TimeIn",
//         hour: 1300,
//         date: "2024-12-10",
//       },
//     ],
//     timeOutEvents: [
//       {
//         type: "TimeOut",
//         hour: 1500,
//         date: "2024-12-10",
//       },
//     ],
//   },
// ];
