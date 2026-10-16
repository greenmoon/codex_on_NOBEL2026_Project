# DEM — Dynamic Explanation Demo Specification

Version: V05  
Updated: 2026-10-10 17:59  
Project: NOBEL2026

## Command / 指令

`dem` means **Dynamic Explanation Demo**.

`dem` 代表「動態原理解說 Demo」。呼叫此縮寫時，應為當前主題建立或改良雙語互動模型，並進行手機實測。

## Purpose / 目的

- Explain a mechanism through motion, geometry, and cause-and-effect rather than decoration.
- 用運動、空間關係與因果回饋解釋原理，不只做裝飾動畫。
- Keep the first view useful before the user changes any control.
- 預設畫面本身就必須能說明核心概念。
- Start meaningful animation immediately when the HTML first opens; do not require a first tap.
- HTML 首次開啟時，有意義的動畫必須立即自動播放，不需先點擊。

## Choose 2D or 3D / 選擇 2D 或 3D

| Mode | Use when | 適用情境 |
|---|---|---|
| 2D | The key idea is an angle, threshold, waveform, timeline, or causal relationship. | 核心是角度、門檻、波形、時間或因果關係。 |
| 3D | Spatial position, direction, volume, field, or detector geometry materially affects understanding. | 空間位置、方向、體積、場或偵測器幾何會影響理解。 |
| Both | Switching views reveals two different but connected aspects without duplicating controls. | 切換視圖能說明互補面向，而不是重複內容。 |

## Same-frame inspection design / 同框檢查設計

`dem` should make cause and effect checkable without making the reader remember a value from another screen. On a desktop or landscape viewport, the selected dynamic model, its essential curve or plot, the controlling sliders, and the primary live result should be visible in the same frame whenever practical.

`dem` 應讓讀者不必記住另一個畫面的數值，就能直接核對因果。在桌面或橫向螢幕上，只要空間允許，所選的動態模型、必要曲線或圖表、控制滑桿及主要即時結果必須在同一畫面中可見。

### Desktop layout / 桌面配置

Use a two-column inspection frame:

| Area | Content | Rule / 規則 |
|---|---|---|
| Left / 左側 | Dynamic 2D/3D model plus the curve, plot, trajectory, field, or composition bar that explains the mechanism. / 動態 2D/3D 模型，以及解釋機制所需的曲線、圖表、軌跡、場或比例條。 | The visual must update immediately while a slider moves. / 滑桿移動時必須立即更新。 |
| Right / 右側 | Essential sliders, presets, units, and current values. / 必要滑桿、快速預設、單位與目前值。 | Keep the primary 3–5 controls visible; place secondary controls below or in an advanced group. / 優先讓主要 3–5 個控制項可見，次要控制置於下方或進階群組。 |
| Shared result / 共用結果 | Primary numeric result, state label, threshold, or direction. / 主要數值、狀態、門檻或方向。 | Place it inside or immediately beside the visual so the input → output relation is readable at a glance. / 放在視覺內或緊鄰視覺，讓輸入→輸出可一眼核對。 |

The first inspection frame should target a common 1440 × 900 desktop viewport. Avoid putting the plot on one tab and its controls on another. Switching topic or model views is acceptable, but every selected view must keep its own essential visual, controls, and live result together.

首個同框畫面以常見的 1440 × 900 桌面視窗為目標。不要把圖表與其控制項拆到不同分頁；可以切換不同主題或模型視圖，但每個被選取的視圖都必須把自己的主要視覺、控制與即時結果放在一起。

### Shared implementation for all six awards / 六獎項共用實作

All six current award demos use the same inspection shell:

