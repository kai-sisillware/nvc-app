/**
 * Netlify Function: dify-emotions
 * -----------------------------------------------------------------------
 * Step2（感情選択）で、観察文から最も関連する感情IDを推薦するDifyワークフロー。
 * 必要な環境変数（Netlifyのサイト設定で登録する）:
 *   DIFY_EMOTIONS_API_KEY ... Step2用ワークフローの API Key
 *   DIFY_API_BASE          ... 省略時は https://api.dify.ai/v1 を使用
 */

// 感情ライブラリ（Difyプロンプトに渡すコンパクト形式）
const EMOTION_LIST = `
怒り: iira(イライラ), okori(怒り), hara(腹が立つ), ikidoori(憤り), mukamuka(むかむか), mushakusha(むしゃくしゃする), fukigen(不機嫌), shakuni(しゃくにさわる), mukatsuku(むかつく), fuyukai(不愉快), hageshii_ikari(激しい怒り)
反感: nikutarashii(憎たらしい), imaimashii(いまいましい), urami(恨みに思う), nigaigai(苦々しい), utomaashii(うとましい), ken_o(嫌悪感), fuman(不満), gaman_naranai(我慢ならない), keibetsu(軽蔑した), kutsujoku(くつじょくな感じ)
モヤモヤ: ochitsukanai(落ち着かない), kigakari(気がかり), yakimoki(やきもきする), jirettai(じれったい), modokashii(もどかしい), kyuukutsu(窮屈な), itatamarenai(いたたまれない), hagayui(歯がゆい), kokoronokori(心残りな), horonigai(ほろ苦い)
悲しみ: kanashii(悲しい), mono_kanashii(物悲しい), mune_ga_itai(胸が痛い), kizutsuita(傷ついた), fusaida(ふさいだ), zannen(残念な), kuyokuyo(くよくよした), kokai(後悔), gen_nari(げんなりする), nageki(嘆き)
寂しさ: sabishii(寂しい), kodoku(孤独), tori_nokosare(取り残された感じ), munashii(空しい), shizunda(沈んだ), mono_tarinai(物足りない), tsurai(つらい), yarusenai(やるせない), toho_ni_kureru(途方に暮れる), sogai_kan(のけ者にされた感じ), setsunai(せつない), wabishii(わびしい), shimmiri(しんみり)
不安: kokoro_bosoi(心細い), fuan(不安), shinpai(心配), kincho(緊張), haridzumeta(張り詰めた), bikubiku(びくびく), ishuku(萎縮する), aseri(焦り), harahara(はらはら), tamerau(ためらう)
恐れ: kowai(怖い), kowagaru(怖気づく), zotto(ぞっとする), miburuishiru(身震いする), osoroshii(恐ろしい), hiyatto(ひやっとする), obieru(おびえる), onononku(おののく), chi_no_ke(血の気が引く), okubyou(おくびょうな気持ち), panikku(パニック)
恥: hazukashii(恥ずかしい), tereku_sai(照れくさい), batsu_ga_warui(ばつが悪い), nasakenai(情けない), menbokunai(面目ない), ushirometai(後ろめたい), mijime(みじめな), chiisaku_naru(小さくなる感じ), ki_okure(気後れする), munen(無念な)
揺れ動く: odoroku(驚く), hatto(はっとする), shogeki(衝撃), doyo(動揺した), gakuzen(がくぜんとした), awateru(慌てる), magotuku(まごつく), akireru(あきれる), bozen(ぼうぜんとした), gakkari(がっかり), hyoushi_nuke(拍子抜け), kokugai(心外な), zetsubou(絶望)
疲労: bou_tto(ぼうっとした), ki_ga_omoi(気が重い), darui(だるい), tsukareta(疲れた), unzari(うんざり), mukiryoku(無気力), donyori(どんよりした), muryoku_kan(無力感), akiaki(飽き飽きした), mahi(まひした感じ)
妬み: urayamashii(うらやましい), netamashii(妬ましい), kuyashii(悔しい), kogare(焦がれる), genmetsu(幻滅した)
愛情: itooshii(いとおしい), koishii(恋しい), kokoro_hikare(心惹かれる), akogare(あこがれる), uttori(うっとり), shitashimi(親しみ), natsukashii(懐かしい), jiai(やさしい気持ち)
喜び: ureshii(うれしい), tanoshii(楽しい), yorokobi(喜んでいる), yukai(愉快な), omoshiroi(面白い), akarui(明るい), hareyaka(晴れやか), gokigen(ご機嫌な)
エネルギッシュ: yaruki(やる気に満ちている), rakkan_teki(楽観的), maemuki(前向き), genki(元気いっぱい), chikara_minagiru(力がみなぎる), wakuwaku(ワクワクする), ukiuki(ウキウキした), fuwafuwa(ふわふわした), koukishin(好奇心あふれる), jounetsu(情熱あふれる)
落ち着いている: odayaka(穏やかな), relax(リラックスした), ochitsuita(落ち着いた), shizuka(静かな), nonbiri(のんびりした), kiraku(気楽な), anshin(安心した), kokoro_hiraita(心を開いた), hotto(ほっとする), yasuraka(安らかな), sukuwareta(救われた), yurunda(ゆるんだ)
幸福感: michitariru(満ち足りている), atatakai(あたたかい), arigatai(ありがたい), kansha(感謝にあふれる), mune_ippai(胸がいっぱい), jujitsu(充実した), shiawase(幸せな), tassei_kan(達成感), kanki(歓喜)
爽快感: sukkiri(すっきり), sawayaka(さわやか), sappari(さっぱり), suzushii(清々しい), karoyaka(軽やか), kokochi_yoi(心地よい), togisuma(研ぎ澄まされた)
心動かされる: kando(感動した), jiinto_kuru(じーんとくる), dokidoki(ドキドキした), kyomi_shinshin(興味津々), hokorashii(誇らしい), kanmei(感銘を受けた), mune_takanaru(胸が高鳴る), muchuu(夢中になる), hagema(励まされる), kangi_wamu(感極まる)
`.trim();

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { observation_text } = payload;

  if (!observation_text) {
    return { statusCode: 400, body: JSON.stringify({ error: "observation_text is required" }) };
  }

  const apiKey = process.env.DIFY_EMOTIONS_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DIFY_EMOTIONS_API_KEY is not configured" }),
    };
  }

  const apiBase = process.env.DIFY_API_BASE || "https://api.dify.ai/v1";

  try {
    const res = await fetch(`${apiBase}/workflows/run`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: { observation_text, emotion_list: EMOTION_LIST },
        response_mode: "blocking",
        user: "kimochi-checker-user",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Dify API error", detail: data }),
      };
    }

    const raw = data?.data?.outputs?.emotion_ids;
    if (!raw) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "emotion_ids not found in response", raw: data }),
      };
    }

    const cleaned = String(raw).replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Failed to parse emotion_ids", raw: cleaned }),
      };
    }

    if (!Array.isArray(parsed)) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "emotion_ids is not an array", raw: cleaned }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emotion_ids: parsed }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to reach Dify", detail: String(err) }),
    };
  }
};
