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
      this.startDate = new Date(
        new Date(date).toLocaleString("en-US", { timeZone: "America/Lima" })
      );
      return this;
    },
    getStartDate() {
      return new Date(new Date(this.startDate).toISOString());
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
          )
        );
      }
      return resultArr;
    },
    result() {
      let shiftweeks = this.getShiftWeeks();
      let arr1 = [shiftweeks[0].toDateString()],
        arr2 = [shiftweeks[0].toDateString()],
        arr3 = [shiftweeks[1].toDateString()];

      const incrementFunc = (num) => {
        let resultArr = [];

        while (num < shiftweeks.length) {
          resultArr.push(
            new Date(
              shiftweeks[num].setDate(shiftweeks[num].getDate())
            ).toDateString()
          );
          shiftweeks[num + 1] &&
            resultArr.push(
              new Date(
                shiftweeks[num + 1].setDate(shiftweeks[num + 1].getDate())
              ).toDateString()
            );
          num += 3;
        }
        return resultArr;
      };

      const createShiftTemplate = (arr, length = this.workShiftLength) => {
        return arr.map((shiftInstance, index) => {
          let newLength =
            (new Date(arr[index + 1]).getTime() -
              new Date(shiftInstance).getTime()) /
              (1000 * 3600 * 24) +
            1;

          return index % 2 == 0
            ? `Start work on ${shiftInstance} for ${
                arr[index + 1] ? newLength : length
              } days`
            : `End work on ${shiftInstance} evening`;
        });
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