- Desktop: the active stage occupies the upper-left cell, the primary live metric strip sits directly below it, and the control panel stays in the right column across both rows. The control panel may scroll internally only when its secondary controls exceed the `640 px` inspection height.
- Multi-view demos: Physics places its threshold result immediately below the Cherenkov/IceCube view; Chemistry places its current D/L, R/S, or optical-rotation interpretation immediately below the active view. Detailed metric cards remain secondary.
- Mobile: use the order `view selector → visual → primary live result → controls → secondary metrics → IPO explanation`.
- Cache safety: award HTML pages append a version query to the shared layout stylesheet so a reopened iPhone page receives the current inspection layout instead of a stale cached copy.

目前六個獎項 Demo 統一採用同一套檢查框架：

- 桌面：作用中的模型位於左上，主要即時結果緊接在左下，控制面板則跨越右側兩列；只有次要控制超過 `640 px` 檢查高度時，控制面板才在內部捲動。
- 多視圖 Demo：物理把門檻結果緊接在 Cherenkov／IceCube 視圖下方；化學把目前 D/L、R/S 或旋光判讀緊接在作用中視圖下方，詳細指標卡保持次要順位。
- 手機：依 `視圖選擇 → 視覺 → 主要即時結果 → 控制 → 次要指標 → IPO 解說` 排列。
- 快取安全：各獎項 HTML 會在共用配置樣式表後加版本查詢值，避免 iPhone 再次開啟時仍讀到舊版排版。

### Mobile adaptation / 手機調整

At 390 px and 320 px widths, do not squeeze the model and controls into unreadable side-by-side columns. Stack them in this order:

1. Dynamic model and essential curve / 動態模型與必要曲線
2. Primary live result / 主要即時結果
3. Essential sliders and presets / 必要滑桿與快速預設
4. Detailed explanation and secondary outputs / 詳細解說與次要輸出

Keep the stage and controls adjacent, preserve identical colors and units, and avoid unrelated content between them. A reader should be able to change a control and see its effect with one short scroll or less.

手機寬度不可為了強行同欄而壓縮至難以閱讀。模型與控制必須緊鄰、使用相同顏色與單位，中間不得插入無關內容；讀者調整控制後，應在一次短距離捲動內看到效果。

### Same-frame verification / 同框驗證

- [ ] At 1440 × 900, the active visual, essential curve or plot, primary sliders, and live result appear together without changing tabs.
- [ ] 在 1440 × 900 下，作用中的視覺、必要曲線／圖表、主要滑桿與即時結果無須切換分頁即可同時看到。
- [ ] Moving each primary slider visibly changes the model or plot and the matching live value in the same frame.
- [ ] 移動每個主要滑桿時，同框內的模型或圖表及對應數值會同步變化。
- [ ] Visual marks, slider accents, legends, and output labels use consistent color mapping.
- [ ] 視覺標記、滑桿色、圖例與輸出標籤使用一致的顏色對應。
- [ ] At 390 px and 320 px, the stacked stage and controls remain adjacent, legible, and free of horizontal overflow.
- [ ] 在 390 px 與 320 px 下，堆疊後的模型與控制仍相鄰、清楚，且沒有水平溢出。

## First-open autoplay / 首次開啟自動播放

Every animated `dem` starts running as soon as its HTML and JavaScript initialize. The visitor must see motion without pressing Play, and the initial motion button must read `Pause 暫停`.

每個含動畫的 `dem` 在 HTML 與 JavaScript 初始化完成後必須立即播放。使用者不需先按 Play 即可看到動態，初始控制按鈕必須顯示 `Pause 暫停`。

Autoplay rules:

1. Start visual animation immediately on first load and after a full page reload.
2. Keep a visible `Pause 暫停` control beside `Replay/Reset 重播／重設`.
3. Replay resets the explanation time to zero; it does not silently disable autoplay.
4. Never autoplay sound. Audio still requires an explicit user action.
5. When reduced motion is requested by the operating system, keep the demo running at a gentler speed while retaining the immediately visible Pause control.
6. The default frame must remain understandable if the user pauses immediately.

自動播放規則：

