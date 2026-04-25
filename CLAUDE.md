# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 文件撰寫規則

請用中文撰寫相關文件，回應都請使用中文。

## 常用指令

```bash
npm run dev       # 啟動開發伺服器（port 8080）
npm run build     # TypeScript 編譯 + Vite 打包
npm run preview   # 預覽打包結果（port 8080）
npm test          # 執行所有單元測試
```

執行單一測試檔案：

```bash
npx jest src/test/encodeHandler.test.ts
```

## 專案架構

這是一個文字編碼器 Web App，使用 React + TypeScript + Vite 建置，部署在 Vercel。

### 路徑別名（vite.config.ts 與 jest.config.js 同步設定）

| 別名 | 實際路徑 |
|------|----------|
| `@/Component` | `src/resources/components/` |
| `@/Function` | `src/resources/ts/` |
| `@/Interface` | `src/resources/interface/` |
| `@/Test` | `src/test/` |

### 核心加密演算法

加密流程分兩階段，定義在 `src/resources/ts/`：

1. **凱薩密碼階段**（`encodeHandler.ts` / `decodeHandler.ts`）
   - 每個字元轉為 5 位數 unicode（補 0 對齊）
   - 從 `parameter.json` 的質數表（10 個質數）隨機取得公用常數索引（0–9）
   - 偏移量公式：`prime[公用常數索引] * prime[字元索引 % 10]`，逐位做凱薩位移
   - 公用常數索引附加於密文末尾作為密鑰

2. **替換式密碼階段**（`encodeSubstitutionCipher.ts` / `decodeSubstitutionCipher.ts`）
   - 從 `parameter.json` 的 62 張替換表（a–z、A–Z、0–9 各一張）中隨機選取
   - 將數字密文以每 2 個字元為單位依替換表轉換
   - 替換表代號附加於密文末尾作為第二把密鑰

### 資料層

`src/resources/data/parameter.json` 包含：
- `prime`：10 個質數常數表，用於凱薩密碼偏移量計算
- `alphabet`：52 個英文字母（A–Z、a–z），用於生成替換表關鍵字
- `table`：62 個替換表，每張含 52 個兩位數字串

`setDefaultConfig.ts` 負責初始化 `IConfigParam`，包含從 `alphabet` 與 `table` 計算出的 `tableKeyword`（替換表代號清單）。

### 元件結構

`app.tsx` 為根元件，管理所有狀態：
- `encodeSelected`：切換編碼／解碼模式
- `textInput` / `textOutput`：輸入輸出文字
- `parameter`：加密參數設定（從 `parameter.json` 初始化）
- `loading`：處理中狀態

`computedCode()` 是加密邏輯入口，依 `encodeSelected` 決定呼叫編碼或解碼流程。

### 測試

每個 `src/resources/ts/` 的函式在 `src/test/` 都有對應的單元測試。`src/test/_configParam.ts` 提供測試共用的參數設定。

`encodeHandler` 和 `decodeHandler` 接受可選的 `testPublicConst` 參數，讓測試可固定亂數值進行驗證。
