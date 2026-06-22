import type { NeedOption } from "../types";

/**
 * ニーズ辞書
 * -----------------------------------------------------------------------
 * NVC（非暴力コミュニケーション）の考え方をベースに、
 * 西任暁子氏の編著や一般的なNVCのニーズ・インベントリを参考に
 * 独自に整理した語彙セット。
 *
 * 「ニーズ」とは：特定の人・状況に依存しない、誰もが持つ普遍的な大切なもの。
 * 感情は「ニーズが満たされた/満たされなかった」ときに生まれるサインである。
 */
export const NEED_LIBRARY: NeedOption[] = [

  // ---- 意味 ----
  { id: "honmono", label: "本物であること", category: "意味", relevance: 2, description: "嘘や建前のない、ありのままの自分や関係でいられること" },
  { id: "utsukushisa", label: "美しさ", category: "意味", relevance: 2, description: "心が動くもの、美しいと感じるものに触れられること" },
  { id: "imi", label: "意味", category: "意味", relevance: 3, description: "していることや起きたことに、自分なりの意味を感じられること" },
  { id: "koukken", label: "貢献", category: "意味", relevance: 3, description: "自分の力が誰かや何かの役に立っていると感じられること" },
  { id: "mokuteki", label: "目的", category: "意味", relevance: 3, description: "何のためにやっているのか、自分の中で納得できること" },
  { id: "ikkansei", label: "一貫性", category: "意味", relevance: 2, description: "言うこととすることが食い違わず、一本筋が通っていること" },
  { id: "jiyu_imi", label: "自由", category: "意味", relevance: 3, description: "枠にはめられず、自分らしくいられること" },
  { id: "kibou", label: "希望", category: "意味", relevance: 3, description: "これからうまくいくかもしれないと感じられること" },
  { id: "yuuki", label: "勇気", category: "意味", relevance: 2, description: "怖くても一歩踏み出せる力があること" },
  { id: "shinri", label: "真理", category: "意味", relevance: 2, description: "本当のことを知りたい、本当のことを伝えたいという気持ち" },

  // ---- 生命・生活の維持 ----
  { id: "kenkou", label: "心身の健やかさ", category: "生命・生活", relevance: 2, description: "体も心も、無理なく健康でいられること" },
  { id: "seiri_seiton", label: "整理・整頓", category: "生命・生活", relevance: 2, description: "身の回りが整っていて、気持ちよくいられること" },
  { id: "sumai", label: "住まい", category: "生命・生活", relevance: 2, description: "安心して過ごせる場所があること" },
  { id: "hattatsu", label: "発達・発展", category: "生命・生活", relevance: 2, description: "自分がより良くなっていると感じられること" },
  { id: "chikara", label: "力・パワー", category: "生命・生活", relevance: 2, description: "何かを成し遂げる力が自分にあると感じられること" },
  { id: "dokuritsu_sei", label: "独立", category: "生命・生活", relevance: 2, description: "自分の力で立っていられること" },
  { id: "katsuryoku", label: "活力（イキイキ）", category: "生命・生活", relevance: 2, description: "生き生きとしたエネルギーを感じられること" },
  { id: "yutakasa", label: "豊かさ", category: "生命・生活", relevance: 2, description: "物質的・精神的にゆとりがある状態" },
  { id: "undou", label: "運動", category: "生命・生活", relevance: 2, description: "体を動かす機会や習慣があること" },

  // ---- 平和 ----
  { id: "anshin", label: "安心", category: "平和", relevance: 4, description: "脅かされず、安全でいると感じられること" },
  { id: "anzen", label: "安全", category: "平和", relevance: 4, description: "危険にさらされず、守られていること" },
  { id: "chitsujo", label: "秩序", category: "平和", relevance: 2, description: "物事が一定のルールや流れで進んでいること" },
  { id: "chouwa", label: "調和", category: "平和", relevance: 3, description: "周りとうまく折り合えていること" },
  { id: "antei", label: "安定", category: "平和", relevance: 3, description: "予測できる範囲で物事が進み、落ち着いていられること" },
  { id: "sasae", label: "支え・サポート", category: "平和", relevance: 3, description: "困ったときに頼れる人や仕組みがあること" },
  { id: "privacy", label: "プライバシー", category: "平和", relevance: 2, description: "自分だけの領域が守られていること" },
  { id: "heiwa", label: "平和", category: "平和", relevance: 2, description: "争いなく穏やかにいられること" },
  { id: "kousei", label: "公平", category: "平和", relevance: 3, description: "一方的でなく、対等に扱われること" },
  { id: "byoudou", label: "平等", category: "平和", relevance: 3, description: "差別なく、同じように扱われること" },
  { id: "songen", label: "尊厳", category: "平和", relevance: 4, description: "一人の人間として、軽く扱われないこと" },

  // ---- 休息 ----
  { id: "yutori", label: "ゆとり", category: "休息", relevance: 3, description: "心や時間に、せかされない余白があること" },
  { id: "kyuusoku", label: "休息・睡眠", category: "休息", relevance: 3, description: "無理をせず、心身を休められること" },
  { id: "space", label: "スペース・空間", category: "休息", relevance: 2, description: "自分だけの時間や空間があること" },
  { id: "kiraku", label: "気楽さ", category: "休息", relevance: 3, description: "肩の力を抜いて、楽でいられること" },
  { id: "muboubi", label: "無防備でいられること", category: "休息", relevance: 2, description: "気を張らず、ありのままでいられること" },
  { id: "kaitekisa", label: "快適さ", category: "休息", relevance: 2, description: "無理のない、楽な状態でいられること" },
  { id: "iyashi", label: "癒し", category: "休息", relevance: 3, description: "傷ついた心が、やわらかく回復できること" },
  { id: "shizukesa", label: "静けさ", category: "休息", relevance: 2, description: "騒がしさから離れて、静かにいられること" },

  // ---- 理解 ----
  { id: "meikakusa", label: "明確さ", category: "理解", relevance: 3, description: "何がどうなっているか、はっきりわかっていたいこと" },
  { id: "ukeireru", label: "受け入れてもらうこと", category: "理解", relevance: 4, description: "ありのままの自分を、拒否されずに受け入れてもらえること" },
  { id: "kiku", label: "聞いてもらうこと", category: "理解", relevance: 4, description: "自分の話を、ちゃんと耳を傾けて聞いてもらえること" },
  { id: "mite_morau", label: "見てもらうこと", category: "理解", relevance: 4, description: "自分の状況や気持ちを、きちんと見てもらえること" },
  { id: "mitomeru", label: "認めてもらうこと", category: "理解", relevance: 4, description: "自分の努力や存在そのものを認めてもらえること" },
  { id: "shiru", label: "知ること・知ってもらうこと", category: "理解", relevance: 3, description: "情報が共有されていて、置いてけぼりにならないこと" },
  { id: "rikai", label: "理解されること", category: "理解", relevance: 5, description: "自分の状況や気持ちを、ちゃんとわかってもらえること" },
  { id: "kyoukan", label: "共感されること", category: "理解", relevance: 5, description: "頑張りや苦しさに、そうだよねと寄り添ってもらえること" },
  { id: "sonzai_kan", label: "存在感", category: "理解", relevance: 3, description: "自分がそこにいることを、気にかけてもらえること" },
  { id: "kizuki", label: "気づき・発見", category: "理解", relevance: 2, description: "新しいことを知ったり、自分について気づけたりすること" },

  // ---- つながり ----
  { id: "shinrai", label: "信頼", category: "つながり", relevance: 4, description: "相手や状況を、安心して頼れると感じられること" },
  { id: "sanka", label: "参加すること", category: "つながり", relevance: 2, description: "仲間外れにならず、輪の中にいられること" },
  { id: "issho", label: "一緒にいること", category: "つながり", relevance: 3, description: "一人で抱え込まず、誰かと共にいると感じられること" },
  { id: "wakachiau", label: "わかち合うこと", category: "つながり", relevance: 3, description: "喜びや悲しみを、誰かと分かち合えること" },
  { id: "tsunagari", label: "つながり", category: "つながり", relevance: 4, description: "孤立せず、誰かと心が通じ合っている感覚" },
  { id: "comm", label: "コミュニケーション", category: "つながり", relevance: 3, description: "率直に、気持ちや考えを伝え合えること" },
  { id: "commu_naka", label: "コミュニティ・仲間", category: "つながり", relevance: 3, description: "同じ思いや場を共有できる仲間がいること" },
  { id: "shozoku", label: "所属・帰属", category: "つながり", relevance: 3, description: "「ここに居ていい」と感じられる場所があること" },
  { id: "kyoushin", label: "共振・共鳴", category: "つながり", relevance: 2, description: "気持ちや感覚が、誰かとシンクロする体験" },
  { id: "takameau", label: "高め合うこと", category: "つながり", relevance: 2, description: "お互いが良くなれるような関係でいること" },
  { id: "kyouryoku", label: "協力", category: "つながり", relevance: 3, description: "力を合わせて、何かを一緒に成し遂げること" },
  { id: "toumesei", label: "透明性", category: "つながり", relevance: 3, description: "隠し事なく、オープンにやり取りできること" },
  { id: "shimitsu", label: "親密さ", category: "つながり", relevance: 3, description: "心の距離が近く、打ち解けていられること" },
  { id: "fureau", label: "ふれあい", category: "つながり", relevance: 2, description: "人と直接触れ合うあたたかさを感じられること" },

  // ---- 思いやり ----
  { id: "hairyo", label: "配慮・気遣い", category: "思いやり", relevance: 4, description: "自分の事情や状況をくみ取ってもらえること" },
  { id: "omoiyari", label: "思いやり", category: "思いやり", relevance: 4, description: "相手の気持ちを大切にした関わりがあること" },
  { id: "yasashisa", label: "やさしさ", category: "思いやり", relevance: 3, description: "きつくあたられず、やわらかく接してもらえること" },
  { id: "seijitsu", label: "誠実さ", category: "思いやり", relevance: 3, description: "正直で、嘘や建前のないやり取りができること" },
  { id: "ai", label: "愛・愛情", category: "思いやり", relevance: 3, description: "大切に思われている、愛されていると感じられること" },
  { id: "atatakasa", label: "あたたかさ", category: "思いやり", relevance: 3, description: "冷たくあしらわれず、温かく接してもらえること" },
  { id: "sonkei", label: "尊敬・尊重", category: "思いやり", relevance: 4, description: "一人の人間として、丁寧に扱ってもらえること" },
  { id: "ouen", label: "応援", category: "思いやり", relevance: 3, description: "頑張りを見守り、背中を押してもらえること" },
  { id: "taisetsuni", label: "大切にされること", category: "思いやり", relevance: 5, description: "自分という存在そのものを大事にしてもらえること" },

  // ---- 遊び ----
  { id: "tanoshimi", label: "楽しみ", category: "遊び", relevance: 2, description: "心から楽しいと感じられる時間や体験があること" },
  { id: "manabi", label: "学び", category: "遊び", relevance: 2, description: "新しいことを知り、自分が広がっていく感覚" },
  { id: "koukishin_p", label: "好奇心", category: "遊び", relevance: 2, description: "興味が湧いて、もっと知りたいと思える気持ち" },
  { id: "shigeki", label: "刺激", category: "遊び", relevance: 2, description: "新鮮さや驚きが、日常の中にあること" },
  { id: "humor", label: "ユーモア", category: "遊び", relevance: 2, description: "笑いや軽さが、関係の中にあること" },
  { id: "souzousei", label: "創造性", category: "遊び", relevance: 2, description: "自分なりのやり方や発想を形にできること" },
  { id: "inspiration", label: "インスピレーション", category: "遊び", relevance: 2, description: "何かに触れて、心がひらめく体験ができること" },
  { id: "chousen", label: "挑戦", category: "遊び", relevance: 2, description: "難しいことに取り組む機会があること" },
  { id: "tankyuu", label: "探求", category: "遊び", relevance: 2, description: "深く掘り下げて考えたり、調べたりできること" },
  { id: "hyougen", label: "表現", category: "遊び", relevance: 2, description: "思っていることを、自分の言葉やかたちで表せること" },

  // ---- 自主性 ----
  { id: "jiritsu", label: "自立", category: "自主性", relevance: 3, description: "自分の力で物事を進められると感じられること" },
  { id: "sekinin", label: "責任", category: "自主性", relevance: 2, description: "自分で引き受け、やり遂げる機会があること" },
  { id: "seichou", label: "成長", category: "自主性", relevance: 3, description: "自分なりに前に進んでいる、学んでいると感じられること" },
  { id: "nouryoku", label: "能力", category: "自主性", relevance: 2, description: "自分の力が発揮できていると感じられること" },
  { id: "shoujiki", label: "正直さ", category: "自主性", relevance: 3, description: "自分に嘘をつかず、本音で生きられること" },
  { id: "jihatsusei", label: "自発性・自主性", category: "自主性", relevance: 3, description: "他人にコントロールされず、自分の意思で動けること" },
  { id: "jikaku", label: "自覚", category: "自主性", relevance: 2, description: "自分が何者で、何を大切にしているか、わかっていること" },
  { id: "sentaku", label: "選択", category: "自主性", relevance: 3, description: "一つのやり方を押し付けられず、選べる余地があること" },
  { id: "nagare", label: "流れ・フロー", category: "自主性", relevance: 2, description: "何かに没頭して、時間を忘れるほど集中できること" },
];

export const NEED_CATEGORIES_ORDERED = [
  "理解", "つながり", "思いやり", "平和", "休息",
  "自主性", "意味", "遊び", "生命・生活",
];

export const findNeedById = (id: string): NeedOption | undefined =>
  NEED_LIBRARY.find((n) => n.id === id);
