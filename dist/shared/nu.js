(function(){
  const body=document.body;
  const award=body.dataset.award;
  const lang=new URL(location.href).searchParams.get("lang")==="en"?"en":"tc";
  document.documentElement.lang=lang==="en"?"en":"zh-Hant";

  const common={
    tc:{model:"MATH_MODEL · 數學模型",explain:"NU_EXPLAIN · 數值解說",teaching:"簡化教學模型",input:"INPUT · 本次代入值",check:"同框核對",caution:"模型界線"},
    en:{model:"MATH_MODEL",explain:"NU_EXPLAIN",teaching:"TEACHING MODEL",input:"INPUT · VALUES USED",check:"SAME-FRAME CHECK",caution:"MODEL LIMIT"}
  };

  const catalog={
    "01_medicine":{
      color:"#087ea4",soft:"#d8f4fb",code:"NU 01 · MEDICINE",
      tc:{name:"生理學或醫學獎",title:"一束光如何讓神經元放電？",intro:"左側固定保留完整公式；右側把同一組輸入逐步代入，核對通道開啟、電流、膜電位與是否跨過放電閾值。",question:"光遺傳學的因果鏈",flow:["光強 Φ、脈衝 Δt","通道開啟＋離子流","膜電位＋動作電位"],
        formulas:[["GATE","P<sub>open</sub> = 1 − e<sup>−kΦΔt</sup>"],["CURRENT","|I<sub>opto</sub>| = ḡρP<sub>open</sub>|V<sub>m</sub>−E<sub>rev</sub>|"],["VOLTAGE","ΔV<sub>m</sub> ≈ |I<sub>opto</sub>|Δt/C<sub>m</sub>"],["OUTPUT","V<sub>m,new</sub> ≥ V<sub>th</sub> → spike"]],symbols:"<b>Φ</b> 光強 · <b>ρ</b> 視蛋白表現比例 · <b>ḡ</b> 最大電導 · <b>C<sub>m</sub></b> 膜電容",
        inputs:[["光刺激","Φ = 8.0；Δt = 0.10 s"],["通道參數","k = 0.35；ρ = 0.70"],["電性參數","ḡ = 2.0 nS；Cₘ = 100 pF"],["初始／反轉電位","Vₘ = −65 mV；Erev = 0 mV"],["放電閾值","Vth = −50 mV"]],
        steps:[["通道開啟率","1 − e<sup>−(0.35×8×0.10)</sup> = 1 − e<sup>−0.28</sup>","約 24.4% 的模型通道處於開啟狀態。","0.244"],["光生電流","2.0 × 0.70 × 0.244 × |−65−0|","nS × mV = pA；此處取內向電流大小。","22.2 pA"],["膜電位變化","22.2 pA × 100 ms ÷ 100 pF","忽略此短步驟中的漏電流，得到教學近似值。","+22.2 mV"],["是否放電","−65 + 22.2 = −42.8 mV；−42.8 ≥ −50","新膜電位跨過閾值，因此模型輸出一次動作電位。","SPIKE"]],
        outputs:[["Popen","24.4%"],["ΔVm","+22.2 mV"],["神經輸出","放電"]],caution:"這是短時間、單區室近似；真實細胞還有漏電流、通道動力學、空間結構與細胞差異。"},
      en:{name:"Physiology or Medicine",title:"How can one light pulse make a neuron fire?",intro:"Keep the complete model on the left while substituting one set of values on the right to check channel opening, current, voltage and threshold crossing.",question:"The optogenetic causal chain",flow:["Light Φ and pulse Δt","Channel opening + ion flow","Membrane voltage + spike"],
        formulas:[["GATE","P<sub>open</sub> = 1 − e<sup>−kΦΔt</sup>"],["CURRENT","|I<sub>opto</sub>| = ḡρP<sub>open</sub>|V<sub>m</sub>−E<sub>rev</sub>|"],["VOLTAGE","ΔV<sub>m</sub> ≈ |I<sub>opto</sub>|Δt/C<sub>m</sub>"],["OUTPUT","V<sub>m,new</sub> ≥ V<sub>th</sub> → spike"]],symbols:"<b>Φ</b> light intensity · <b>ρ</b> opsin expression · <b>ḡ</b> maximum conductance · <b>C<sub>m</sub></b> capacitance",
        inputs:[["Light","Φ = 8.0; Δt = 0.10 s"],["Gate","k = 0.35; ρ = 0.70"],["Electrical","ḡ = 2.0 nS; Cₘ = 100 pF"],["Start / reversal","Vₘ = −65 mV; Erev = 0 mV"],["Threshold","Vth = −50 mV"]],
        steps:[["Open probability","1 − e<sup>−(0.35×8×0.10)</sup> = 1 − e<sup>−0.28</sup>","About 24.4% of model channels are open.","0.244"],["Photocurrent","2.0 × 0.70 × 0.244 × |−65−0|","nS × mV = pA; magnitude of inward current is shown.","22.2 pA"],["Voltage change","22.2 pA × 100 ms ÷ 100 pF","A short-step approximation that omits leak current.","+22.2 mV"],["Threshold check","−65 + 22.2 = −42.8 mV; −42.8 ≥ −50","The new voltage crosses threshold, so the model emits a spike.","SPIKE"]],
        outputs:[["Popen","24.4%"],["ΔVm","+22.2 mV"],["Neural output","Spike"]],caution:"This is a short-time, single-compartment approximation. Real cells add leak current, channel kinetics, geometry and biological variability."}
    },
    "02_physics":{
      color:"#2f54eb",soft:"#e4e8ff",code:"NU 02 · PHYSICS",
      tc:{name:"物理學獎",title:"冰中的微中子事件如何變成方向？",intro:"先確認次級帶電粒子是否超過冰中光速門檻，再算 Cherenkov 光錐角，最後把傳輸與感測效率轉成可重建的光電子。",question:"IceCube 偵測數值鏈",flow:["β、折射率 n、光子數","Cherenkov 光＋DOM","角度、訊號與方向"],
        formulas:[["THRESHOLD","βn &gt; 1 → Cherenkov light"],["ANGLE","cos θ<sub>C</sub> = 1/(βn)"],["DETECT","N<sub>pe</sub> = N<sub>γ</sub>T<sub>ice</sub>ε<sub>DOM</sub>"],["RECON","χ² = Σ[(t<sub>i</sub>−t<sub>i</sub><sup>model</sup>)/σ<sub>t</sub>]<sup>2</sup>"]],symbols:"<b>β</b> 粒子速率／真空光速 · <b>n</b> 冰折射率 · <b>T</b> 光傳輸比例 · <b>N<sub>pe</sub></b> 光電子數",
        inputs:[["次級粒子","β = 0.99"],["南極冰","n = 1.33"],["模型光子","Nγ = 240"],["冰中傳輸","Tice = 0.40"],["DOM 效率","εDOM = 0.25"]],
        steps:[["門檻檢查","βn = 0.99 × 1.33 = 1.3167","因 1.3167 > 1，帶電次級粒子可在冰中產生 Cherenkov 光。","PASS"],["光錐角","θC = cos<sup>−1</sup>(1/1.3167)","光子集中在相對粒子方向約 40.6° 的圓錐上。","40.6°"],["抵達感測器","240 × 0.40 = 96","散射與吸收後，本例有 96 個模型光子到達 DOM。","96 γ"],["轉成電訊號","96 × 0.25 = 24","約 24 個光電子提供抵達時間與光量，可進入方向重建。","24 pe"]],
        outputs:[["βn","1.3167"],["θC","40.6°"],["偵測訊號","24 pe"]],caution:"微中子本身不直接發出 Cherenkov 光；光來自交互作用產生的高速帶電次級粒子。實際 IceCube 使用校正後的概似重建。"},
      en:{name:"Physics",title:"How does an event in ice become a direction?",intro:"Check whether the secondary charged particle exceeds the in-ice light threshold, calculate the Cherenkov cone, then convert transmission and sensor efficiency into reconstructable photoelectrons.",question:"IceCube numerical chain",flow:["β, refractive index n, photons","Cherenkov light + DOM","Angle, signal and direction"],
        formulas:[["THRESHOLD","βn &gt; 1 → Cherenkov light"],["ANGLE","cos θ<sub>C</sub> = 1/(βn)"],["DETECT","N<sub>pe</sub> = N<sub>γ</sub>T<sub>ice</sub>ε<sub>DOM</sub>"],["RECON","χ² = Σ[(t<sub>i</sub>−t<sub>i</sub><sup>model</sup>)/σ<sub>t</sub>]<sup>2</sup>"]],symbols:"<b>β</b> particle speed / c · <b>n</b> ice refractive index · <b>T</b> transmission · <b>N<sub>pe</sub></b> photoelectrons",
        inputs:[["Secondary particle","β = 0.99"],["Antarctic ice","n = 1.33"],["Model photons","Nγ = 240"],["Ice transmission","Tice = 0.40"],["DOM efficiency","εDOM = 0.25"]],
        steps:[["Threshold","βn = 0.99 × 1.33 = 1.3167","Because 1.3167 > 1, the charged secondary can emit Cherenkov light in ice.","PASS"],["Cone angle","θC = cos<sup>−1</sup>(1/1.3167)","Photons form a cone about 40.6° from the particle direction.","40.6°"],["Reach the sensor","240 × 0.40 = 96","After absorption and scattering, 96 model photons reach a DOM.","96 γ"],["Electrical signal","96 × 0.25 = 24","About 24 photoelectrons provide timing and charge for reconstruction.","24 pe"]],
        outputs:[["βn","1.3167"],["θC","40.6°"],["Detected","24 pe"]],caution:"The neutrino does not emit Cherenkov light directly. Fast charged secondaries do. Real IceCube analyses use a calibrated likelihood reconstruction."}
    },
    "03_chemistry":{
      color:"#7546d8",soft:"#eee7ff",code:"NU 03 · CHEMISTRY",
      tc:{name:"化學獎",title:"微小手性差異如何逐輪放大？",intro:"固定左側手性自催化模型，右側從 1% 初始 ee 開始逐步算速率、第一輪分配、十輪放大與旋光讀值。",question:"非線性手性放大",flow:["R₀、S₀、[A]","自催化 m > 1","ee＋旋光"],
        formulas:[["RATES","v<sub>R</sub> = k[A]R<sup>m</sup>; v<sub>S</sub> = k[A]S<sup>m</sup>"],["SHARE","f<sub>R</sub> = R<sup>m</sup>/(R<sup>m</sup>+S<sup>m</sup>)"],["BALANCE","ee = (R−S)/(R+S) × 100%"],["ROTATION","α<sub>obs</sub> = [α]ℓc(ee/100%)"]],symbols:"<b>R、S</b> 對映體數量 · <b>m</b> 非線性階數 · <b>ℓ</b> 光程 · <b>c</b> 濃度 · <b>[α]</b> 比旋光度",
        inputs:[["初始混合物","R₀ = 0.505；S₀ = 0.495"],["自催化階數","m = 2"],["每輪新增","1.000 相對單位"],["旋光參數","[α] = +50；ℓ = 1 dm"],["濃度","c = 0.20 g/mL"]],
        steps:[["初始 ee","(0.505−0.495)/(0.505+0.495) × 100%","R 只有非常小的初始優勢。","+1.00%"],["速率放大","(0.505/0.495)<sup>2</sup> = 1.0408","R 的數量比只高 2.02%，生產速率卻高約 4.08%。","1.0408×"],["第一輪分配","fR = 0.505²/(0.505²+0.495²) = 0.5100","新增 1 單位後 R=1.015、S=0.985，ee 變成約 1.50%。","1.50% ee"],["十輪與旋光","ee₁₀ = 5.983%；αobs = 50×1×0.20×0.05983","相同規則逐輪重算後，1% 放大至 5.98%，旋光約 +0.598°。","+0.598°"]],
        outputs:[["初始 ee","1.00%"],["第 10 輪 ee","5.98%"],["αobs","+0.598°"]],caution:"R/S 與 (+)/(−) 沒有普遍固定對應；只有先知道該化合物的比旋光方向，才能由旋光正負判斷優勢對映體。"},
      en:{name:"Chemistry",title:"How does a tiny chiral imbalance amplify?",intro:"Keep the autocatalytic model on the left while starting from 1% ee on the right and calculating rate bias, first-cycle allocation, ten-cycle amplification and optical rotation.",question:"Nonlinear chiral amplification",flow:["R₀, S₀ and [A]","Autocatalysis m > 1","ee + optical rotation"],
        formulas:[["RATES","v<sub>R</sub> = k[A]R<sup>m</sup>; v<sub>S</sub> = k[A]S<sup>m</sup>"],["SHARE","f<sub>R</sub> = R<sup>m</sup>/(R<sup>m</sup>+S<sup>m</sup>)"],["BALANCE","ee = (R−S)/(R+S) × 100%"],["ROTATION","α<sub>obs</sub> = [α]ℓc(ee/100%)"]],symbols:"<b>R, S</b> enantiomer amounts · <b>m</b> nonlinear order · <b>ℓ</b> path · <b>c</b> concentration · <b>[α]</b> specific rotation",
        inputs:[["Initial mixture","R₀ = 0.505; S₀ = 0.495"],["Order","m = 2"],["Added each cycle","1.000 relative unit"],["Rotation","[α] = +50; ℓ = 1 dm"],["Concentration","c = 0.20 g/mL"]],
        steps:[["Initial ee","(0.505−0.495)/(0.505+0.495) × 100%","R begins with only a tiny advantage.","+1.00%"],["Rate bias","(0.505/0.495)<sup>2</sup> = 1.0408","R abundance is 2.02% higher, but its production rate is about 4.08% higher.","1.0408×"],["First cycle","fR = 0.505²/(0.505²+0.495²) = 0.5100","After adding one unit, R=1.015 and S=0.985; ee rises to about 1.50%.","1.50% ee"],["Ten cycles + rotation","ee₁₀ = 5.983%; αobs = 50×1×0.20×0.05983","Repeating the rule amplifies 1% to 5.98%, giving about +0.598°.","+0.598°"]],
        outputs:[["Initial ee","1.00%"],["Cycle 10 ee","5.98%"],["αobs","+0.598°"]],caution:"R/S and (+)/(−) have no universal mapping. The compound's reference rotation must be known before using the sign to identify the excess enantiomer."}
    },
    "04_literature":{
      color:"#d15b45",soft:"#ffe8e2",code:"NU 04 · LITERATURE",
      tc:{name:"文學獎",title:"古典傳統與新形式如何同時存在？",intro:"這不是文學品質評分，而是一個透明的比較練習：把同一作品的聲音、文類、引用與斷裂特徵，和兩組參考向量一起核對。",question:"形式—對話解讀模型",flow:["聲音、文類、引用、斷裂","相似度＋形式距離","混合形式指標"],
        formulas:[["FEATURES","x = [聲音, 文類, 引用, 斷裂]"],["TRADITION","S<sub>classic</sub> = cos(x,x<sub>classic</sub>)"],["NOVELTY","N<sub>form</sub> = ‖x−x<sub>contemporary</sub>‖"],["SYNTHESIS","H = S<sub>classic</sub>N<sub>form</sub>C"]],symbols:"每一維使用 0–1 教學尺度；<b>S</b> 是古典連結、<b>N</b> 是與當代基準的形式距離、<b>C</b> 是內部連貫度。",
        inputs:[["作品向量 x","[0.70, 0.90, 0.80, 0.70]"],["古典參考","[0.30, 0.20, 1.00, 0.40]"],["當代基準","[0.80, 0.80, 0.20, 0.30]"],["連貫度","C = 0.85"]],
        steps:[["向量內積","x·xclassic = 1.47","引用與斷裂兩維使作品保有明顯的古典對話。","1.47"],["古典相似度","1.47/(‖x‖×‖xclassic‖) = 0.830","方向越相近，代表特徵配置越接近古典參考。","0.83"],["形式距離","‖x−xcontemporary‖ = √0.54","文類、引用與斷裂使它離開當代基準。","0.735"],["綜合核對","0.830 × 0.735 × 0.85","兩種訊號同時偏高，表示古典連結與形式變形並存。","H = 0.519"]],
        outputs:[["古典連結 S","0.83"],["形式距離 N","0.735"],["混合指標 H","0.519"]],caution:"特徵與權重必須由讀者公開說明；H 只能比較同一套標準下的文本，不能衡量文學價值，也不是諾貝爾獎決策公式。"},
      en:{name:"Literature",title:"How can tradition and new form coexist?",intro:"This is not a literary-quality score. It is a transparent comparison exercise that checks voice, genre, citation and fragmentation against two reference vectors.",question:"Form-dialogue reading model",flow:["Voice, genre, citation, fracture","Similarity + formal distance","Hybrid-form index"],
        formulas:[["FEATURES","x = [voice, genre, citation, fracture]"],["TRADITION","S<sub>classic</sub> = cos(x,x<sub>classic</sub>)"],["NOVELTY","N<sub>form</sub> = ‖x−x<sub>contemporary</sub>‖"],["SYNTHESIS","H = S<sub>classic</sub>N<sub>form</sub>C"]],symbols:"Each dimension uses a 0–1 teaching scale. <b>S</b> is classical connection, <b>N</b> formal distance and <b>C</b> internal coherence.",
        inputs:[["Work vector x","[0.70, 0.90, 0.80, 0.70]"],["Classical reference","[0.30, 0.20, 1.00, 0.40]"],["Contemporary baseline","[0.80, 0.80, 0.20, 0.30]"],["Coherence","C = 0.85"]],
        steps:[["Dot product","x·xclassic = 1.47","Citation and fracture preserve a strong classical dialogue.","1.47"],["Classical similarity","1.47/(‖x‖×‖xclassic‖) = 0.830","A closer direction means a more similar feature configuration.","0.83"],["Formal distance","‖x−xcontemporary‖ = √0.54","Genre, citation and fracture move the work away from the baseline.","0.735"],["Combined check","0.830 × 0.735 × 0.85","Both signals remain high: classical connection and formal transformation coexist.","H = 0.519"]],
        outputs:[["Classical S","0.83"],["Formal N","0.735"],["Hybrid H","0.519"]],caution:"Readers must disclose features and weights. H compares texts only under one shared rubric; it cannot measure literary worth and is not a Nobel decision formula."}
    },
    "05_peace":{
      color:"#15805f",soft:"#dff5ea",code:"NU 05 · PEACE",
      tc:{name:"和平獎",title:"多層究責如何降低未來侵害風險？",intro:"左側保留管轄覆蓋、究責強度與風險更新公式；右側代入國內、區域與國際三層制度數值，檢查保護增益是否大於新增傷害。",question:"究責制度數值鏈",flow:["證據 q、管轄 c、執行 e","究責強度 A","下一期風險 R"],
        formulas:[["REACH","J = 1 − ∏<sub>j</sub>(1−c<sub>j</sub>)"],["ACCOUNT","A = qJe"],["RISK","R<sub>t+1</sub> = R<sub>t</sub> + h − μAR<sub>t</sub>"],["PROTECT","ΔP = μAR<sub>t</sub> − h"]],symbols:"<b>c</b> 各層可介入比例 · <b>q</b> 證據品質 · <b>e</b> 執行力 · <b>h</b> 新增傷害壓力 · <b>μ</b> 保護效力",
        inputs:[["三層管轄","c = 0.45, 0.35, 0.25"],["證據品質","q = 0.80"],["執行力","e = 0.70"],["目前風險","Rt = 0.60；h = 0.08"],["保護效力","μ = 0.50"]],
        steps:[["合併覆蓋","J = 1−(0.55×0.65×0.75)","不是直接相加；先算三層全部未覆蓋的機率，再取補集。","0.7319"],["究責強度","A = 0.80×0.7319×0.70","好證據、可及管轄與實際執行缺一不可。","0.4099"],["保護效果","μARt = 0.50×0.4099×0.60","模型估計本期可抵銷 0.123 的風險量。","0.1230"],["更新風險","Rt+1 = 0.60+0.08−0.1230","保護量大於新增傷害 0.08，風險由 0.600 降至 0.557。","0.5570"]],
        outputs:[["管轄覆蓋 J","73.2%"],["究責強度 A","0.410"],["風險變化","−0.043"]],caution:"這是制度因果的思考工具，不是對國家、人權或受害者的評分；輸入必須由可核實資料、敏感度分析與倫理審查支持。"},
      en:{name:"Peace",title:"How can layered accountability reduce future harm?",intro:"Keep jurisdiction, accountability and risk-update equations on the left while substituting national, regional and international values on the right to check whether protection exceeds new harm.",question:"Accountability numerical chain",flow:["Evidence q, reach c, enforcement e","Accountability A","Next-period risk R"],
        formulas:[["REACH","J = 1 − ∏<sub>j</sub>(1−c<sub>j</sub>)"],["ACCOUNT","A = qJe"],["RISK","R<sub>t+1</sub> = R<sub>t</sub> + h − μAR<sub>t</sub>"],["PROTECT","ΔP = μAR<sub>t</sub> − h"]],symbols:"<b>c</b> intervention coverage · <b>q</b> evidence quality · <b>e</b> enforcement · <b>h</b> new harm pressure · <b>μ</b> protective effect",
        inputs:[["Three jurisdictions","c = 0.45, 0.35, 0.25"],["Evidence quality","q = 0.80"],["Enforcement","e = 0.70"],["Current risk","Rt = 0.60; h = 0.08"],["Protective effect","μ = 0.50"]],
        steps:[["Combined reach","J = 1−(0.55×0.65×0.75)","Do not add directly: find the probability that all three miss, then take its complement.","0.7319"],["Accountability","A = 0.80×0.7319×0.70","Evidence, reachable jurisdiction and enforcement are all necessary.","0.4099"],["Protection","μARt = 0.50×0.4099×0.60","The model offsets 0.123 units of current risk.","0.1230"],["Updated risk","Rt+1 = 0.60+0.08−0.1230","Protection exceeds 0.08 new harm; risk falls from 0.600 to 0.557.","0.5570"]],
        outputs:[["Reach J","73.2%"],["Accountability A","0.410"],["Risk change","−0.043"]],caution:"This is a causal-thinking tool, not a score of states, rights or victims. Inputs require verified evidence, sensitivity analysis and ethical review."}
    },
    "06_economic_sciences":{
      color:"#b57b00",soft:"#fff0c9",code:"NU 06 · ECONOMICS",
      tc:{name:"經濟學獎",title:"利率規則如何把經濟拉回目標？",intro:"使用一個單期新凱因斯教學案例，同框解出產出缺口、通膨與政策利率，並用損失函數確認穩定程度。",question:"新凱因斯穩定模型",flow:["自然利率衝擊＋預期","IS＋NKPC＋政策規則","x、π、i 與損失"],
        formulas:[["IS","x = E x<sub>+1</sub> − (i−Eπ<sub>+1</sub>−r<sup>n</sup>)/σ"],["NKPC","π = βEπ<sub>+1</sub> + κx"],["RULE","i = r<sup>n</sup>+π*+φ<sub>π</sub>(π−π*)+φ<sub>x</sub>x"],["LOSS","L = (π−π*)² + λx²"]],symbols:"數值均以百分點表示；<b>x</b> 產出缺口 · <b>π</b> 通膨 · <b>i</b> 政策利率 · <b>r<sup>n</sup></b> 自然實質利率",
        inputs:[["衝擊後自然利率","rn = −1.00%"],["下一期期望","Ex+1 = 0；Eπ+1 = 2.00%"],["結構參數","σ = 1；β = 0.99；κ = 0.20"],["政策反應","φπ = 1.50；φx = 0.50"],["目標／權重","π* = 2.00%；λ = 0.50"]],
        steps:[["化簡通膨式","π = 0.99×2 + 0.20x = 1.98 + 0.20x","產出高於潛能會增加通膨；低於潛能則降低通膨。","π=1.98+0.2x"],["化簡政策規則","i = −1+2+1.5(π−2)+0.5x = 0.97+0.80x","政策把自然利率衝擊、通膨偏差與產出缺口一起納入。","i=0.97+0.8x"],["聯立 IS","x = 1−i = 1−(0.97+0.80x)","得到 1.80x=0.03，因此 x 約為 +0.0167 個百分點。","x=+0.0167%"],["回代與損失","π=1.9833%；i=0.9833%；L=(−0.0167)²+0.5(0.0167)²","政策利率隨自然利率下降，通膨和產出都維持在目標附近。","L=0.000417"]],
        outputs:[["產出缺口 x","+0.0167%"],["通膨 π","1.9833%"],["政策利率 i","0.9833%"]],caution:"這是一個單期線性教學解；實際政策評估會加入不確定性、零利率下限、金融條件、供給衝擊、分配效果與資料修正。"},
      en:{name:"Economic Sciences",title:"How can an interest-rate rule return the economy to target?",intro:"Use a one-period New Keynesian teaching case to solve the output gap, inflation and policy rate in one frame, then check stability with the loss function.",question:"New Keynesian stabilisation model",flow:["Natural-rate shock + expectations","IS + NKPC + policy rule","x, π, i and loss"],
        formulas:[["IS","x = E x<sub>+1</sub> − (i−Eπ<sub>+1</sub>−r<sup>n</sup>)/σ"],["NKPC","π = βEπ<sub>+1</sub> + κx"],["RULE","i = r<sup>n</sup>+π*+φ<sub>π</sub>(π−π*)+φ<sub>x</sub>x"],["LOSS","L = (π−π*)² + λx²"]],symbols:"All numbers are percentage points. <b>x</b> output gap · <b>π</b> inflation · <b>i</b> policy rate · <b>r<sup>n</sup></b> natural real rate",
        inputs:[["Natural-rate shock","rn = −1.00%"],["Next-period expectations","Ex+1 = 0; Eπ+1 = 2.00%"],["Structure","σ = 1; β = 0.99; κ = 0.20"],["Policy response","φπ = 1.50; φx = 0.50"],["Target / weight","π* = 2.00%; λ = 0.50"]],
        steps:[["Inflation equation","π = 0.99×2 + 0.20x = 1.98 + 0.20x","Output above potential raises inflation; output below potential lowers it.","π=1.98+0.2x"],["Policy rule","i = −1+2+1.5(π−2)+0.5x = 0.97+0.80x","The rule combines the natural-rate shock, inflation deviation and output gap.","i=0.97+0.8x"],["Solve with IS","x = 1−i = 1−(0.97+0.80x)","Thus 1.80x=0.03 and x is about +0.0167 percentage points.","x=+0.0167%"],["Back-substitute","π=1.9833%; i=0.9833%; L=(−0.0167)²+0.5(0.0167)²","The policy rate follows the natural rate down, keeping inflation and output near target.","L=0.000417"]],
        outputs:[["Output gap x","+0.0167%"],["Inflation π","1.9833%"],["Policy rate i","0.9833%"]],caution:"This is a one-period linear teaching solution. Real policy adds uncertainty, the effective lower bound, financial conditions, supply shocks, distribution and data revision."}
    }
  };

  const awardData=catalog[award];
  if(!awardData)return;
  const data=awardData[lang];
  const ui=common[lang];
  document.body.style.setProperty("--topic",awardData.color);
  document.body.style.setProperty("--topic-soft",awardData.soft);
  document.title=`NOBEL2026 ${data.name} NU ${lang==="tc"?"TC":"EN"} V16 2026.10.17`;

  const header=document.querySelector(".site-nav");
  if(header){
    const links=header.querySelectorAll("nav a");
    if(links[0]){links[0].textContent=data.name;links[0].href=lang==="tc"?"../index-tc.html":"../index.html?lang=en";}
    if(links[1]){links[1].textContent=lang==="tc"?"互動 Demo":"Interactive Demo";links[1].href=`../demo/${lang==="en"?"?lang=en":""}`;}
    const label=header.querySelector(":scope > b");if(label)label.textContent=awardData.code;
  }

  const app=document.querySelector("#nuApp");
  app.innerHTML=`
    <section class="nu-hero"><div><p class="nu-kicker">${awardData.code} · ${ui.check}</p><h1>${data.title}</h1></div><p>${data.intro}</p></section>
    <section class="nu-workbench" aria-label="${ui.check}">
      <article class="math-model" aria-labelledby="mathModelTitle"><header class="panel-head"><div><small>${ui.model}</small><h2 id="mathModelTitle">${data.question}</h2></div><span class="panel-tag">${ui.teaching}</span></header><div class="model-flow">${data.flow.map((item,index)=>`${index?"<b>→</b>":""}<span>${item}</span>`).join("")}</div><div class="formula-list">${data.formulas.map(item=>`<div class="formula-row"><span>${item[0]}</span><code>${item[1]}</code></div>`).join("")}</div><p class="symbol-note">${data.symbols}</p></article>
      <article class="nu-explain" aria-labelledby="nuExplainTitle"><header class="panel-head"><div><small>${ui.explain}</small><h2 id="nuExplainTitle">${data.title}</h2></div><span class="panel-tag">01 → 04</span></header><section class="input-block"><p class="section-label">${ui.input}</p><div class="input-grid">${data.inputs.map(item=>`<div class="input-chip"><span>${item[0]}</span><strong>${item[1]}</strong></div>`).join("")}</div></section><section class="number-steps">${data.steps.map((item,index)=>`<div class="number-step"><span class="step-no">0${index+1}</span><div class="step-copy"><h3>${item[0]}</h3><code>${item[1]}</code><p>${item[2]}</p></div><strong class="step-result">${item[3]}</strong></div>`).join("")}</section><section class="output-band">${data.outputs.map(item=>`<article><small>${item[0]}</small><strong>${item[1]}</strong></article>`).join("")}</section><p class="nu-caution"><b>${ui.caution}：</b>${data.caution}</p></article>
    </section>`;
})();
