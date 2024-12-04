
// テキスト形式のCSVデータをオブジェクト形式に変換する関数
function parseCSV(csvText) {
  const rows = csvText.split('\n');
  const headers = rows.shift().split(',').map(header => header.trim()); // ヘッダー行を取得

  const data = [];
  rows.forEach(row => {
    const cols = row.split(',');
    if (cols.length === headers.length) {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = parseFloat(cols[index].trim());
      });
      data.push(obj);
    }
  });
  return data;
}

// データを0〜1の範囲に正規化する関数
function normalizeData(data) {
  const minMax = calculateMinMax(data);

  // 正規化
  return data.map(point => ({
    x: (point.x - minMax.min.x) / (minMax.max.x - minMax.min.x),
    y: (point.y - minMax.min.y) / (minMax.max.y - minMax.min.y),
    z: (point.z - minMax.min.z) / (minMax.max.z - minMax.min.z)
  }));
}

// データの最小値と最大値を計算する関数
function calculateMinMax(data) {
  let min = { x: Infinity, y: Infinity, z: Infinity };
  let max = { x: -Infinity, y: -Infinity, z: -Infinity };

  data.forEach(point => {
    min.x = Math.min(min.x, point.x);
    min.y = Math.min(min.y, point.y);
    min.z = Math.min(min.z, point.z);

    max.x = Math.max(max.x, point.x);
    max.y = Math.max(max.y, point.y);
    max.z = Math.max(max.z, point.z);
  });

  return { min, max };
}

export {parseCSV, normalizeData, calculateMinMax };
