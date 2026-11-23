// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。

function recent7(records, today) {
  const todayDate = new Date(today);
  const sevenDaysAgo = new Date(todayDate);
  sevenDaysAgo.setDate(todayDate.getDate() - 6);

  let minutes = 0;
  let count = 0;

  for (const record of records) {
    const recordDate = new Date(record.log_date);
    if (recordDate >= sevenDaysAgo && recordDate <= todayDate) {
      if (typeof record.minutes === 'number') {
        minutes += record.minutes;
      }
      count++;
    }
  }

  return { minutes, count };
}