1. 首次載入及完整重新載入後，視覺動畫立即開始。
2. `Pause 暫停` 必須與 `Replay/Reset 重播／重設` 一起保持可見。
3. Replay 只把解說時間重設為零，不可暗中關閉自動播放。
4. 不可自動播放聲音；音訊仍須由使用者明確啟動。
5. 作業系統要求減少動態時，Demo 仍以較溫和速度播放，並保留立即可見的 Pause 控制。
6. 即使使用者立刻暫停，預設畫面仍必須能說明核心內容。

### Autoplay verification / 自動播放驗證

- [ ] A fresh page load shows `Pause 暫停`, not `Play 播放`.
- [ ] 全新載入後顯示 `Pause 暫停`，而不是 `Play 播放`。
- [ ] A time-dependent visual mark changes without any first click.
- [ ] 無須首次點擊，依時間變化的視覺標記就會開始改變。
- [ ] Pressing Pause changes the control to `Play 播放` and freezes motion; pressing Play resumes it.
- [ ] 按 Pause 後控制變為 `Play 播放` 且動畫停止；再按 Play 可繼續。
- [ ] No audio starts automatically.
- [ ] 不會自動播放音訊。

## Required behavior / 必備行為

1. Show English and Traditional Chinese together for titles, controls, units, status, and outputs.
2. 標題、控制項、單位、狀態與輸出必須同時顯示英文與繁體中文。
3. Use only parameters that change the visible mechanism or an explanatory output.
4. 只保留會實際改變畫面機制或解釋性輸出的參數。
5. Put the current value and unit next to every slider label.
6. 每個滑桿都必須標示目前值、單位、最小值與最大值。
7. Mark conceptual or illustrative ranges explicitly; never present them as measured constants.
8. 概念性或教學用範圍必須明確標示，不可假裝為實測常數。
9. Provide play/pause and replay only when motion carries meaning.
10. 動畫只在能傳遞資訊時才加入播放／暫停與重播。
11. Start meaningful animation automatically on first open and keep native keyboard-accessible controls.
12. 首次開啟時自動播放有意義的動畫，並保留鍵盤可操作的原生控制項。

## Slider design rules / 滑桿設計規則

For every slider, document:

- Parameter and symbol / 參數與符號
- Minimum, maximum, step, default / 最小、最大、步進、預設值
- Unit / 單位
- Why the range is useful / 為何麼這個範圍有教學價值
- What visible element and output it changes / 它會改變哪個畫面元素與輸出

Do not expose an internal tuning constant as a user control. Do not use a range so wide that most positions produce an unreadable or saturated result.

不要把程式內部調校常數直接暴露為滑桿；也不要使用過寬、以致大部分區間只產生飽和或難以閱讀畫面的範圍。

## Current Cherenkov demo ranges / 本次 Cherenkov Demo 範圍

| Parameter / 參數 | Range / 範圍 | Default / 預設 | Purpose / 用途 |
|---|---:|---:|---|
| Particle speed `β = v/c` / 粒子速度 | 0.700–0.999, step 0.001 | 0.999 | Crosses the Cherenkov threshold near `1/n`; 可跨越 `1/n` 門檻。 |
| Refractive index `n` / 折射率 | 1.20–1.40, step 0.01 | 1.32 | Shows how `c/n` and cone angle change; 觀察冰中光速與光錐角變化。 |
| Effective scattering length `λs` / 有效散射長度 | 10–80 m, step 1 m | 35 m | Teaching range for photon direction/time spread; 用於比較光子方向與到達時間的擴散。 |
| Absorption length `λa` / 吸收長度 | 50–250 m, step 5 m | 100 m | Teaching range for photon survival; 用於比較光子存活率。 |
| Neutrino energy / 中微子能量 | 50 GeV–10 PeV, logarithmic | 100 TeV | Keeps low- and high-light events visible; 同時涵蓋低光量與高光量事件。 |
| Zenith angle / 天頂角 | 0°–180° | 120° | Covers down-going through up-going tracks; 覆蓋向下至向上軌跡。 |
| Interaction depth / 互作用深度 | 1450–2450 m | 2000 m | Matches the instrumented in-ice region; 對應 IceCube 的冰內偵測區。 |

