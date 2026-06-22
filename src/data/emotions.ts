import type { EmotionOption } from "../types";

/**
 * 感情語彙リスト（カテゴリ付き）
 * -----------------------------------------------------------------------
 * NVCの感情語彙の考え方をベースに独自整理した語彙セット。
 * Step2ではカテゴリ単位でアコーディオン表示する。
 */
export const EMOTION_LIBRARY: EmotionOption[] = [

  // =========================================================
  // uncomfortable — ニーズが満たされていないとき
  // =========================================================

  // 怒り
  { id: "iira",            label: "イライラ",           category: "怒り",    tone: "uncomfortable" },
  { id: "okori",           label: "怒り",               category: "怒り",    tone: "uncomfortable" },
  { id: "hara",            label: "腹が立つ",           category: "怒り",    tone: "uncomfortable" },
  { id: "ikidoori",        label: "憤り",               category: "怒り",    tone: "uncomfortable" },
  { id: "mukamuka",        label: "むかむか",           category: "怒り",    tone: "uncomfortable" },
  { id: "mushakusha",      label: "むしゃくしゃする",   category: "怒り",    tone: "uncomfortable" },
  { id: "fumanzoku",       label: "面白くない",         category: "怒り",    tone: "uncomfortable" },
  { id: "fukigen",         label: "不機嫌",             category: "怒り",    tone: "uncomfortable" },
  { id: "shakuni",         label: "しゃくにさわる",     category: "怒り",    tone: "uncomfortable" },
  { id: "mukatsuku",       label: "むかつく",           category: "怒り",    tone: "uncomfortable" },
  { id: "fuyukai",         label: "不愉快",             category: "怒り",    tone: "uncomfortable" },
  { id: "hageshii_ikari",  label: "激しい怒り",         category: "怒り",    tone: "uncomfortable" },

  // 反感
  { id: "nikutarashii",    label: "憎たらしい",         category: "反感",    tone: "uncomfortable" },
  { id: "imaimashii",      label: "いまいましい",       category: "反感",    tone: "uncomfortable" },
  { id: "urami",           label: "恨みに思う",         category: "反感",    tone: "uncomfortable" },
  { id: "nigaigai",        label: "苦々しい",           category: "反感",    tone: "uncomfortable" },
  { id: "utomaashii",      label: "うとましい",         category: "反感",    tone: "uncomfortable" },
  { id: "ken_o",           label: "嫌悪感",             category: "反感",    tone: "uncomfortable" },
  { id: "fuman",           label: "不満",               category: "反感",    tone: "uncomfortable" },
  { id: "gaman_naranai",   label: "我慢ならない",       category: "反感",    tone: "uncomfortable" },
  { id: "keibetsu",        label: "軽蔑した",           category: "反感",    tone: "uncomfortable" },
  { id: "kutsujoku",       label: "くつじょくな感じ",   category: "反感",    tone: "uncomfortable" },

  // モヤモヤ
  { id: "ochitsukanai",    label: "落ち着かない",       category: "モヤモヤ", tone: "uncomfortable" },
  { id: "kigakari",        label: "気がかり",           category: "モヤモヤ", tone: "uncomfortable" },
  { id: "yakimoki",        label: "やきもきする",       category: "モヤモヤ", tone: "uncomfortable" },
  { id: "kusakusa",        label: "くさくさした",       category: "モヤモヤ", tone: "uncomfortable" },
  { id: "jirettai",        label: "じれったい",         category: "モヤモヤ", tone: "uncomfortable" },
  { id: "modokashii",      label: "もどかしい",         category: "モヤモヤ", tone: "uncomfortable" },
  { id: "kyuukutsu",       label: "窮屈な",             category: "モヤモヤ", tone: "uncomfortable" },
  { id: "itatamarenai",    label: "いたたまれない",     category: "モヤモヤ", tone: "uncomfortable" },
  { id: "hagayui",         label: "歯がゆい",           category: "モヤモヤ", tone: "uncomfortable" },
  { id: "kokoronokori",    label: "心残りな",           category: "モヤモヤ", tone: "uncomfortable" },
  { id: "horonigai",       label: "ほろ苦い",           category: "モヤモヤ", tone: "uncomfortable" },

  // 悲しみ
  { id: "kanashii",        label: "悲しい",             category: "悲しみ",  tone: "uncomfortable" },
  { id: "mono_kanashii",   label: "物悲しい",           category: "悲しみ",  tone: "uncomfortable" },
  { id: "mune_ga_itai",    label: "胸が痛い",           category: "悲しみ",  tone: "uncomfortable" },
  { id: "hikisakareru",    label: "引き裂かれる感じ",   category: "悲しみ",  tone: "uncomfortable" },
  { id: "kokoro_kurushii", label: "心苦しい",           category: "悲しみ",  tone: "uncomfortable" },
  { id: "kizutsuita",      label: "傷ついた",           category: "悲しみ",  tone: "uncomfortable" },
  { id: "fusaida",         label: "ふさいだ",           category: "悲しみ",  tone: "uncomfortable" },
  { id: "zannen",          label: "残念な",             category: "悲しみ",  tone: "uncomfortable" },
  { id: "kuyokuyo",        label: "くよくよした",       category: "悲しみ",  tone: "uncomfortable" },
  { id: "kokai",           label: "後悔",               category: "悲しみ",  tone: "uncomfortable" },
  { id: "gen_nari",        label: "げんなりする",       category: "悲しみ",  tone: "uncomfortable" },
  { id: "nageki",          label: "嘆き",               category: "悲しみ",  tone: "uncomfortable" },

  // 寂しさ
  { id: "sabishii",        label: "寂しい",             category: "寂しさ",  tone: "uncomfortable" },
  { id: "kodoku",          label: "孤独",               category: "寂しさ",  tone: "uncomfortable" },
  { id: "tori_nokosare",   label: "取り残された感じ",   category: "寂しさ",  tone: "uncomfortable" },
  { id: "munashii",        label: "空しい",             category: "寂しさ",  tone: "uncomfortable" },
  { id: "shizunda",        label: "沈んだ",             category: "寂しさ",  tone: "uncomfortable" },
  { id: "mono_tarinai",    label: "物足りない",         category: "寂しさ",  tone: "uncomfortable" },
  { id: "tsurai",          label: "つらい",             category: "寂しさ",  tone: "uncomfortable" },
  { id: "yarusenai",       label: "やるせない",         category: "寂しさ",  tone: "uncomfortable" },
  { id: "toho_ni_kureru",  label: "途方に暮れる",       category: "寂しさ",  tone: "uncomfortable" },
  { id: "sogai_kan",       label: "のけ者にされた感じ", category: "寂しさ",  tone: "uncomfortable" },
  { id: "setsunai",        label: "せつない",           category: "寂しさ",  tone: "uncomfortable" },
  { id: "wabishii",        label: "わびしい",           category: "寂しさ",  tone: "uncomfortable" },
  { id: "shimmiri",        label: "しんみり",           category: "寂しさ",  tone: "uncomfortable" },

  // 不安
  { id: "kokoro_bosoi",    label: "心細い",             category: "不安",    tone: "uncomfortable" },
  { id: "fuan",            label: "不安",               category: "不安",    tone: "uncomfortable" },
  { id: "shinpai",         label: "心配",               category: "不安",    tone: "uncomfortable" },
  { id: "kincho",          label: "緊張",               category: "不安",    tone: "uncomfortable" },
  { id: "haridzumeta",     label: "張り詰めた",         category: "不安",    tone: "uncomfortable" },
  { id: "bikubiku",        label: "びくびく",           category: "不安",    tone: "uncomfortable" },
  { id: "ishuku",          label: "萎縮する",           category: "不安",    tone: "uncomfortable" },
  { id: "aseri",           label: "焦り",               category: "不安",    tone: "uncomfortable" },
  { id: "harahara",        label: "はらはら",           category: "不安",    tone: "uncomfortable" },
  { id: "tamerau",         label: "ためらう",           category: "不安",    tone: "uncomfortable" },

  // 恐れ
  { id: "kowai",           label: "怖い",               category: "恐れ",    tone: "uncomfortable" },
  { id: "kowagaru",        label: "怖気づく",           category: "恐れ",    tone: "uncomfortable" },
  { id: "zotto",           label: "ぞっとする",         category: "恐れ",    tone: "uncomfortable" },
  { id: "miburuishiru",    label: "身震いする",         category: "恐れ",    tone: "uncomfortable" },
  { id: "osoroshii",       label: "恐ろしい",           category: "恐れ",    tone: "uncomfortable" },
  { id: "hiyatto",         label: "ひやっとする",       category: "恐れ",    tone: "uncomfortable" },
  { id: "obieru",          label: "おびえる",           category: "恐れ",    tone: "uncomfortable" },
  { id: "onononku",        label: "おののく",           category: "恐れ",    tone: "uncomfortable" },
  { id: "chi_no_ke",       label: "血の気が引く",       category: "恐れ",    tone: "uncomfortable" },
  { id: "okubyou",         label: "おくびょうな気持ち", category: "恐れ",    tone: "uncomfortable" },
  { id: "panikku",         label: "パニック",           category: "恐れ",    tone: "uncomfortable" },

  // 恥
  { id: "hazukashii",      label: "恥ずかしい",         category: "恥",      tone: "uncomfortable" },
  { id: "tereku_sai",      label: "照れくさい",         category: "恥",      tone: "uncomfortable" },
  { id: "batsu_ga_warui",  label: "ばつが悪い",         category: "恥",      tone: "uncomfortable" },
  { id: "nasakenai",       label: "情けない",           category: "恥",      tone: "uncomfortable" },
  { id: "menbokunai",      label: "面目ない",           category: "恥",      tone: "uncomfortable" },
  { id: "ushirometai",     label: "後ろめたい",         category: "恥",      tone: "uncomfortable" },
  { id: "mijime",          label: "みじめな",           category: "恥",      tone: "uncomfortable" },
  { id: "chiisaku_naru",   label: "小さくなる感じ",     category: "恥",      tone: "uncomfortable" },
  { id: "ki_okure",        label: "気後れする",         category: "恥",      tone: "uncomfortable" },
  { id: "munen",           label: "無念な",             category: "恥",      tone: "uncomfortable" },

  // 揺れ動く
  { id: "odoroku",         label: "驚く",               category: "揺れ動く", tone: "uncomfortable" },
  { id: "hatto",           label: "はっとする",         category: "揺れ動く", tone: "uncomfortable" },
  { id: "shogeki",         label: "衝撃",               category: "揺れ動く", tone: "uncomfortable" },
  { id: "doyo",            label: "動揺した",           category: "揺れ動く", tone: "uncomfortable" },
  { id: "gakuzen",         label: "がくぜんとした",     category: "揺れ動く", tone: "uncomfortable" },
  { id: "awateru",         label: "慌てる",             category: "揺れ動く", tone: "uncomfortable" },
  { id: "magotuku",        label: "まごつく",           category: "揺れ動く", tone: "uncomfortable" },
  { id: "akireru",         label: "あきれる",           category: "揺れ動く", tone: "uncomfortable" },
  { id: "bozen",           label: "ぼうぜんとした",     category: "揺れ動く", tone: "uncomfortable" },
  { id: "gakkari",         label: "がっかり",           category: "揺れ動く", tone: "uncomfortable" },
  { id: "hyoushi_nuke",    label: "拍子抜け",           category: "揺れ動く", tone: "uncomfortable" },
  { id: "kokugai",         label: "心外な",             category: "揺れ動く", tone: "uncomfortable" },
  { id: "zetsubou",        label: "絶望",               category: "揺れ動く", tone: "uncomfortable" },

  // 疲労
  { id: "bou_tto",         label: "ぼうっとした",       category: "疲労",    tone: "uncomfortable" },
  { id: "ki_ga_omoi",      label: "気が重い",           category: "疲労",    tone: "uncomfortable" },
  { id: "darui",           label: "だるい",             category: "疲労",    tone: "uncomfortable" },
  { id: "tsukareta",       label: "疲れた",             category: "疲労",    tone: "uncomfortable" },
  { id: "unzari",          label: "うんざり",           category: "疲労",    tone: "uncomfortable" },
  { id: "mukiryoku",       label: "無気力",             category: "疲労",    tone: "uncomfortable" },
  { id: "donyori",         label: "どんよりした",       category: "疲労",    tone: "uncomfortable" },
  { id: "muryoku_kan",     label: "無力感",             category: "疲労",    tone: "uncomfortable" },
  { id: "akiaki",          label: "飽き飽きした",       category: "疲労",    tone: "uncomfortable" },
  { id: "fuan_tei",        label: "不安定な",           category: "疲労",    tone: "uncomfortable" },
  { id: "mahi",            label: "まひした感じ",       category: "疲労",    tone: "uncomfortable" },
  { id: "arasunda",        label: "荒んだ",             category: "疲労",    tone: "uncomfortable" },

  // 妬み
  { id: "urayamashii",     label: "うらやましい",       category: "妬み",    tone: "uncomfortable" },
  { id: "netamashii",      label: "妬ましい",           category: "妬み",    tone: "uncomfortable" },
  { id: "kuyashii",        label: "悔しい",             category: "妬み",    tone: "uncomfortable" },
  { id: "kogare",          label: "焦がれる",           category: "妬み",    tone: "uncomfortable" },
  { id: "genmetsu",        label: "幻滅した",           category: "妬み",    tone: "uncomfortable" },

  // =========================================================
  // comfortable — ニーズが満たされているとき
  // =========================================================

  // 愛情
  { id: "itooshii",        label: "いとおしい",         category: "愛情",    tone: "comfortable" },
  { id: "koishii",         label: "恋しい",             category: "愛情",    tone: "comfortable" },
  { id: "kokoro_hikare",   label: "心惹かれる",         category: "愛情",    tone: "comfortable" },
  { id: "akogare",         label: "あこがれる",         category: "愛情",    tone: "comfortable" },
  { id: "uttori",          label: "うっとり",           category: "愛情",    tone: "comfortable" },
  { id: "shitashimi",      label: "親しみ",             category: "愛情",    tone: "comfortable" },
  { id: "natsukashii",     label: "懐かしい",           category: "愛情",    tone: "comfortable" },
  { id: "jiai",            label: "やさしい気持ち",     category: "愛情",    tone: "comfortable" },

  // 喜び
  { id: "ureshii",         label: "うれしい",           category: "喜び",    tone: "comfortable" },
  { id: "tanoshii",        label: "楽しい",             category: "喜び",    tone: "comfortable" },
  { id: "yorokobi",        label: "喜んでいる",         category: "喜び",    tone: "comfortable" },
  { id: "yukai",           label: "愉快な",             category: "喜び",    tone: "comfortable" },
  { id: "omoshiroi",       label: "面白い",             category: "喜び",    tone: "comfortable" },
  { id: "akarui",          label: "明るい",             category: "喜び",    tone: "comfortable" },
  { id: "hareyaka",        label: "晴れやか",           category: "喜び",    tone: "comfortable" },
  { id: "gokigen",         label: "ご機嫌な",           category: "喜び",    tone: "comfortable" },

  // エネルギッシュ
  { id: "yaruki",          label: "やる気に満ちている", category: "エネルギッシュ", tone: "comfortable" },
  { id: "rakkan_teki",     label: "楽観的",             category: "エネルギッシュ", tone: "comfortable" },
  { id: "maemuki",         label: "前向き",             category: "エネルギッシュ", tone: "comfortable" },
  { id: "genki",           label: "元気いっぱい",       category: "エネルギッシュ", tone: "comfortable" },
  { id: "chikara_minagiru",label: "力がみなぎる",       category: "エネルギッシュ", tone: "comfortable" },
  { id: "wakuwaku",        label: "ワクワクする",       category: "エネルギッシュ", tone: "comfortable" },
  { id: "ukiuki",          label: "ウキウキした",       category: "エネルギッシュ", tone: "comfortable" },
  { id: "fuwafuwa",        label: "ふわふわした",       category: "エネルギッシュ", tone: "comfortable" },
  { id: "koukishin",       label: "好奇心あふれる",     category: "エネルギッシュ", tone: "comfortable" },
  { id: "jounetsu",        label: "情熱あふれる",       category: "エネルギッシュ", tone: "comfortable" },

  // 落ち着いている
  { id: "odayaka",         label: "穏やかな",           category: "落ち着いている", tone: "comfortable" },
  { id: "relax",           label: "リラックスした",     category: "落ち着いている", tone: "comfortable" },
  { id: "ochitsuita",      label: "落ち着いた",         category: "落ち着いている", tone: "comfortable" },
  { id: "shizuka",         label: "静かな",             category: "落ち着いている", tone: "comfortable" },
  { id: "nonbiri",         label: "のんびりした",       category: "落ち着いている", tone: "comfortable" },
  { id: "kiraku",          label: "気楽な",             category: "落ち着いている", tone: "comfortable" },
  { id: "anshin",          label: "安心した",           category: "落ち着いている", tone: "comfortable" },
  { id: "kokoro_hiraita",  label: "心を開いた",         category: "落ち着いている", tone: "comfortable" },
  { id: "hotto",           label: "ほっとする",         category: "落ち着いている", tone: "comfortable" },
  { id: "yasuraka",        label: "安らかな",           category: "落ち着いている", tone: "comfortable" },
  { id: "sukuwareta",      label: "救われた",           category: "落ち着いている", tone: "comfortable" },
  { id: "yurunda",         label: "ゆるんだ",           category: "落ち着いている", tone: "comfortable" },

  // 幸福感
  { id: "michitariru",     label: "満ち足りている",     category: "幸福感",  tone: "comfortable" },
  { id: "atatakai",        label: "あたたかい",         category: "幸福感",  tone: "comfortable" },
  { id: "arigatai",        label: "ありがたい",         category: "幸福感",  tone: "comfortable" },
  { id: "kansha",          label: "感謝にあふれる",     category: "幸福感",  tone: "comfortable" },
  { id: "mune_ippai",      label: "胸がいっぱい",       category: "幸福感",  tone: "comfortable" },
  { id: "jujitsu",         label: "充実した",           category: "幸福感",  tone: "comfortable" },
  { id: "shiawase",        label: "幸せな",             category: "幸福感",  tone: "comfortable" },
  { id: "tassei_kan",      label: "達成感",             category: "幸福感",  tone: "comfortable" },
  { id: "kanki",           label: "歓喜",               category: "幸福感",  tone: "comfortable" },

  // 爽快感
  { id: "sukkiri",         label: "すっきり",           category: "爽快感",  tone: "comfortable" },
  { id: "sawayaka",        label: "さわやか",           category: "爽快感",  tone: "comfortable" },
  { id: "sappari",         label: "さっぱり",           category: "爽快感",  tone: "comfortable" },
  { id: "suzushii",        label: "清々しい",           category: "爽快感",  tone: "comfortable" },
  { id: "karoyaka",        label: "軽やか",             category: "爽快感",  tone: "comfortable" },
  { id: "kokochi_yoi",     label: "心地よい",           category: "爽快感",  tone: "comfortable" },
  { id: "togisuma",        label: "研ぎ澄まされた",     category: "爽快感",  tone: "comfortable" },

  // 心動かされる
  { id: "kando",           label: "感動した",           category: "心動かされる", tone: "comfortable" },
  { id: "jiinto_kuru",     label: "じーんとくる",       category: "心動かされる", tone: "comfortable" },
  { id: "dokidoki",        label: "ドキドキした",       category: "心動かされる", tone: "comfortable" },
  { id: "kyomi_shinshin",  label: "興味津々",           category: "心動かされる", tone: "comfortable" },
  { id: "hokorashii",      label: "誇らしい",           category: "心動かされる", tone: "comfortable" },
  { id: "odoroki_ii",      label: "驚いた（いい意味で）", category: "心動かされる", tone: "comfortable" },
  { id: "kanmei",          label: "感銘を受けた",       category: "心動かされる", tone: "comfortable" },
  { id: "mune_takanaru",   label: "胸が高鳴る",         category: "心動かされる", tone: "comfortable" },
  { id: "muchuu",          label: "夢中になる",         category: "心動かされる", tone: "comfortable" },
  { id: "hagema",          label: "励まされる",         category: "心動かされる", tone: "comfortable" },
  { id: "kangi_wamu",      label: "感極まる",           category: "心動かされる", tone: "comfortable" },
];

/** カテゴリ順序（不快寄りを先に） */
export const UNCOMFORTABLE_CATEGORIES = [
  "怒り", "反感", "モヤモヤ", "悲しみ", "寂しさ",
  "不安", "恐れ", "恥", "揺れ動く", "疲労", "妬み",
];
export const COMFORTABLE_CATEGORIES = [
  "愛情", "喜び", "エネルギッシュ", "落ち着いている",
  "幸福感", "爽快感", "心動かされる",
];

export const findEmotionById = (id: string): EmotionOption | undefined =>
  EMOTION_LIBRARY.find((e) => e.id === id);
