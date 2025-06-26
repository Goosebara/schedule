// 行程資料 - 已移除過期活動（2025年6月26日之前）
const planningData = [
  {
    title: "晚上休診",
    startDate: "2025-07-08",
    endDate: "2025-07-08",
    location: ""
  },
  {
    title: "早上加診", 
    startDate: "2025-07-23",
    endDate: "2025-07-23",
    location: ""
  },
  {
    title: "美學加減法課程",
    startDate: "2025-08-02",
    endDate: "2025-08-04",
    location: "台中微視野顯微教育中心（台中市烏日區高鐵五路156號12樓）"
  },
  {
    title: "中台灣經典植牙基礎班",
    startDate: "2025-08-17",
    endDate: "2025-08-17",
    time: "09:00-17:00",
    location: "仲信金鬱金香酒店（台中市北屯區后庄路306號）"
  },
  {
    title: "中台灣經典植牙基礎班",
    startDate: "2025-08-24",
    endDate: "2025-08-24",
    time: "09:00-17:00",
    location: "上午：謙和牙醫診所（台中市北區英才路394號）\n下午：金典酒店（台中市西區健行路1049號）"
  },
  {
    title: "中台灣經典植牙基礎班",
    startDate: "2025-08-31",
    endDate: "2025-08-31",
    time: "09:00-17:00",
    location: "仲信金鬱金香酒店（台中市北屯區后庄路306號）"
  },
  {
    title: "中台灣經典植牙基礎班",
    startDate: "2025-09-07",
    endDate: "2025-09-07",
    time: "09:00-17:00",
    location: "仲信金鬱金香酒店（台中市北屯區后庄路306號）"
  },
  {
    title: "中台灣經典植牙基礎班",
    startDate: "2025-09-14",
    endDate: "2025-09-14",
    time: "09:00-17:00",
    location: "仲信金鬱金香酒店（台中市北屯區后庄路306號）"
  },
  {
    title: "中台灣經典植牙基礎班",
    startDate: "2025-09-21",
    endDate: "2025-09-21",
    time: "09:00-17:00",
    location: "仲信金鬱金香酒店（台中市北屯區后庄路306號）"
  },
  {
    title: "中台灣經典植牙基礎班",
    startDate: "2025-09-28",
    endDate: "2025-09-28",
    time: "09:00-17:00",
    location: "仲信金鬱金香酒店（台中市北屯區后庄路306號）"
  },
  {
    title: "日本福岡九州遊",
    startDate: "2025-10-18",
    endDate: "2025-10-22",
    location: ""
  },
  {
    title: "Beyond Vision 後牙重症小宇宙 PICU",
    startDate: "2025-10-25",
    endDate: "2025-10-25",
    time: "09:00-17:00",
    location: "台中微視野顯微教育中心（台中市烏日區高鐵五路156號12樓）"
  }
];

// 當前日曆日期
let currentCalendarDate = new Date();

// 切換視圖
function switchTab(tabId) {
  // 隱藏所有內容
  document.querySelectorAll('.view-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // 重設所有標籤按鈕
  document.querySelectorAll('.planning-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // 顯示選中的內容
  document.getElementById(tabId + 'View').classList.add('active');
  
  // 激活對應的標籤按鈕
  document.querySelector(`.planning-tab[onclick*='${tabId}']`).classList.add('active');
  
  // 如果切換到日曆視圖，渲染日曆
  if (tabId === 'calendar') {
    renderCalendar();
  }
}

// 導航到上/下個月
function navigateMonth(direction) {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
  renderCalendar();
}

// 獲取當月的天數
function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// 獲取當月第一天是星期幾
function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

// 渲染日曆
function renderCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  const currentMonth = document.getElementById('currentMonth');
  
  // 更新月份顯示
  currentMonth.textContent = `${currentCalendarDate.getFullYear()}年${currentCalendarDate.getMonth() + 1}月`;
  
  calendarGrid.innerHTML = '';

  const firstDay = getFirstDayOfMonth(currentCalendarDate);
  const daysInMonth = getDaysInMonth(currentCalendarDate);

  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  weekdays.forEach(day => {
    const weekday = document.createElement('div');
    weekday.className = 'calendar-weekday';
    weekday.textContent = day;
    calendarGrid.appendChild(weekday);
  });

  // 添加空白格子（月初之前的日期）
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    calendarGrid.appendChild(emptyCell);
  }

  // 添加當月的日期
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';

    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    // 檢查是否是今天
    if (isToday(currentCalendarDate, day)) {
      dayCell.classList.add('today');
    }

    // 檢查是否有活動
    const dayEvents = getEventsForDate(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, day);
    if (dayEvents.length > 0) {
      dayCell.classList.add('has-event');
      dayEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'day-event';
        eventDiv.textContent = event.title;
        dayCell.appendChild(eventDiv);
      });
    }

    // 添加點擊事件
    dayCell.addEventListener('click', () => {
      showDayModal(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, day);
    });

    calendarGrid.appendChild(dayCell);
  }
}

// 檢查是否是今天
function isToday(date, day) {
  const today = new Date();
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === day
  );
}

// 獲取指定日期的活動
function getEventsForDate(year, month, day) {
  const targetDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
  return planningData.filter(event => {
    const startDate = event.startDate;
    const endDate = event.endDate;
    
    return targetDate >= startDate && targetDate <= endDate;
  });
}

// 顯示日期詳情彈出視窗
function showDayModal(year, month, day) {
  const modal = document.getElementById('calendarModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalEventList = document.getElementById('modalEventList');
  
  modalTitle.textContent = `${year}年${month}月${day}日`;
  
  const events = getEventsForDate(year, month, day);
  modalEventList.innerHTML = '';
  
  if (events.length === 0) {
    modalEventList.innerHTML = '<div class="no-events">今日無行程安排</div>';
  } else {
    events.forEach(event => {
      const eventItem = document.createElement('div');
      eventItem.className = 'event-item';
      
      let eventHTML = `
        <div class="event-name">${event.title}</div>
      `;
      
      if (event.time) {
        eventHTML += `
          <div class="event-time">
            <span>⏰</span>
            <span>${event.time}</span>
          </div>
        `;
      }
      
      if (event.location) {
        eventHTML += `
          <div class="event-location">
            <span class="location-icon">📍</span>
            <span class="location-text">${event.location.replace('\n', '<br>')}</span>
          </div>
        `;
      }
      
      eventItem.innerHTML = eventHTML;
      modalEventList.appendChild(eventItem);
    });
  }
  
  modal.classList.add('active');
}

// 關閉彈出視窗
function closeModal() {
  const modal = document.getElementById('calendarModal');
  modal.classList.remove('active');
}

// 返回按鈕功能
function goBack() {
  window.location.href = "https://goosebara.github.io/mrkd-life/";
}

// 點擊彈出視窗背景關閉
document.getElementById('calendarModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// 初始化
let currentDate = new Date();
document.getElementById('currentMonth').textContent = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`;
renderCalendar();

// 預設顯示列表視圖
document.getElementById('listView').classList.add('active');
document.querySelector('[onclick*="list"]').classList.add('active');
