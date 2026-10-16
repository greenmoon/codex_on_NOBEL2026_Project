(function () {
  const script = document.currentScript;
  if (!script || window.__nobelReviewFlowLoaded) return;
  window.__nobelReviewFlowLoaded = true;

  const scriptUrl = new URL(script.src, location.href);
  const siteRoot = new URL("../", scriptUrl);
  const current = new URL(location.href);
  const stationKeys = ["overview", "demo", "yt3", "book", "terms"];

  const awards = {
    "01_medicine": {
      tc: {
        name: "生理學或醫學獎", topic: "用光控制神經迴路",
        book: { meta: "得主著作 · 2021", title: "Projections", author: "Karl Deisseroth", heading: "從人的故事看見大腦", byline: "Projections: A Story of Human Emotions · Karl Deisseroth", intro: "本書把臨床故事與神經科學放在一起，說明腦迴路如何形成情緒，也說明精神疾病如何反過來揭示一般內在世界的結構。", connection: "它把獎項所代表的迴路工具帶回人的經驗：精確機制能解釋大腦，但同理與個人敘事仍決定理解的意義。", highlights: [["兩種理解方法", "把精神科醫師對個人的細緻觀察，連結到科學家對細胞與迴路的研究。"], ["故障照亮設計", "由飲食、情緒及社會連結的失調，理解人類情感如何形成。"], ["意義仍然屬於人", "生物學解釋與同理心不是競爭答案，而是理解生命的合作方式。"]], source: "https://www.penguinrandomhouse.com/books/600209/projections-by-karl-deisseroth/9781984853707/", sourceLabel: "出版社書籍頁面 ↗" },
        terms: [["Opsin｜視蛋白", "能吸收特定波長光線並改變構形的膜蛋白。", "光遺傳學把它當作細胞的光學致動器。"], ["Channelrhodopsin｜通道視紫質", "由光直接開啟的離子通道。", "ChR2 讓藍光能快速改變神經元膜電位。"], ["Genetic targeting｜基因標定", "讓工具只在指定細胞類型表現的方法。", "它把『照光』轉化為細胞類型特異的操控。"], ["Membrane potential｜膜電位", "細胞膜內外電荷差形成的電壓。", "光閘控離子流會推動膜電位升高或降低。"], ["Action potential｜動作電位", "膜電位越過閾值後產生的快速電訊號。", "它是神經元向下游細胞傳遞訊息的主要事件。"], ["Causal circuit mapping｜因果迴路圖譜", "直接操控迴路元件並觀察行為結果。", "它比只記錄相關性更能檢驗因果關係。"]],
        quiz: [["為什麼必須做基因標定？", "因為光本身沒有細胞選擇性；基因標定決定哪些細胞擁有感光工具。"], ["ChR2 開啟後最先改變什麼？", "離子跨膜流動，接著改變膜電位，最後才可能觸發動作電位。"], ["光遺傳學如何支持因果推論？", "研究者改變特定細胞活動，再觀察迴路或行為是否依預測改變。"]]
      },
      en: {
        name: "Physiology or Medicine", topic: "Control neural circuits with light",
        book: { meta: "LAUREATE BOOK · 2021", title: "Projections", author: "Karl Deisseroth", heading: "The brain, seen through human stories", byline: "Projections: A Story of Human Emotions · Karl Deisseroth", intro: "Clinical stories and neuroscience meet in a humane account of how brain circuits shape emotion—and how mental illness can reveal the architecture of ordinary inner life.", connection: "The book returns circuit-level tools to human experience: precise mechanisms explain the brain, while empathy and personal narrative still shape what that explanation means.", highlights: [["Two ways of knowing", "Links the psychiatrist’s close attention to a person with the scientist’s study of cells and circuits."], ["Breakdown reveals design", "Uses disorders of hunger, mood and social connection to illuminate how emotions are built."], ["Meaning stays human", "Shows why biological explanation and empathy are partners, not competing accounts of a life."]], source: "https://www.penguinrandomhouse.com/books/600209/projections-by-karl-deisseroth/9781984853707/", sourceLabel: "Publisher book page ↗" },
        terms: [["Opsin", "A membrane protein that absorbs a particular wavelength and changes shape.", "Optogenetics uses it as a cellular light actuator."], ["Channelrhodopsin", "A light-gated ion channel.", "ChR2 lets blue light rapidly alter neuronal membrane voltage."], ["Genetic targeting", "A method that expresses a tool only in defined cell types.", "It makes illumination cell-type specific."], ["Membrane potential", "The voltage created by charge separation across a cell membrane.", "Light-gated ion flow raises or lowers this voltage."], ["Action potential", "A rapid electrical event produced after voltage crosses threshold.", "It is a principal signal sent to downstream neurons."], ["Causal circuit mapping", "Directly perturbing circuit elements and observing the result.", "It tests causation rather than correlation alone."]],
        quiz: [["Why is genetic targeting necessary?", "Light is not cell selective; genetic targeting decides which cells carry the light-sensitive tool."], ["What changes first when ChR2 opens?", "Ion flow changes first, followed by membrane voltage and possibly an action potential."], ["How does optogenetics support causal inference?", "Researchers perturb defined cells and test whether circuit activity or behavior changes as predicted."]]
      }
    },
    "02_physics": {
      tc: {
        name: "物理學獎", topic: "捕捉宇宙微中子",
        book: { meta: "得主講座著作 · 2018", title: "IceCube and the Discovery of High-Energy Cosmic Neutrinos", author: "Francis Halzen", heading: "一立方公里的冰如何成為望遠鏡", byline: "IceCube and the Discovery of High-Energy Cosmic Neutrinos · Francis Halzen", intro: "這本精要講座回顧 IceCube 的核心構想：以透明南極冰和數千個光感測器，把幾乎看不見的宇宙微中子轉化成觀測高能宇宙的新視野。", connection: "它把獎項的重要性放在完整工程鏈中：巨大偵測體積、精準光子計時與事件重建缺一不可。", highlights: [["為何必須這麼大？", "微中子極少與物質反應，因此必須監測約一立方公里的巨大體積。"], ["冰層成為光學系統", "帶電粒子發出契忍可夫光；光的時間與分布可重建方向和能量。"], ["全新的宇宙信使", "高能微中子可指向只靠一般光線無法完整辨識的劇烈宇宙來源。"]], source: "https://www.balzan.org/it/pubblicazioni/icecube-and-the-discovery-of-high-energy-cosmic-neutrinos_francis-halzen_annual-balzan-lecture-vol8", sourceLabel: "出版社書籍頁面 ↗" },
        terms: [["Neutrino｜微中子", "質量極小、沒有電荷且很少與物質反應的基本粒子。", "它能穿越高密度天體並帶出深處資訊。"], ["Weak interaction｜弱交互作用", "微中子與物質發生作用的主要基本作用力。", "反應機率極低，因此偵測器必須非常巨大。"], ["Cherenkov radiation｜契忍可夫輻射", "帶電粒子在介質中超過該介質光速時發出的光。", "光錐是 IceCube 可量測的主要痕跡。"], ["DOM｜數位光學模組", "封裝光電倍增管與電子系統的球形感測器。", "多個 DOM 記錄光子抵達時間與光量。"], ["Event reconstruction｜事件重建", "由分散感測器的時間與訊號反推粒子事件。", "它估計中微子的方向、能量與事件類型。"], ["Effective volume｜有效體積", "特定能量事件可被偵測與選取的等效體積。", "它比單純幾何尺寸更能代表望遠鏡能力。"]],
        quiz: [["為何 IceCube 要做到一立方公里？", "因為微中子極少反應，大體積才能增加可觀察事件數。"], ["微中子本身會直接發光嗎？", "不會；碰撞產生的高速帶電次級粒子才會發出契忍可夫光。"], ["方向如何被重建？", "比較多個 DOM 的光子抵達時間與光量，反推光錐和粒子軌跡。"]]
      },
      en: {
        name: "Physics", topic: "Catch cosmic neutrinos",
        book: { meta: "LAUREATE LECTURE · 2018", title: "IceCube and the Discovery of High-Energy Cosmic Neutrinos", author: "Francis Halzen", heading: "How a cubic kilometre of ice became a telescope", byline: "IceCube and the Discovery of High-Energy Cosmic Neutrinos · Francis Halzen", intro: "This compact lecture traces the wager behind IceCube: clear Antarctic ice and thousands of light sensors turn almost invisible cosmic neutrinos into a new view of the high-energy universe.", connection: "It frames the prize as a complete engineering chain: immense detection volume, precise photon timing and event reconstruction are all essential.", highlights: [["Why build so large?", "Neutrinos interact so rarely that discovery requires an instrumented volume on the scale of a cubic kilometre."], ["Ice becomes optics", "Charged particles emit Cherenkov light; timing and pattern reconstruct direction and energy."], ["A new cosmic messenger", "High-energy neutrinos point toward violent sources that ordinary light alone cannot fully reveal."]], source: "https://www.balzan.org/it/pubblicazioni/icecube-and-the-discovery-of-high-energy-cosmic-neutrinos_francis-halzen_annual-balzan-lecture-vol8", sourceLabel: "Publisher book page ↗" },
        terms: [["Neutrino", "A nearly massless, electrically neutral elementary particle that rarely interacts.", "It can escape dense sources and carry information from deep inside."], ["Weak interaction", "The fundamental interaction through which neutrinos primarily meet matter.", "Its tiny probability demands a very large detector."], ["Cherenkov radiation", "Light emitted when a charged particle outruns light in a medium.", "Its cone is IceCube’s principal measurable trace."], ["DOM", "A digital optical module containing a photomultiplier and electronics.", "Arrays of DOMs record photon times and amounts."], ["Event reconstruction", "Inferring a particle event from distributed sensor timing and charge.", "It estimates direction, energy and event class."], ["Effective volume", "The equivalent volume in which a chosen event can be detected.", "It describes performance better than geometry alone."]],
        quiz: [["Why must IceCube span a cubic kilometre?", "Neutrinos interact so rarely that a huge volume is needed to collect enough events."], ["Does the neutrino itself emit the light?", "No. Fast secondary charged particles produced by an interaction emit Cherenkov light."], ["How is direction reconstructed?", "Photon arrival times and amplitudes across many DOMs reveal the light cone and track."]]
      }
    },
    "03_chemistry": {
      tc: {
        name: "化學獎", topic: "理解分子的左手與右手",
        book: { meta: "得主教科書 · 立體化學", title: "La stéréochimie organique", author: "Henri B. Kagan", heading: "為何分子形狀會改變化學", byline: "La stéréochimie organique · Henri B. Kagan", intro: "Kagan 將三維排列放在有機化學的核心：原子連接方式相同，仍可能因空間形狀不同，而呈現不同的旋光行為與生物作用。", connection: "它提供理解獎項的語言：先辨認分子手性，再理解催化如何選擇並放大其中一種鏡像產物。", highlights: [["結構具有第三維度", "組態與構形能區分平面結構式容易隱藏的空間排列。"], ["鏡像差異可以量測", "對映體把分子左右手性連到旋光性，以及實驗上可觀察的差異。"], ["合成可以做選擇", "立體化學控制說明反應如何讓其中一種空間產物優先生成。"]], source: "https://e.lavoisier.fr/produit/392476/9782705957131/la-stereochimie-organique", sourceLabel: "出版社書籍頁面 ↗" },
        terms: [["Chirality｜手性", "物體與自身鏡像無法完全重疊的幾何性質。", "分子手性會影響反應、旋光與生物辨識。"], ["Enantiomer｜對映體", "互為不可重疊鏡像的一對分子。", "左右手形式通常具有相反的旋光方向。"], ["Enantiomeric excess｜對映體過量", "兩種對映體比例不平衡的量化指標。", "ee = |L−R|/(L+R) × 100%。"], ["Optical rotation｜旋光", "手性樣品使平面偏振光旋轉的現象。", "角度與比旋光度、濃度及光程相關。"], ["Asymmetric catalysis｜不對稱催化", "讓其中一種對映產物優先形成的催化。", "它把催化效率與立體選擇性結合。"], ["Autocatalysis｜自催化", "反應產物同時催化自身繼續生成。", "若產物具手性，微小 ee 可在循環中放大。"]],
        quiz: [["對映體為何不是同一個分子？", "它們的連接相同，但三維排列互為不可重疊鏡像。"], ["50:50 混合物的 ee 是多少？", "0%，因為兩種對映體沒有淨過量。"], ["Soai 反應如何放大手性？", "略多的一方產物會催化自身生成，使初始微小差異在循環中擴大。"]]
      },
      en: {
        name: "Chemistry", topic: "Understand molecular left and right",
        book: { meta: "LAUREATE TEXT · STEREOCHEMISTRY", title: "La stéréochimie organique", author: "Henri B. Kagan", heading: "Why molecular shape changes chemistry", byline: "La stéréochimie organique · Henri B. Kagan", intro: "Kagan’s text makes three-dimensional arrangement central to organic chemistry: identical connections can still produce molecules with different shapes, optical behavior and biological effects.", connection: "It supplies the language of the prize: identify molecular handedness, then understand how catalysis selects and amplifies one mirror-image product.", highlights: [["Structure has a third dimension", "Configuration and conformation distinguish arrangements that a flat structural formula can hide."], ["Mirror images are measurable", "Enantiomers connect handedness to optical rotation and observable differences."], ["Synthesis can choose", "Stereochemical control explains how a reaction can favour one spatial product."]], source: "https://e.lavoisier.fr/produit/392476/9782705957131/la-stereochimie-organique", sourceLabel: "Publisher book page ↗" },
        terms: [["Chirality", "The geometry of an object that cannot be superimposed on its mirror image.", "It changes reactions, optical rotation and biological recognition."], ["Enantiomer", "One of a pair of non-superimposable mirror-image molecules.", "Left and right forms usually rotate light in opposite directions."], ["Enantiomeric excess", "A measure of imbalance between two enantiomers.", "ee = |L−R|/(L+R) × 100%."], ["Optical rotation", "Rotation of plane-polarised light by a chiral sample.", "Angle depends on specific rotation, concentration and path length."], ["Asymmetric catalysis", "Catalysis that favours one enantiomeric product.", "It combines reaction acceleration with stereochemical selection."], ["Autocatalysis", "A product catalyses further production of itself.", "For chiral products, a tiny initial ee can be amplified over cycles."]],
        quiz: [["Why are enantiomers not the same molecule?", "Their connections match, but their 3D arrangements are non-superimposable mirror images."], ["What is the ee of a 50:50 mixture?", "0%, because neither enantiomer has a net excess."], ["How does the Soai reaction amplify chirality?", "The slightly more abundant product catalyses its own formation, magnifying the initial difference."]]
      }
    },
    "04_literature": {
      tc: {
        name: "文學獎", topic: "讓古典傳統進入全新形式",
        book: { meta: "詩體小說 · 1998", title: "Autobiography of Red", author: "Anne Carson", heading: "古代怪物說出一段現代生命", byline: "Autobiography of Red · Anne Carson", intro: "Carson 把被 Herakles 殺死的怪物 Geryon 改寫成長著紅翼的少年，經歷慾望、受傷與藝術上的自我認識；全書同時是小說、長詩，也是與古典世界的對話。", connection: "它集中呈現獎項所肯定的跨文類方法：古典片段不是背景，而是可被翻譯、改寫並重新賦予聲音的材料。", highlights: [["神話轉換視角", "戰敗的怪物成為敘述主體，讓古老英雄故事變得私密。"], ["形式跟隨經驗", "詩、敘事與片段跨越邊界，因為記憶與慾望不只用單一文類抵達。"], ["藝術建構自我", "Geryon 的相機與影像把觀看變成生存、理解與重寫生命的方法。"]], source: "https://www.penguinrandomhouse.com/books/24642/autobiography-of-red-by-anne-carson/", sourceLabel: "出版社書籍頁面 ↗" },
        terms: [["Fragment｜片段", "刻意保留斷裂與空白的文字單位。", "讀者必須在缺口中建立關係與意義。"], ["Hybrid genre｜混合文類", "把詩、小說、論述、翻譯或劇本放在同一作品。", "形式本身成為思考方式。"], ["Classical reception｜古典接受", "後世如何閱讀、改寫與重新使用古典文本。", "Carson 讓古代材料回應現代經驗。"], ["Persona｜詩性角色", "作品中說話的聲音，不必等同作者本人。", "角色讓觀點與情感保持多重距離。"], ["Ekphrasis｜藝作書寫", "用文字描述或回應視覺藝術。", "它把觀看、敘事與時間轉換連在一起。"], ["Translation as transformation｜翻譯即轉化", "翻譯不只替換字詞，也改變形式與語境。", "古典文本因此能在新作品中再次運作。"]],
        quiz: [["為何讓 Geryon 成為敘述者很重要？", "它把英雄神話的邊緣人物移到中心，改變道德與情感視角。"], ["作品為何難以只稱作小說？", "它同時運用詩行、敘事、片段、影像思考與古典材料。"], ["Carson 如何使用古典文本？", "她不是只註解，而是翻譯、移位與重寫，使其進入當代生命。"]]
      },
      en: {
        name: "Literature", topic: "Bring classical tradition into new forms",
        book: { meta: "VERSE NOVEL · 1998", title: "Autobiography of Red", author: "Anne Carson", heading: "An ancient monster tells a modern life", byline: "Autobiography of Red · Anne Carson", intro: "Carson recasts Geryon, a monster slain by Herakles, as a red-winged boy growing into desire, hurt and artistic self-knowledge. The book is at once a novel, a poem and a conversation with antiquity.", connection: "It concentrates the prize’s cross-genre method: classical fragments become material to translate, rewrite and return to voice.", highlights: [["Myth changes viewpoint", "The defeated monster becomes the speaking subject, making an old heroic story intimate."], ["Form follows experience", "Verse, narrative and fragment cross borders because memory and desire do not arrive in one genre."], ["Art makes a self", "Geryon’s camera turns observation into a way to survive, interpret and author his life."]], source: "https://www.penguinrandomhouse.com/books/24642/autobiography-of-red-by-anne-carson/", sourceLabel: "Publisher book page ↗" },
        terms: [["Fragment", "A textual unit that deliberately preserves interruption and absence.", "Readers build relations and meaning across its gaps."], ["Hybrid genre", "Combining poetry, fiction, essay, translation or drama in one work.", "Form itself becomes a method of thought."], ["Classical reception", "How later cultures read, rewrite and reuse classical texts.", "Carson makes ancient material answer modern experience."], ["Persona", "The speaking voice in a work, not necessarily the author.", "It creates multiple distances between thought and feeling."], ["Ekphrasis", "Writing that describes or answers visual art.", "It connects seeing, narrative and transformations of time."], ["Translation as transformation", "Translation changes form and context, not just words.", "Classical texts can therefore operate again inside new work."]],
        quiz: [["Why does making Geryon the narrator matter?", "It moves a marginal figure to the centre and changes the story’s moral and emotional viewpoint."], ["Why is the work more than a novel?", "It combines verse, narrative, fragments, visual thinking and classical material."], ["How does Carson use classical texts?", "She translates, relocates and rewrites them rather than merely explaining them."]]
      }
    },
    "05_peace": {
      tc: {
        name: "和平獎", topic: "以人權與究責建立和平",
        book: { meta: "政策出版物 · 2012", title: "Born Free and Equal", author: "OHCHR · Navi Pillay 作序", heading: "讓平等落地的五項國家義務", byline: "Born Free and Equal · OHCHR · Navi Pillay 作序", intro: "這是 OHCHR 政策出版物，並非 Pillay 的個人著作。她在序言中為實務指南定調：用既有國際人權法處理 LGBT 群體面對的暴力與歧視。", connection: "它把和平獎的制度觀點轉化為可執行清單：和平不只是停止衝突，也包括法律保護、平等與可追究的公共制度。", highlights: [["保護生命與尊嚴", "國家必須預防並調查恐同、恐跨暴力，以及酷刑和侮辱性待遇。"], ["平等不是特殊權利", "除罪化與禁止歧視，是把每個人本來就享有的普遍保障落實。"], ["把法律變成行動", "案例與建議把法律義務連到警政、法院、公共政策及結社自由。"]], source: "https://cambodia.ohchr.org/en/content/born-free-and-equal-0", sourceLabel: "OHCHR 出版物頁面 ↗" },
        terms: [["Accountability｜究責", "確認違法行為、責任主體並提供補救。", "沒有究責的和平容易保留暴力結構。"], ["International criminal law｜國際刑法", "處理種族滅絕、戰爭罪與危害人類罪的法律體系。", "它把嚴重侵害轉化為可審理責任。"], ["Transitional justice｜轉型正義", "社會面對大規模侵害的司法與非司法措施。", "包含審判、真相、賠償與制度改革。"], ["Non-discrimination｜不歧視", "法律與政策不得因身分而否定平等保障。", "它讓普遍人權在日常制度中真正適用。"], ["Universal jurisdiction｜普遍管轄", "特定嚴重國際罪不受犯罪地限制即可追訴。", "它減少責任人利用國界逃避司法。"], ["Prevention｜預防", "在侵害發生前辨識風險並改變制度條件。", "可持續和平需要早期警示與保護機制。"]],
        quiz: [["究責和報復有何不同？", "究責依證據、法律程序與補救運作，目的在建立可預期的正義。"], ["為何不歧視與和平有關？", "制度性排除會累積傷害與衝突；平等保障降低這些結構性風險。"], ["轉型正義只有刑事審判嗎？", "不是，還包括真相調查、賠償、紀念與制度改革。"]]
      },
      en: {
        name: "Peace", topic: "Build peace through rights and accountability",
        book: { meta: "POLICY PUBLICATION · 2012", title: "Born Free and Equal", author: "OHCHR · Foreword by Navi Pillay", heading: "Five duties that make equality practical", byline: "Born Free and Equal · OHCHR · Foreword by Navi Pillay", intro: "This is an OHCHR policy publication—not a personal book by Pillay. Her foreword frames a practical guide to applying existing international human-rights law to violence and discrimination against LGBT people.", connection: "It turns the prize’s institutional perspective into an actionable list: peace includes legal protection, equality and public systems that can be held accountable.", highlights: [["Protect life and dignity", "States must prevent and investigate homophobic and transphobic violence, torture and degrading treatment."], ["Equality is not a special right", "Decriminalisation and non-discrimination apply protections already guaranteed to every person."], ["Turn law into action", "Examples connect legal duties to policing, courts, policy, expression and association."]], source: "https://cambodia.ohchr.org/en/content/born-free-and-equal-0", sourceLabel: "OHCHR publication page ↗" },
        terms: [["Accountability", "Establishing violations, responsibility and remedy.", "Peace without accountability can preserve structures of violence."], ["International criminal law", "Law addressing genocide, war crimes and crimes against humanity.", "It makes grave abuses legally answerable."], ["Transitional justice", "Judicial and non-judicial responses to widespread abuse.", "It includes trials, truth, reparations and institutional reform."], ["Non-discrimination", "Law and policy must not deny equal protection because of identity.", "It makes universal rights practical in daily institutions."], ["Universal jurisdiction", "Certain grave crimes may be prosecuted regardless of where they occurred.", "It limits the use of borders to escape justice."], ["Prevention", "Identifying risk and changing conditions before violations occur.", "Durable peace needs early warning and protection mechanisms."]],
        quiz: [["How is accountability different from revenge?", "It works through evidence, due process and remedy to build predictable justice."], ["Why is non-discrimination connected to peace?", "Systemic exclusion accumulates harm and conflict; equal protection reduces that structural risk."], ["Is transitional justice only criminal trials?", "No. It also includes truth, reparations, memorialisation and institutional reform."]]
      }
    },
    "06_economic_sciences": {
      tc: {
        name: "經濟學獎", topic: "以微觀基礎穩定總體經濟",
        book: { meta: "得主著作 · 2003", title: "Interest and Prices", author: "Michael Woodford", heading: "不以貨幣總量為目標的貨幣政策", byline: "Interest and Prices: Foundations of a Theory of Monetary Policy · Michael Woodford", intro: "Woodford 以利率決策、預期與明確規則重建貨幣政策分析，說明中央銀行即使不鎖定貨幣總量，也能穩定物價與經濟活動。", connection: "它把獎項的數學模型轉化為政策框架：家庭、企業和中央銀行的前瞻決策可在同一套方程中比較。", highlights: [["預期會推動經濟", "家庭與企業對未來政策的預期，會改變現在的支出、定價與通膨。"], ["規則建立可信度", "系統化的利率反應，比臨時決策更能錨定通膨預期。"], ["政策必須接受福利檢驗", "物價穩定與產出穩定需一起評估，重點是政策能減少哪些扭曲。"]], source: "https://ingramacademic.com/products/interest-and-prices-9780691010496?variant=42955737727094", sourceLabel: "出版社目錄頁面 ↗" },
        terms: [["Rational expectations｜理性預期", "經濟主體以可用資訊與模型形成對未來的預期。", "政策承諾會透過預期影響現在的決策。"], ["Consumption smoothing｜消費平滑", "家庭在不同時期分配支出以避免消費劇烈波動。", "暫時所得變化不一定等量改變當期消費。"], ["Euler equation｜歐拉方程", "連結今天與未來邊際效用的跨期最佳化條件。", "它是消費與利率關係的核心微觀基礎。"], ["Price stickiness｜價格僵固", "價格不會在新資訊出現後立即完全調整。", "因此需求與利率政策會影響實質產出。"], ["Output gap｜產出缺口", "實際產出與無價格僵固下自然產出的差距。", "它反映景氣壓力和資源配置扭曲。"], ["Policy rule｜政策規則", "利率對通膨與產出狀況的系統性反應。", "透明規則可改善預期管理與政策可信度。"]],
        quiz: [["為何預期會影響今天的經濟？", "家庭與企業會根據未來利率、價格與所得調整現在的支出和定價。"], ["價格僵固為何讓貨幣政策有效？", "價格不能立即調整時，名目利率和需求變動會影響實質產出。"], ["政策規則的主要優點是什麼？", "它讓反應方式可預期，有助錨定通膨預期並減少任意決策。"]]
      },
      en: {
        name: "Economic Sciences", topic: "Stabilise the macroeconomy from micro foundations",
        book: { meta: "LAUREATE BOOK · 2003", title: "Interest and Prices", author: "Michael Woodford", heading: "Monetary policy after money targeting", byline: "Interest and Prices: Foundations of a Theory of Monetary Policy · Michael Woodford", intro: "Woodford rebuilds monetary-policy analysis around interest-rate decisions, expectations and explicit rules, explaining how a central bank can stabilise prices and activity without targeting a monetary aggregate.", connection: "It turns the prize’s mathematics into a policy framework: forward-looking households, firms and central banks can be compared in one system of equations.", highlights: [["Expectations move the economy", "Expected future policy changes current spending, pricing and inflation."], ["Rules improve credibility", "Systematic interest-rate responses anchor inflation expectations better than improvisation."], ["Policy has a welfare test", "Price and output stability are evaluated through the distortions policy can reduce."]], source: "https://ingramacademic.com/products/interest-and-prices-9780691010496?variant=42955737727094", sourceLabel: "Publisher catalogue page ↗" },
        terms: [["Rational expectations", "Expectations formed from available information and a model of the economy.", "Policy commitments affect current decisions through expectations."], ["Consumption smoothing", "Spreading spending over time to avoid abrupt consumption changes.", "A temporary income change need not translate one-for-one into current consumption."], ["Euler equation", "An intertemporal optimality condition linking marginal utility today and tomorrow.", "It supplies the micro foundation for consumption and interest rates."], ["Price stickiness", "Prices do not fully adjust as soon as new information arrives.", "Demand and interest-rate policy can therefore affect real output."], ["Output gap", "The difference between actual and natural output without price frictions.", "It measures cyclical pressure and allocation distortions."], ["Policy rule", "A systematic interest-rate response to inflation and output conditions.", "Transparent rules improve expectations and credibility."]],
        quiz: [["Why do expectations affect the economy today?", "Households and firms change current spending and prices in response to expected future rates, prices and income."], ["Why does price stickiness make monetary policy effective?", "When prices cannot adjust immediately, nominal rates and demand changes alter real output."], ["What is the main benefit of a policy rule?", "Predictable responses help anchor inflation expectations and limit arbitrary decisions."]]
      }
    }
  };

  const stationCopy = {
    tc: {
      eyebrow: "AWARD REVIEW HUB · 獎項複習中心", title: "五站完成一個獎項", intro: "先掌握一句核心發現，再依序操作、觀看、閱讀與回想。完成狀態只儲存在這個裝置。", complete: "完成", pending: "待複習", progress: "複習進度", mark: "標記完成", undo: "✓ 已完成", open: "開啟專注頁 →", current: "本頁完成 →",
      stations: {
        overview: ["一分鐘摘要", "得主、獲獎理由與核心因果鏈。"], demo: ["互動 Demo", "用動態視覺、曲線和參數看見機制。"], yt3: ["YT3 三視角", "正式公布、主題解說與得主第一人稱。"], book: ["Book 閱讀", "用三個重要觀點連結著作與獎項。"], terms: ["Terms 回想", "掌握六個關鍵詞，再做三題快速檢查。"]
      },
      home: "HOME", award: "獎項中心", next: "下一站", bookKicker: "BOOK · FOCUSED STUDY", termsKicker: "TERMS · ACTIVE RECALL", bookIntro: "閱讀代表著作，理解獎項如何進入更完整的思想與實踐脈絡。", termsIntro: "不用背整頁文章；先準確說明六個詞，再用三題確認自己能否重建核心機制。", connection: "與獎項的連結", source: "核實來源", quick: "三題快速自我檢查", reveal: "點開查看答案", preview: "預覽三個重要觀點", focusedBook: "開啟 Book 專注頁 →", focusedTerms: "開啟 Terms 回想頁 →", created: "Kevin 製作 · 三層複習架構"
    },
    en: {
      eyebrow: "AWARD REVIEW HUB", title: "Five stations complete one award", intro: "Capture the central finding, then interact, watch, read and recall. Completion stays on this device.", complete: "DONE", pending: "TO REVIEW", progress: "Review progress", mark: "Mark complete", undo: "✓ Completed", open: "Open focus page →", current: "Complete this page →",
      stations: {
        overview: ["One-minute overview", "Laureates, citation and the central causal chain."], demo: ["Interactive Demo", "See the mechanism through motion, plots and parameters."], yt3: ["YT3 three views", "Official announcement, explainer and first-person route."], book: ["Book reading", "Connect a representative work to the prize in three ideas."], terms: ["Terms recall", "Master six terms, then answer three quick checks."]
      },
      home: "HOME", award: "Award Hub", next: "Next station", bookKicker: "BOOK · FOCUSED STUDY", termsKicker: "TERMS · ACTIVE RECALL", bookIntro: "Read a representative work and connect the award to its wider intellectual and practical setting.", termsIntro: "Do not memorise a whole page. Explain six terms precisely, then rebuild the mechanism with three checks.", connection: "Connection to the prize", source: "Verified source", quick: "Three quick checks", reveal: "Open to reveal the answer", preview: "Preview three significant ideas", focusedBook: "Open focused Book page →", focusedTerms: "Open Terms recall page →", created: "Created by Kevin · Three-layer review"
    }
  };

  function normalizeRoute(path) {
    let normalized = decodeURIComponent(path).replace(/^\/+/, "");
    if (!normalized) return normalized;
    if (normalized.endsWith("/")) return `${normalized}index.html`;
    const leaf = normalized.split("/").pop();
    if (!leaf.includes(".")) normalized += /^(?:index|index-tc|index-en|yt3|book|terms)$/.test(leaf) ? ".html" : "/index.html";
    return normalized;
  }

  const relativePath = normalizeRoute(current.pathname.slice(siteRoot.pathname.length));
  const slug = relativePath.match(/^(0[1-6]_[^/]+)\//)?.[1] || "";
  const isHome = !relativePath || /^index(?:-tc|-en)?\.html$/.test(relativePath);
  const pageType = slug && (
    /\/demo\/index\.html$/.test(relativePath) ? "demo" :
    /\/yt3\.html$/.test(relativePath) ? "yt3" :
    /\/book\.html$/.test(relativePath) ? "book" :
    /\/terms\.html$/.test(relativePath) ? "terms" :
    /\/index(?:-tc|-en)?\.html$/.test(relativePath) ? "overview" : "profile"
  );

  function storageKey(award, station) { return `nobel-review-v13:${award}:${station}`; }
  function isDone(award, station) { try { return localStorage.getItem(storageKey(award, station)) === "1"; } catch { return false; } }
  function setDone(award, station, value) { try { localStorage.setItem(storageKey(award, station), value ? "1" : "0"); } catch {} }
  function countDone(award) { return stationKeys.filter((station) => isDone(award, station)).length; }
  function language() { return document.documentElement.lang === "zh-Hant" ? "tc" : "en"; }
  function suffix(lang) { return lang === "en" ? "?lang=en" : ""; }
  function urlFor(award, station, lang) {
    const root = new URL(`${award}/`, siteRoot);
    const routes = { overview: lang === "tc" ? "index-tc.html" : "index.html?lang=en", demo: `demo/${suffix(lang)}`, yt3: `yt3.html${suffix(lang)}`, book: `book.html${suffix(lang)}`, terms: `terms.html${suffix(lang)}` };
    return new URL(routes[station], root).href;
  }
  function homeUrl(lang) { return new URL(lang === "tc" ? "index.html" : "index-en.html", siteRoot).href; }

  function addStyle() {
    if (document.querySelector('link[data-review-flow]')) return;
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = new URL("review-flow.css", scriptUrl).href;
    css.dataset.reviewFlow = "true";
    document.head.append(css);
  }

  function progressMarkup(award, lang) {
    const copy = stationCopy[lang];
    const n = countDone(award);
    return `<div class="review-total-row"><span>${copy.progress}</span><strong data-review-progress="${award}">${n} / 5</strong></div><div class="award-review-track"><i data-review-fill="${award}" style="width:${n * 20}%"></i></div>`;
  }

  function refreshState() {
    Object.keys(awards).forEach((award) => {
      const n = countDone(award);
      document.querySelectorAll(`[data-review-progress="${award}"]`).forEach((node) => { node.textContent = `${n} / 5`; });
      document.querySelectorAll(`[data-review-fill="${award}"]`).forEach((node) => { node.style.width = `${n * 20}%`; });
      stationKeys.forEach((station) => {
        const done = isDone(award, station);
        document.querySelectorAll(`[data-review-item="${award}:${station}"]`).forEach((node) => node.classList.toggle("done", done));
        document.querySelectorAll(`[data-review-state="${award}:${station}"]`).forEach((node) => { node.textContent = done ? stationCopy[language()].complete : stationCopy[language()].pending; });
        document.querySelectorAll(`[data-review-toggle="${award}:${station}"]`).forEach((node) => { node.classList.toggle("done", done); node.textContent = done ? stationCopy[language()].undo : stationCopy[language()].mark; node.setAttribute("aria-pressed", String(done)); });
      });
    });
  }

  function bindToggles() {
    document.querySelectorAll("[data-review-toggle]").forEach((button) => {
      if (button.dataset.bound) return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        const [award, station] = button.dataset.reviewToggle.split(":");
        setDone(award, station, !isDone(award, station));
        refreshState();
      });
    });
  }

  function enhanceHome(lang) {
    const copy = stationCopy[lang];
    const cards = [...document.querySelectorAll(".award-card")];
    Object.keys(awards).forEach((award, index) => {
      const card = cards[index];
      if (!card || card.querySelector(".award-review-meta")) return;
      const n = countDone(award);
      const meta = document.createElement("div");
      meta.className = "award-review-meta";
      meta.innerHTML = `<div class="award-review-progress"><span>${copy.progress}</span><b data-review-progress="${award}">${n} / 5</b></div><div class="award-review-track"><i data-review-fill="${award}" style="width:${n * 20}%"></i></div><div class="award-module-chips">${stationKeys.map((station) => `<span data-review-item="${award}:${station}" class="${isDone(award, station) ? "done" : ""}">${copy.stations[station][0]}</span>`).join("")}</div>`;
      const footer = card.querySelector("footer");
      if (footer) {
        card.insertBefore(meta, footer);
        footer.innerHTML = `${n ? (lang === "tc" ? "繼續複習" : "Continue review") : (lang === "tc" ? "開始複習" : "Start review")} <b>→</b>`;
      }
    });
  }

  function stationCard(award, station, index, lang) {
    const copy = stationCopy[lang];
    const done = isDone(award, station);
    const [title, description] = copy.stations[station];
    const action = station === "overview"
      ? `<button data-review-toggle="${award}:${station}" aria-pressed="${done}">${done ? copy.undo : copy.current}</button>`
      : `<a href="${urlFor(award, station, lang)}">${copy.open}</a>`;
    return `<article class="review-station ${done ? "done" : ""}" data-review-item="${award}:${station}"><div class="review-station-top"><span class="review-station-step">0${index + 1}</span><span class="review-station-state" data-review-state="${award}:${station}">${done ? copy.complete : copy.pending}</span></div><h3>${title}</h3><p>${description}</p>${action}</article>`;
  }

  function addReviewHub(award, lang) {
    const hero = document.querySelector(".topic-hero");
    if (!hero || document.querySelector(".review-hub")) return;
    hero.id = "overview";
    const copy = stationCopy[lang];
    const section = document.createElement("section");
    section.className = "review-hub";
    section.innerHTML = `<div class="review-hub-inner"><div class="review-hub-head"><div><p class="kicker">${copy.eyebrow}</p><h2>${copy.title}</h2><p>${copy.intro}</p></div><div class="review-total">${progressMarkup(award, lang)}</div></div><div class="review-path-grid">${stationKeys.map((station, index) => stationCard(award, station, index, lang)).join("")}</div></div>`;
    hero.insertAdjacentElement("afterend", section);
    bindToggles();
  }

  function enhanceBookPreview(award, lang) {
    const feature = document.querySelector(".book-feature");
    if (!feature || feature.classList.contains("book-preview-mode")) return;
    feature.classList.add("book-preview-mode");
    const highlights = feature.querySelector(".book-highlights");
    if (highlights) {
      const details = document.createElement("details");
      details.className = "book-preview-details";
      const summary = document.createElement("summary");
      summary.textContent = stationCopy[lang].preview;
      highlights.replaceWith(details);
      details.append(summary, highlights);
    }
    const copy = feature.querySelector(".book-copy");
    if (copy) {
      const actions = document.createElement("div");
      actions.className = "book-preview-actions";
      actions.innerHTML = `<a class="primary" href="${urlFor(award, "book", lang)}">${stationCopy[lang].focusedBook}</a><a class="secondary" href="${urlFor(award, "terms", lang)}">${stationCopy[lang].focusedTerms}</a>`;
      copy.append(actions);
    }
  }

  function setModuleHeader(award, type, lang) {
    const header = document.querySelector("header.site-nav");
    if (!header) return;
    const config = awards[award][lang];
    const first = header.querySelector("nav a");
    if (first) { first.textContent = config.name; first.href = urlFor(award, "overview", lang); }
    const label = header.querySelector(":scope > b");
    if (label) label.textContent = type === "book" ? "BOOK · FOCUSED STUDY" : "TERMS · ACTIVE RECALL";
  }

  function renderBook(award, lang) {
    const config = awards[award][lang];
    const book = config.book;
    const main = document.querySelector("#review-module");
    if (!main) return;
    document.title = `NOBEL2026 ${config.name} Book ${lang === "tc" ? "TC" : "EN"} V13`;
    main.className = "focused-module";
    main.innerHTML = `<div class="focused-module-inner"><section class="focused-hero"><div><p class="kicker">${stationCopy[lang].bookKicker}</p><h1>${book.heading}</h1></div><p>${stationCopy[lang].bookIntro}</p></section><section class="focused-book"><div class="book-cover"><small>${book.meta}</small><strong class="${book.title.length > 32 ? "long-title" : ""}">${book.title}</strong><b>${book.author}</b></div><div class="focused-book-copy"><p class="kicker">${config.topic}</p><h2>${book.heading}</h2><p class="book-byline"><cite>${book.byline}</cite></p><p class="book-intro">${book.intro}</p><div class="book-highlights">${book.highlights.map((item, index) => `<article><span>0${index + 1}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("")}</div><div class="focused-source-note"><b>${stationCopy[lang].connection}</b><br>${book.connection}</div><a class="book-source" href="${book.source}" target="_blank" rel="noreferrer">${book.sourceLabel}</a></div></section></div>`;
    setModuleHeader(award, "book", lang);
  }

  function renderTerms(award, lang) {
    const config = awards[award][lang];
    const main = document.querySelector("#review-module");
    if (!main) return;
    document.title = `NOBEL2026 ${config.name} Terms ${lang === "tc" ? "TC" : "EN"} V13`;
    main.className = "focused-module";
    main.innerHTML = `<div class="focused-module-inner"><section class="focused-hero"><div><p class="kicker">${stationCopy[lang].termsKicker}</p><h1>${config.name}<br>${lang === "tc" ? "六個關鍵詞" : "Six key terms"}</h1></div><p>${stationCopy[lang].termsIntro}</p></section><section class="terms-grid">${config.terms.map((term, index) => `<article class="term-card"><small>TERM 0${index + 1}</small><h2>${term[0]}</h2><p>${term[1]}</p><b>${term[2]}</b></article>`).join("")}</section><section class="quick-check"><p class="kicker">${stationCopy[lang].reveal}</p><h2>${stationCopy[lang].quick}</h2>${config.quiz.map((item, index) => `<details><summary>0${index + 1} · ${item[0]}</summary><p>${item[1]}</p></details>`).join("")}</section></div>`;
    setModuleHeader(award, "terms", lang);
  }

  function addContext(award, type, lang) {
    const header = document.querySelector(".site-nav, .profile-nav, .topbar");
    if (!header || document.querySelector(".review-context")) return;
    const config = awards[award][lang];
    const copy = stationCopy[lang];
    const label = type === "profile" ? (lang === "tc" ? "得主深度頁" : "Laureate deep dive") : copy.stations[type][0];
    const stationIndex = stationKeys.indexOf(type);
    const nextStation = stationIndex >= 0 && stationIndex < stationKeys.length - 1 ? stationKeys[stationIndex + 1] : "overview";
    const context = document.createElement("div");
    context.className = "review-context";
    context.innerHTML = `<nav class="review-breadcrumb" aria-label="Breadcrumb"><a href="${homeUrl(lang)}">${copy.home}</a><b>／</b><a href="${urlFor(award, "overview", lang)}">${config.name}</a><b>／</b><span>${label}</span></nav><div class="review-context-actions"><a href="${urlFor(award, "overview", lang)}">← ${copy.award}</a>${type !== "profile" ? `<a href="${urlFor(award, nextStation, lang)}">${copy.next} →</a><button class="station-complete" data-review-toggle="${award}:${type}">${isDone(award, type) ? copy.undo : copy.mark}</button>` : ""}</div>`;
    header.insertAdjacentElement("afterend", context);
    const dock = document.createElement("nav");
    dock.className = "review-mobile-dock";
    dock.setAttribute("aria-label", lang === "tc" ? "行動版複習導覽" : "Mobile review navigation");
    dock.innerHTML = `<a href="${homeUrl(lang)}">⌂<br>${copy.home}</a><a href="${urlFor(award, "overview", lang)}">←<br>${copy.award}</a><a class="current" href="${urlFor(award, nextStation, lang)}">→<br>${copy.next}</a>`;
    document.body.append(dock);
    document.body.classList.add("has-review-dock");
    bindToggles();
  }

  function syncYT3(award) {
    const key = document.body.dataset.reviewKey;
    if (!key) return;
    try {
      if ([0, 1, 2].every((index) => localStorage.getItem(`${key}-${index}`) === "1")) setDone(award, "yt3", true);
    } catch {}
  }

  function init() {
    addStyle();
    const lang = language();
    if (isHome) { enhanceHome(lang); refreshState(); return; }
    if (!slug || !awards[slug]) return;
    if (pageType === "overview") {
      addReviewHub(slug, lang);
      enhanceBookPreview(slug, lang);
    } else {
      if (pageType === "book") renderBook(slug, lang);
      if (pageType === "terms") renderTerms(slug, lang);
      if (pageType === "yt3") syncYT3(slug);
      addContext(slug, pageType, lang);
    }
    refreshState();
  }

  window.addEventListener("nobel:reviewprogress", (event) => {
    if (slug && pageType === "yt3" && event.detail?.reviewed === 3) {
      setDone(slug, "yt3", true);
      refreshState();
    }
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
