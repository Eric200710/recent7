// recent7.js：照 rules.md 寫的版本
// 輸入：records＝一串紀錄，每筆像 { log_date: '2026-11-23', minutes: 30 }（minutes 可能是 null）
//       today＝今天的日期，例如 '2026-11-23'
// 輸出：{ minutes: 總共幾分鐘, count: 幾筆 }
// 格式說明在 README.md；要怎麼算看 rules.md。

function recent7(records, today) {
  // 校正整體傳入型態：若 records 為 null/undefined 或非陣列，校正為空陣列
  if (!records || !Array.isArray(records)) {
    records = [];
  }

  // 校正 today 參數：若非字串或格式不對，直接回傳預設值
  if (!today || typeof today !== 'string') {
    return { minutes: 0, count: 0 };
  }

  // 計算 7 天的範圍：today 以及往前推 6 天（共 7 天）
  var parts = today.split('-');
  if (parts.length !== 3) {
    return { minutes: 0, count: 0 };
  }

  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1;
  var day = parseInt(parts[2], 10);

  var endDate = new Date(year, month, day);
  var startDate = new Date(year, month, day);
  startDate.setDate(startDate.getDate() - 6);

  function formatDate(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var dt = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + dt;
  }

  var minDateStr = formatDate(startDate);
  var maxDateStr = formatDate(endDate);

  var totalMinutes = 0;
  var totalCount = 0;

  for (var i = 0; i < records.length; i++) {
    var item = records[i];
    // 若陣列內的元素型態不正確（非物件或為 null），跳過不處理
    if (!item || typeof item !== 'object') {
      continue;
    }

    var logDate = item.log_date;
    // 判斷是否在最近 7 天內（含今天）
    if (typeof logDate === 'string' && logDate >= minDateStr && logDate <= maxDateStr) {
      totalCount++;

      var mins = item.minutes;
      // 規則 3、5：未填、小於 0、或資料型態錯誤（非有效正整數/數字）一律校正計為 0
      if (typeof mins === 'number' && !isNaN(mins) && mins > 0) {
        totalMinutes += mins;
      }
    }
  }

  return { minutes: totalMinutes, count: totalCount };
}
