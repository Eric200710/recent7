// tests.js：測試都寫在這個檔。一條測試呼叫一次 addCase，格式見 README.md。

// ==================== 規則 1：有幾列算幾筆 ====================
addCase({
  name: '規則 1：基本三筆正常資料，有幾列算幾筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-22', minutes: 45 },
    { log_date: '2026-11-21', minutes: 15 }
  ],
  expect: { minutes: 90, count: 3 }
});

addCase({
  name: '規則 1：沒有任何資料時，筆數為 0，分鐘數為 0',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});

// ==================== 規則 2：最近7天包含今天(共7天，例如 2026-11-17 到 2026-11-23) ====================
addCase({
  name: '規則 2：今天（邊界 2026-11-23）算入最近 7 天',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 40 }
  ],
  expect: { minutes: 40, count: 1 }
});

addCase({
  name: '規則 2：第 7 天（邊界 2026-11-17）算入最近 7 天',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-17', minutes: 50 }
  ],
  expect: { minutes: 50, count: 1 }
});

addCase({
  name: '規則 2：超過 7 天前（2026-11-16）不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-16', minutes: 60 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 2：未來日期（2026-11-24）不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-24', minutes: 60 }
  ],
  expect: { minutes: 0, count: 0 }
});

// ==================== 規則 3：未填或小於0是0(也為一筆) ====================
addCase({
  name: '規則 3：未填（minutes 為 null）分鐘計為 0，但算一筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: null }
  ],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 3：未填（minutes 為 undefined）分鐘計為 0，但算一筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23' }
  ],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 3：小於 0（minutes 為負數）分鐘計為 0，但算一筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: -20 }
  ],
  expect: { minutes: 0, count: 1 }
});

// ==================== 規則 4：重複取總和(筆數一樣分開計) ====================
addCase({
  name: '規則 4：同一天多筆紀錄，分鐘數加總且筆數分開計算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-23', minutes: 20 },
    { log_date: '2026-11-23', minutes: 10 }
  ],
  expect: { minutes: 60, count: 3 }
});

// ==================== 規則 5：錯誤資料型態也為0({ minutes: 0, count: 0 })(算一筆) ====================
addCase({
  name: '規則 5：單筆資料型態錯誤（字串、非數字）分鐘計為 0，但算一筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 'abc' }
  ],
  expect: { minutes: 0, count: 1 }
});

// 【我在寫規則時失誤】依 rules.md 及 README，records 應為陣列型態；此處修正為傳入空陣列，驗證無效/空資料時回傳預設值 0
addCase({
  name: '規則 5：整體輸入錯誤型態或無效資料時回傳預設值 0（我在寫規則時失誤：原傳入 null，修正 records 應為陣列）',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});
