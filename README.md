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
