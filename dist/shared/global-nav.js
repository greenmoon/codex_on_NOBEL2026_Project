(function () {
  const script = document.currentScript;
  if (!script || window.__nobelGlobalNavLoaded) return;
  window.__nobelGlobalNavLoaded = true;

  const scriptUrl = new URL(script.src, location.href);
  const siteRoot = new URL("../", scriptUrl);
  const current = new URL(location.href);
  function normalizeRoute(path) {
    let normalized = decodeURIComponent(path).replace(/^\/+/, "");
    if (!normalized) return normalized;
    if (normalized.endsWith("/")) return `${normalized}index.html`;
    const leaf = normalized.split("/").pop();
    if (!leaf.includes(".")) {
      normalized += /^(?:index|index-tc|index-en|yt3)$/.test(leaf) ? ".html" : "/index.html";
    }
    return normalized;
  }

  const relativePath = normalizeRoute(current.pathname.slice(siteRoot.pathname.length));
  const isHome = !relativePath || /^index(?:-tc|-en)?\.html$/.test(relativePath);
  const categoryMatch = relativePath.match(/^(0[1-6]_[^/]+)\/(?:index(?:-tc|-en)?\.html)?$/);
  const explicitEnglish = /(?:^|\/)index-en\.html$/.test(relativePath) || current.searchParams.get("lang") === "en";
  const language = explicitEnglish ? "en" : "tc";

  if (categoryMatch && !explicitEnglish && !relativePath.endsWith("index-tc.html")) {
    location.replace(new URL(`${categoryMatch[1]}/index-tc.html`, siteRoot));
    return;
  }

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("global-nav.css", scriptUrl).href;
  document.head.append(css);

  const categoryNames = {
    "01_medicine": "生理學或醫學獎",
    "02_physics": "物理學獎",
    "03_chemistry": "化學獎",
    "04_literature": "文學獎",
    "05_peace": "和平獎",
    "06_economic_sciences": "經濟學獎"
  };

  const profileGuides = {
    "01_medicine/karl-deisseroth/index.html": ["Karl Deisseroth｜繁中導讀", "光遺傳學把微生物的感光蛋白帶入特定神經元，讓研究者以毫秒尺度的光脈衝啟動或抑制細胞，進而檢驗神經迴路與行為之間的因果關係。"],
    "01_medicine/peter-hegemann/index.html": ["Peter Hegemann｜繁中導讀", "Hegemann 對藻類感光蛋白的研究，揭示光子如何直接轉化成跨膜離子流，並為光遺傳學建立可精準控制細胞電活動的分子致動器。"],
    "01_medicine/georg-nagel/index.html": ["Georg Nagel｜繁中導讀", "Nagel 以功能實驗確認 ChR1、ChR2 是光閘控陽離子通道，使這些蛋白成為可移植到不同細胞中的光學控制工具。"],
    "02_physics/francis-halzen/index.html": ["Francis Halzen｜繁中導讀", "Halzen 推動從 AMANDA 到 IceCube 的長期科學與工程路線，把一立方公里南極冰轉化成高能宇宙微中子望遠鏡。"],
    "03_chemistry/henri-kagan/index.html": ["Henri B. Kagan｜繁中導讀", "Kagan 揭示催化劑的手性純度與產物選擇性可呈現非線性關係，讓化學家能由放大效應推測分子聚集與交互作用。"],
    "03_chemistry/kenso-soai/index.html": ["Kenso Soai｜繁中導讀", "Soai 反應證明手性產物能催化自身生成，並在循環中把極微小的不平衡放大成單一分子手性的明顯優勢。"],
    "04_literature/anne-carson/index.html": ["Anne Carson｜繁中導讀", "Carson 把古典文本、翻譯、論述、生命書寫與表演並置，使詩、小說與評論的邊界重新變得開放而陌生。"],
    "05_peace/navi-pillay/index.html": ["Navi Pillay｜繁中導讀", "Pillay 從反種族隔離法律實務走向國際刑事法院與聯合國人權體系，將證據、法律制度與究責連結為和平的基礎設施。"],
    "06_economic_sciences/robert-e-hall/index.html": ["Robert E. Hall｜繁中導讀", "Hall 以具前瞻性的家庭消費決策建立總體經濟的微觀基礎，說明新資訊如何改變消費、儲蓄與景氣波動。"],
    "06_economic_sciences/michael-woodford/index.html": ["Michael Woodford｜繁中導讀", "Woodford 把需求、價格僵固、預期與利率政策整合為新凱因斯模型，使不同穩定政策能在同一框架中比較。"]
  };

  const yt3Catalog = {
    "01_medicine": ["光遺傳學的三種視角", "以三支指定影片複習正式公布、運作機制，以及 Deisseroth 的第一人稱觀點。每完成一路即可標記，進度會保存在此裝置。", [["誰獲獎，以及為什麼", "先從諾貝爾獎正式公布與委員會說明開始。"], ["光遺傳學如何運作", "複習視紫紅質、基因標定、光輸送與因果推論。"], ["Deisseroth 親自說", "理解精神醫學、工程與基礎科學如何匯聚。"]]],
    "02_physics": ["宇宙微中子的三種視角", "從正式獲獎理由進入偵測器物理，再聽 Francis Halzen 說明 IceCube。", [["2026 物理學獎", "正式獎項、獲獎理由與委員會總覽。"], ["IceCube 如何看見幽靈粒子", "理解契忍可夫光、偵測器陣列、事件重建與來源方向。"], ["Francis Halzen 談 IceCube", "一立方公里儀器化冰層背後的科學押注。"]]],
    "03_chemistry": ["分子手性的三種視角", "複習獎項、手性與自催化的化學機制，以及得主親自說明的發現歷程。", [["2026 化學獎", "正式獲獎理由與委員會說明。"], ["手性與自催化", "理解鏡像產物如何生成，以及微小不對稱如何被放大。"], ["Soai 親自說", "聽他回應獲獎，並說明不對稱自催化的發現。"]]],
    "04_literature": ["Anne Carson 的三種視角", "複習正式授獎理由、跨文類寫作方法，以及 Carson 對自身作品的朗讀或談話。", [["2026 文學獎", "瑞典學院的正式授獎理由與公布。"], ["跨越文類的詩學", "理解古典片段、翻譯、論述、表演與混合形式。"], ["Carson 親自說", "透過朗讀或對談感受她的節奏、聲音與思想遊戲。"]]],
    "05_peace": ["Navi Pillay 的三種視角", "從正式公布前進到國際正義的脈絡，再聽 Pillay 親自說明人權工作。", [["2026 和平獎", "挪威諾貝爾委員會的決定與理由。"], ["以正義建立和平", "理解人權、國際法院、究責與預防之間的關係。"], ["Pillay 親自說", "從南非種族隔離時代走向國際正義的生命路徑。"]]],
    "06_economic_sciences": ["微觀基礎的三種視角", "複習正式獎項、新凱因斯機制，以及得主對預期與穩定政策的說明。", [["2026 經濟學獎", "正式獲獎理由、獎項說明與委員會架構。"], ["新凱因斯穩定模型", "理解預期、價格僵固、產出缺口與政策利率如何連結。"], ["Woodford 親自說", "聽他回應獲獎，並反思貨幣政策的設計。"]]]
  };

  function pageUrls() {
    if (categoryMatch) {
      return {
        tc: new URL(`${categoryMatch[1]}/index-tc.html`, siteRoot),
        en: new URL(`${categoryMatch[1]}/index.html?lang=en`, siteRoot)
      };
    }
    const tc = new URL(current);
    const en = new URL(current);
    tc.searchParams.delete("lang");
    en.searchParams.set("lang", "en");
    return { tc, en };
  }

  function makeTools() {
    const urls = pageUrls();
    const tools = document.createElement("div");
    tools.className = "global-nav-tools";
    tools.innerHTML = `<a class="global-home-link" href="${new URL(language === "en" ? "index-en.html" : "index.html", siteRoot)}" aria-label="${language === "en" ? "Back to home" : "返回首頁"}"><b>←</b><span>HOME</span></a><div class="global-language-switch" role="group" aria-label="${language === "en" ? "Choose language" : "選擇語言"}"><a href="${urls.en}" lang="en"${language === "en" ? ' aria-current="page"' : ""}>EN</a><a href="${urls.tc}" lang="zh-Hant"${language === "tc" ? ' aria-current="page"' : ""}>繁中</a></div>`;
    return tools;
  }

  function translateYT3() {
    const match = relativePath.match(/^(0[1-6]_[^/]+)\/yt3\.html$/);
    const content = match && yt3Catalog[match[1]];
    if (!content || language !== "tc") return;
    const category = categoryNames[match[1]];
    const head = document.querySelector(".yt3-head");
    if (!head) return;
    document.documentElement.lang = "zh-Hant";
    const versionTag = document.title.match(/\bV\d+\b.*$/)?.[0];
    document.title = `NOBEL2026 ${category} YT3 TC${versionTag ? ` ${versionTag}` : ""}`;
    const navLinks = [...document.querySelectorAll("header.site-nav nav a")];
    if (navLinks[0]) navLinks[0].textContent = category;
    navLinks.slice(1).forEach((link) => {
      link.textContent = link.getAttribute("href")?.includes("karl-deisseroth") ? "3D 實驗室" : "全部獎項";
    });
    const navLabel = document.querySelector("header.site-nav > b");
    if (navLabel) navLabel.textContent = `YT3 · ${category}`;
    const kicker = head.querySelector(".kicker");
    const h1 = head.querySelector("h1");
    const intro = head.querySelector(":scope > p");
    if (kicker) kicker.textContent = "三路影片複習";
    if (h1) h1.textContent = content[0];
    if (intro) intro.textContent = content[1];
    const cards = [...document.querySelectorAll(".video-card")];
    cards.forEach((card, index) => {
      const thumbnail = card.querySelector(".video-cover img");
      const coverLabel = card.querySelector(".video-cover span");
      const small = card.querySelector(".video-body small");
      const title = card.querySelector("h2");
      const copy = card.querySelector(".video-body p");
      const action = card.querySelector(".video-actions a");
      if (thumbnail) thumbnail.alt = `${category}${["正式公布", "主題解說", "得主訪談"][index]}的 YouTube 縮圖`;
      if (coverLabel) coverLabel.textContent = ["正式公布", "機制／主題", "得主訪談"][index];
      if (small) small.textContent = ["正式公布", "主題解說", "得主訪談"][index];
      if (title) title.textContent = content[2][index][0];
      if (copy) copy.textContent = content[2][index][1];
      if (action) action.textContent = "開啟 YouTube ↗";
    });
    const footer = document.querySelector(".site-footer");
    if (footer) {
      const brand = footer.querySelector("b");
      const creator = footer.querySelector("span");
      if (brand) brand.textContent = `NOBEL2026 · ${category} YT3`;
      if (creator) creator.textContent = "Kevin 製作";
    }
  }

  function addProfileGuide(header) {
    const guide = profileGuides[relativePath];
    if (!guide || language !== "tc") return;
    document.documentElement.lang = "zh-Hant";
    const section = document.createElement("section");
    section.className = "tc-guide";
    section.innerHTML = `<div class="tc-guide-inner"><div><small>TRADITIONAL CHINESE GUIDE · 繁中導讀</small><h2>${guide[0]}</h2></div><div><p>${guide[1]}</p><a href="#contribution">向下閱讀完整研究頁 ↓</a></div></div>`;
    header.insertAdjacentElement("afterend", section);
    const labels = {
      Contribution: "研究貢獻",
      "Study lens": "研讀視角",
      Sources: "核實來源",
      "Start the study lens": "開始研讀",
      "Medicine overview": "醫學獎總覽",
      "Physics overview": "物理學獎總覽",
      "Chemistry overview": "化學獎總覽",
      "Literature overview": "文學獎總覽",
      "Peace overview": "和平獎總覽",
      "Economics overview": "經濟學獎總覽"
    };
    document.querySelectorAll("a").forEach((node) => {
      const text = node.textContent.trim();
      if (labels[text]) node.textContent = labels[text];
    });
  }

  function translateSpecialLab() {
    if (relativePath !== "01_medicine/karl-deisseroth/index.html" || language !== "tc") return;
    document.documentElement.lang = "zh-Hant";
    const map = { "3D Lab": "3D 實驗室", Math: "數學模型", Story: "研究故事", "← Medicine overview": "← 醫學獎總覽" };
    document.querySelectorAll("a").forEach((node) => {
      const text = node.textContent.trim();
      if (map[text]) node.textContent = map[text];
    });
  }

  function init() {
    if (isHome) return;
    const header = document.querySelector(".site-nav, .profile-nav, .topbar");
    if (!header) return;
    header.querySelectorAll(".language-switch, nav a[lang]").forEach((node) => node.remove());
    header.append(makeTools());
    if (language === "tc") document.documentElement.lang = "zh-Hant";
    translateYT3();
    addProfileGuide(header);
    translateSpecialLab();
    window.dispatchEvent(new CustomEvent("nobel:languagechange", { detail: { language } }));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