The scattering and absorption controls are explicitly illustrative because real IceCube optical properties vary with depth, wavelength, layer tilt, and ice anisotropy.

散射與吸收滑桿必須標示為教學模型，因為真實 IceCube 光學性質會隨深度、波長、冰層傾斜與各向異性而改變。

## Current stereochemistry demo ranges / 本次立體化學 Demo 範圍

The Chemistry demo must keep three naming systems separate:

- `D/L` describes relative configuration in the Fischer–Rosanoff convention.
- `R/S` describes absolute configuration assigned with Cahn–Ingold–Prelog priorities.
- `(+)/(−)` describes the experimentally observed direction of optical rotation under stated conditions.
- There is no universal conversion among the three systems. `D` does not mean `(+)`, and `L` does not mean `(−)`.

Chemistry Demo 必須明確分開三套標記：`D/L` 是 Fischer–Rosanoff 慣例下的相對構型；`R/S` 是依 CIP 優先序判定的絕對構型；`(+)/(−)` 是指定條件下實測的旋光方向。三者沒有通用換算，`D` 不等於 `(+)`，`L` 也不等於 `(−)`。

| Parameter / 參數 | Range / 範圍 | Default / 預設 | Purpose / 用途 |
|---|---:|---:|---|
| Molecule view angle / 分子視角 | 0–360°, step 1° | 18° | Shows that rotating a molecule does not change its R/S configuration; 說明旋轉整個分子不會改變 R/S 構型。 |
| Signed enantiomeric excess `ee` / 帶正負號的鏡像異構過量 | −100%–+100%, step 1% | +60% | Covers pure B, racemic, and pure A composition; 涵蓋純 B、消旋及純 A 組成。 |
| Reference specific rotation `[α]` / 參考比旋光度 | −100–+100 °·mL·g⁻¹·dm⁻¹, step 1 | +50 | Illustrative range for reversing and scaling rotation; 用於觀察旋光方向反轉及角度縮放。 |
| Path length `l` / 光程 | 0.1–2.0 dm, step 0.1 dm | 1.0 dm | Shows the linear path-length contribution; 顯示光程的線性影響。 |
| Concentration `c` / 濃度 | 0.01–0.20 g/mL, step 0.01 g/mL | 0.10 g/mL | Shows the linear concentration contribution; 顯示濃度的線性影響。 |

The ideal two-enantiomer teaching model uses:

`αobs = (signed ee / 100) × [α]reference × l × c`

The `[α]` range is illustrative, not a universal property range. A real report must state the compound, temperature, wavelength, solvent, concentration convention, and path length. Use neutral `A/B` labels for a generic enantiomer pair so the composition chart does not falsely imply `D/L`, `R/S`, or optical sign.

此 `[α]` 範圍僅供教學，不是所有化合物的固定範圍。真實報告必須寫明化合物、溫度、波長、溶劑、濃度慣例與光程。通用對映體比例圖應使用中性的 `A/B`，避免讓讀者誤以為組成可直接推出 `D/L`、`R/S` 或旋光正負。

## Verification / 驗證

- [ ] Default state explains the mechanism without touching controls.
- [ ] 預設畫面無須操作即可理解核心機制。
- [ ] Each slider changes the visual and at least one live value.
- [ ] 每個滑桿會改變視覺與至少一個即時數值。
- [ ] Threshold states and units are explicit.
- [ ] 門檻狀態與單位清楚。
- [ ] No horizontal overflow at 390 × 844 and 320 px widths.
- [ ] 在 390 × 844 與 320 px 寬度無水平溢出。
- [ ] Main interaction passes browser testing with no console errors.
- [ ] 主要互動通過瀏覽器測試，主控台無錯誤。
- [ ] Local and iPhone routes return HTTP 200.
- [ ] 本機與 iPhone 連結均回應 HTTP 200。
