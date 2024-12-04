
// テキスト形式のCSVデータをオブジェクト形式に変換する関数
function parseCSV(csvText) {
  const rows = csvText.split('\n'); // 行ごとに分割
  const data = [];

  // ヘッダー行を除く（最初の行をスキップ）
  rows.slice(1).forEach(row => {
    const cols = row.split(',');

    // 少なくとも3列あり、数値が含まれている場合に処理
    if (cols.length >= 3) {
      const x = parseFloat(cols[0].trim());
      const y = parseFloat(cols[1].trim());
      const z = parseFloat(cols[2].trim());

      // x, y, z のいずれかが無効な値であればスキップ
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        data.push({ x, y, z });
      }
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
