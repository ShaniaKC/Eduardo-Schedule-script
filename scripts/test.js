const dateInput = document.querySelector("#date-input");
const monthsInput = document.querySelector("#months-input");
const shiftInput = document.querySelector("#shift-input");
const workerNames = Array.from(document.querySelectorAll(".worker-name"));
const workerSchedules = Array.from(
  document.querySelectorAll(".worker-schedule")
);
const schedule = scheduleFactory(null);

const init = () => {
  showWorkersNames();

  monthsInput.value = schedule.numOfMonths;
  shiftInput.value = schedule.workShiftLength;

  monthsInput.addEventListener("change", (e) => {
    schedule.setMonths(e.target.value);
    updateWorkersSchedule();
  });

  shiftInput.addEventListener("change", (e) => {
    
    e.target.value =
      e.target.value % 2 == 0
        ? e.target.value
        : e.target.value > 2
        ? e.target.value - 1
        : 2;
    schedule.setWorkShiftLength(e.target.value);
    console.log(schedule.getMonths());
    updateWorkersSchedule();
  });

  dateInput.addEventListener("focus", function () {
    this.type = "date";
  });

  dateInput.addEventListener("change", (e) => {
    schedule.setStartDate(e.target.value);
    updateWorkersSchedule();
  });
};

const updateWorkersSchedule = () => {
  workerSchedules.map((item, index) => {
    let scheduleParagraphs = schedule
      .getShift()
      [index]?.shift?.map((shift) => `<p class="schedule-para">${shift}</p>`);

    item.innerHTML = scheduleParagraphs.join("");
  });
};

const showWorkersNames = () => {
  workerNames.map(
    (item, index) => (item.innerHTML = schedule.workers[index].name)
  );
};

init();
