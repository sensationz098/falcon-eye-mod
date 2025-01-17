# falcon eye ems mod with postgresql on 8/1/25

1. payroll, salary,
2. attendence

   - leave, paid leave,sick leave

3. birthday events, important events, create in-house events

create, user, employee, bank details, payroll

```ts
function setDateBack(empID: string, PunchDate: string) {
  if (empID === "0001") {
    const date = new Date(
      PunchDate.replace(
        /(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+):(\d+)/,
        "$2/$1/$3 $4:$5:$6",
      ),
    );

    let min = 0;

    if (min <= 5) min = 5;

    console.log(date.getMinutes, min);
    date.setMinutes(date.getMinutes() - min);

    const new_date = date.toLocaleDateString("en-IN", {
      hour12: false,
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return new_date;
  }

  return PunchDate;
}
```

# the chatgpt code with saturday, sunday, monday leave logic

```js
/**
 * Calculate the employee's salary based on attendance and leave
 * @param {Object} attendance - The attendance data of the employee
 * @param {number} basicSalary - The basic salary of the employee
 * @param {number} dailyCharge - The daily charge (calculated as basicSalary / 30)
 * @returns {number} - The final salary after deductions or additions
 */
function calculatePayroll(attendance, basicSalary, dailyCharge) {
  let finalSalary = basicSalary;

  // 1. Deduct salary if employee takes leave on Saturday or Monday
  if (attendance.saturday === "leave" || attendance.monday === "leave") {
    finalSalary -= 2 * dailyCharge; // Deduct 2 days salary
  }

  // 2. Add salary if employee works on Sunday
  if (attendance.sunday === "work") {
    finalSalary += 2 * dailyCharge; // Pay extra for working on Sunday
  }

  return finalSalary;
}

/**
 * Example Usage
 * @param {Array} employeeData - An array of employee objects with their attendance and salary details
 * @returns {Array} - A list of employee payroll calculations
 */
function generatePayroll(employeeData) {
  const payroll = [];

  employeeData.forEach((employee) => {
    const { name, basicSalary, attendance } = employee;
    const dailyCharge = basicSalary / 30;

    const finalSalary = calculatePayroll(attendance, basicSalary, dailyCharge);

    payroll.push({
      name,
      finalSalary,
    });
  });

  return payroll;
}

// Example Employee Data (for testing)
const employeeData = [
  {
    name: "John Doe",
    basicSalary: 15000,
    attendance: {
      monday: "present", // Could be 'leave' or 'present'
      saturday: "leave", // Could be 'leave' or 'present'
      sunday: "work", // Could be 'work' or 'present'
    },
  },
  {
    name: "Jane Smith",
    basicSalary: 15000,
    attendance: {
      monday: "present",
      saturday: "present",
      sunday: "present",
    },
  },
  {
    name: "Bob Johnson",
    basicSalary: 15000,
    attendance: {
      monday: "leave",
      saturday: "leave",
      sunday: "present",
    },
  },
];

// Generate Payroll
const payroll = generatePayroll(employeeData);

// Display Payroll Results
console.log(payroll);
```
