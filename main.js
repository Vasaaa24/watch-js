const translations = {
	en: {
	  language: "Language",
	  stopwatch: "Stopwatch",
	  start: "Start",
	  stop: "Stop",
	  reset: "Reset",
	  lap: "Lap",
	  laps: "Laps",
	  timer: "Timer",
	  startTimer: "Start",
	  resetTimer: "Reset",
	  hours: "Hours",
	  minutes: "Minutes",
	  seconds: "Seconds"
	},
	cs: {
	  language: "Jazyk",
	  stopwatch: "Stopky",
	  start: "Start",
	  stop: "Stop",
	  reset: "Reset",
	  lap: "Kolo",
	  laps: "Kola",
	  timer: "Časovač",
	  startTimer: "Spustit",
	  resetTimer: "Resetovat",
	  hours: "Hodiny",
	  minutes: "Minuty",
	  seconds: "Sekundy"
	},
	uk: {
	  language: "Мова",
	  stopwatch: "Секундомір",
	  start: "Старт",
	  stop: "Стоп",
	  reset: "Скинути",
	  lap: "Коло",
	  laps: "Кола",
	  timer: "Таймер",
	  startTimer: "Пуск",
	  resetTimer: "Скинути",
	  hours: "Години",
	  minutes: "Хвилини",
	  seconds: "Секунди"
	}
  };
  
  document.getElementById("language-select").addEventListener("change", function () {
	const lang = this.value;
	const t = translations[lang];
	document.getElementById("language-title").textContent = t.language;
	document.getElementById("stopwatch-title").textContent = t.stopwatch;
	document.getElementById("start").textContent = t.start;
	document.getElementById("stop").textContent = t.stop;
	document.getElementById("reset").textContent = t.reset;
	document.getElementById("lap").textContent = t.lap;
	document.getElementById("laps-title").textContent = t.laps;
	document.getElementById("timer-title").textContent = t.timer;
	document.getElementById("start-timer").textContent = t.startTimer;
	document.getElementById("reset-timer").textContent = t.resetTimer;
	document.getElementById("timer-hours").placeholder = t.hours;
	document.getElementById("timer-minutes").placeholder = t.minutes;
	document.getElementById("timer-seconds").placeholder = t.seconds;
  });
  
  document.getElementById("theme-toggle").addEventListener("click", function () {
	document.body.classList.toggle("light");
	this.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
  });
  
  // ------------------ STOPWATCH ------------------
  let startTime, interval;
  let running = false;
  let elapsedTime = 0;
  
  const timeDisplay = document.getElementById("time");
  const lapList = document.getElementById("lap-list");
  
  function updateStopwatch() {
	const now = Date.now();
	const diff = now - startTime + elapsedTime;
	const ms = Math.floor((diff % 1000) / 100);
	const sec = Math.floor((diff / 1000) % 60);
	const min = Math.floor((diff / 60000) % 60);
	const hrs = Math.floor(diff / 3600000);
	timeDisplay.textContent = `${pad(hrs)}:${pad(min)}:${pad(sec)}.${ms}`;
  }
  
  function pad(num) {
	return num.toString().padStart(2, "0");
  }
  
  document.getElementById("start").onclick = () => {
	if (!running) {
	  startTime = Date.now();
	  interval = setInterval(updateStopwatch, 100);
	  running = true;
	}
  };
  
  document.getElementById("stop").onclick = () => {
	if (running) {
	  clearInterval(interval);
	  elapsedTime += Date.now() - startTime;
	  running = false;
	}
  };
  
  document.getElementById("reset").onclick = () => {
	clearInterval(interval);
	timeDisplay.textContent = "00:00:00.0";
	lapList.innerHTML = "";
	running = false;
	elapsedTime = 0;
  };
  
  document.getElementById("lap").onclick = () => {
	if (!running) return;
	const li = document.createElement("li");
	li.textContent = timeDisplay.textContent;
	lapList.insertBefore(li, lapList.firstChild);
  };
  
  // ------------------ TIMER ------------------
  let timerInterval;
  
  document.getElementById("start-timer").onclick = () => {
	if (timerInterval) return;
  
	const hours = parseInt(document.getElementById("timer-hours").value) || 0;
	const minutes = parseInt(document.getElementById("timer-minutes").value) || 0;
	const seconds = parseInt(document.getElementById("timer-seconds").value) || 0;
	let total = hours * 3600 + minutes * 60 + seconds;
  
	if (total <= 0) return;
  
	const display = document.getElementById("timer-display");
  
	timerInterval = setInterval(() => {
	  const h = Math.floor(total / 3600);
	  const m = Math.floor((total % 3600) / 60);
	  const s = total % 60;
	  display.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
	  if (total <= 0) {
		clearInterval(timerInterval);
		timerInterval = null;
	  }
	  total--;
	}, 1000);
  };
  
  document.getElementById("reset-timer").onclick = () => {
	if (timerInterval) {
	  clearInterval(timerInterval);
	  timerInterval = null;
	}
	document.getElementById("timer-display").textContent = "00:00:00";
	document.getElementById("timer-hours").value = "";
	document.getElementById("timer-minutes").value = "";
	document.getElementById("timer-seconds").value = "";
  };
  