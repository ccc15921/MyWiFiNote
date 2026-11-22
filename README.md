# Wi-Fi 標準技術手冊

IEEE 802.11 各世代標準給系統設計工程師的繁體中文導讀與規格速查（學習用）。

| 頁面 | 內容 |
|---|---|
| `index.html` | 首頁：主題分頁、全站目錄、更新日誌 |
| `wifi8.html` | Wi-Fi 8（802.11bn, UHR）系統設計手冊 |
| `wifi7.html` | Wi-Fi 7（802.11be, EHT）：MLO、TWT / R-TWT、規格速查 |
| `wifi-sensing.html` | Wi-Fi Sensing（802.11bf）：導讀與規格速查 |
| `security.html` | Wi-Fi Security：WPA3-Personal（SAE）與 Enhanced Open（OWE）導讀 |
| `compare.html` | Wi-Fi 6 / 7 / 8 規格比較 |

純靜態網站，無需建置；直接開啟 `index.html` 即可。規格速查資料以 `spec-be-data.js`、`spec-bf-data.js` 載入，可在 `file://` 運作。

## 發布到 GitHub Pages

Repo → Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main` / `/ (root)`。

## 版權與免責

- 本 repo **不包含** IEEE 標準原文（PDF 或逐頁文字），請自行向 IEEE 取得授權版本。
- 頁面內容為學習輔助的整理與摘要，條文細節與數值請以 IEEE 原文為準；802.11bn 仍在 Draft 階段，內容可能隨 Draft 變動。
