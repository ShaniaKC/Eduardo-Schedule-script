"use strict";

const scheduleFactory = (startDate) => {
  return {
    startDate,
    numOfMonths: 4,
    workShiftLength: 20,
    workers: [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }],
    endDate: function () {
      const end = this.getStartDate();
      end.setMonth(end.getMonth() + this.getMonths());
      return end;
    },
    restPeriodLength() {
      return Math.ceil(this.workShiftLength / 2);
    },
    setStartDate(date) {
      this.startDate = date;
      return this;
    },
    getStartDate() {
      return new Date(this.startDate);
    },
    setMonths(num) {
      this.numOfMonths = num;
      return this;
    },
    getMonths() {
      return Number(this.numOfMonths);
    },
    setWorkShiftLength(num) {
      this.workShiftLength = num;
      return this;
    },
    getShiftWeeks() {
      let resultArr = [];

      let startDay = this.getStartDate().getTime();
      let endDay = this.endDate().getTime();

      let numOfShiftDays = (endDay - startDay) / (1000 * 3600 * 24);

      for (let i = 0; i <= numOfShiftDays; i += this.restPeriodLength()) {
        resultArr.push(
          new Date(
            this.getStartDate().setDate(this.getStartDate().getDate() + i)
          ).toDateString()
        );
      }
      return resultArr;
    },
    result() {
      let shiftweeks = this.getShiftWeeks();
      let arr1 = [shiftweeks[0]],
        arr2 = [shiftweeks[0]],
        arr3 = [shiftweeks[1]];

      const incrementFunc = (num) => {
        let resultArr = [];

        while (num < shiftweeks.length) {
          resultArr.push(shiftweeks[num]);
          shiftweeks[num + 1] && resultArr.push(shiftweeks[num + 1]);
          num += 3;
        }
        return resultArr;
      };

      const createShiftTemplate = (arr, length = this.workShiftLength) => {
        return arr.map((shiftInstance, index) =>
          index % 2 == 0
            ? `Start work on ${shiftInstance} for ${length} days`
            : `End work on ${shiftInstance} evening`
        );
      };

      let shiftArr = [
        createShiftTemplate([...arr1, ...incrementFunc(2)]),
        createShiftTemplate([...arr2, ...incrementFunc(1)]),
        createShiftTemplate([...arr3, ...incrementFunc(3)]),
      ];
      return shiftArr;
    },
    getShift() {
      let result = this.result();

      this.workers[0].shift = result[0];
      this.workers[1].shift = result[1];
      this.workers[2].shift = result[2];

      return this.workers;
    },
  };
};

// export default scheduleFactory;
