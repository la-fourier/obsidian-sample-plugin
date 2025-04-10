// type LaTeXDict = {
//     [category: string]: {
//         [symbol: string]: string;
//     };
// };

const latex_dict = {
    "Kalligraphie": {
        "𝒜": "\\mathcal{A}", "ℬ": "\\mathcal{B}", "𝒞": "\\mathcal{C}", "𝒟": "\\mathcal{D}",
        "ℰ": "\\mathcal{E}", "ℱ": "\\mathcal{F}", "𝒢": "\\mathcal{G}", "ℋ": "\\mathcal{H}",
        "ℐ": "\\mathcal{I}", "𝒥": "\\mathcal{J}", "𝒦": "\\mathcal{K}", "ℒ": "\\mathcal{L}",
        "ℳ": "\\mathcal{M}", "𝒩": "\\mathcal{N}", "𝒪": "\\mathcal{O}", "𝒫": "\\mathcal{P}",
        "𝒬": "\\mathcal{Q}", "ℛ": "\\mathcal{R}", "𝒮": "\\mathcal{S}", "𝒯": "\\mathcal{T}",
        "𝒰": "\\mathcal{U}", "𝒱": "\\mathcal{V}", "𝒲": "\\mathcal{W}", "𝒳": "\\mathcal{X}",
        "𝒴": "\\mathcal{Y}", "𝒵": "\\mathcal{Z}", "𝒶": "\\mathcal{a}", "𝒷": "\\mathcal{b}",
        "𝒸": "\\mathcal{c}", "𝒹": "\\mathcal{d}", "ℯ": "\\mathcal{e}", "𝒻": "\\mathcal{f}",
        "ℊ": "\\mathcal{g}", "𝒽": "\\mathcal{h}", "𝒾": "\\mathcal{i}", "𝒿": "\\mathcal{j}",
        "𝓀": "\\mathcal{k}", "𝓁": "\\mathcal{l}", "𝓂": "\\mathcal{m}", "𝓃": "\\mathcal{n}",
        "ℴ": "\\mathcal{o}", "𝓅": "\\mathcal{p}", "𝓆": "\\mathcal{q}", "𝓇": "\\mathcal{r}",
        "𝓈": "\\mathcal{s}", "𝓉": "\\mathcal{t}", "𝓊": "\\mathcal{u}", "𝓋": "\\mathcal{v}",
        "𝓌": "\\mathcal{w}", "𝓍": "\\mathcal{x}", "𝓎": "\\mathcal{y}", "𝓏": "\\mathcal{z}"
    },
    "Ligatur": {
        "ﬁ": "\\text{fi}", "ﬂ": "\\text{fl}", "ﬀ": "\\text{ff}", "ﬃ": "\\text{ffi}", "ﬄ": "\\text{ffl}"
    },
    "Fraktur": {
        "𝔄": "\\mathfrak{A}", "𝔅": "\\mathfrak{B}", "𝔇": "\\mathfrak{D}", "𝔈": "\\mathfrak{E}",
        "𝔉": "\\mathfrak{F}", "𝔊": "\\mathfrak{G}", "ℌ": "\\mathfrak{H}", "ℑ": "\\mathfrak{I}",
        "𝔍": "\\mathfrak{J}", "𝔎": "\\mathfrak{K}", "𝔏": "\\mathfrak{L}", "𝔐": "\\mathfrak{M}",
        "𝔑": "\\mathfrak{N}", "𝔒": "\\mathfrak{O}", "𝔓": "\\mathfrak{P}", "𝔔": "\\mathfrak{Q}",
        "ℜ": "\\mathfrak{R}", "𝔖": "\\mathfrak{S}", "𝔗": "\\mathfrak{T}", "𝔘": "\\mathfrak{U}",
        "𝔙": "\\mathfrak{V}", "𝔚": "\\mathfrak{W}", "𝔛": "\\mathfrak{X}", "𝔜": "\\mathfrak{Y}",
        "ℨ": "\\mathfrak{Z}", "𝔞": "\\mathfrak{a}", "𝔟": "\\mathfrak{b}", "𝔠": "\\mathfrak{c}",
        "𝔡": "\\mathfrak{d}", "𝔢": "\\mathfrak{e}", "𝔣": "\\mathfrak{f}", "𝔤": "\\mathfrak{g}",
        "𝔥": "\\mathfrak{h}", "𝔦": "\\mathfrak{i}", "𝔧": "\\mathfrak{j}", "𝔨": "\\mathfrak{k}",
        "𝔩": "\\mathfrak{l}", "𝔪": "\\mathfrak{m}", "𝔫": "\\mathfrak{n}", "𝔬": "\\mathfrak{o}",
        "𝔭": "\\mathfrak{p}", "𝔮": "\\mathfrak{q}", "𝔯": "\\mathfrak{r}", "𝔰": "\\mathfrak{s}",
        "𝔱": "\\mathfrak{t}", "𝔲": "\\mathfrak{u}", "𝔳": "\\mathfrak{v}", "𝔴": "\\mathfrak{w}",
        "𝔵": "\\mathfrak{x}", "𝔶": "\\mathfrak{y}", "𝔷": "\\mathfrak{z}"
    },
    "Doppelstrich": {
        "𝔸": "\\mathbb{A}", "𝔹": "\\mathbb{B}", "ℂ": "\\mathbb{C}", "𝔻": "\\mathbb{D}",
        "𝔼": "\\mathbb{E}", "𝔽": "\\mathbb{F}", "𝔾": "\\mathbb{G}", "ℍ": "\\mathbb{H}",
        "𝕀": "\\mathbb{I}", "𝕁": "\\mathbb{J}", "𝕂": "\\mathbb{K}", "𝕃": "\\mathbb{L}",
        "𝕄": "\\mathbb{M}", "ℕ": "\\mathbb{N}", "𝕆": "\\mathbb{O}", "ℙ": "\\mathbb{P}",
        "ℚ": "\\mathbb{Q}", "ℝ": "\\mathbb{R}", "𝕊": "\\mathbb{S}", "𝕋": "\\mathbb{T}",
        "𝕌": "\\mathbb{U}", "𝕍": "\\mathbb{V}", "𝕎": "\\mathbb{W}", "𝕏": "\\mathbb{X}",
        "𝕐": "\\mathbb{Y}", "ℤ": "\\mathbb{Z}", "𝕒": "\\mathbb{a}", "𝕓": "\\mathbb{b}",
        "𝕔": "\\mathbb{c}", "𝕕": "\\mathbb{d}", "𝕖": "\\mathbb{e}", "𝕗": "\\mathbb{f}"
    },
    "Symbole": {
        "€": "\\euro", "©": "\\copyright", "®": "\\textregistered", "™": "\\texttrademark",
        "→": "\\rightarrow", "←": "\\leftarrow", "⇔": "\\iff", "±": "\\pm", "×": "\\times", "÷": "\\div",
        "°": "\\degree", "∞": "\\infty", "√": "\\sqrt", "∑": "\\sum", "∫": "\\int", "∂": "\\partial",
        "∩": "\\cap", "∪": "\\cup", "≈": "\\approx", "≠": "\\neq", "≤": "\\leq", "≥": "\\geq",
        "⊂": "\\subset", "⊆": "\\subseteq", "⊃": "\\supset", "⊇": "\\supseteq", "∈": "\\in",
        "∉": "\\notin", "∀": "\\forall", "∃": "\\exists", "∮": "\\oint", "∇": "\\nabla", "⊥": "\\perp",
        "∧": "\\wedge", "∨": "\\vee", "≡": "\\equiv", "⇒": "\\Rightarrow", "⇐": "\\Leftarrow",
        "↔": "\\leftrightarrow", "↦": "\\mapsto", "∼": "\\sim", "≪": "\\ll", "≫": "\\gg",
        "⊕": "\\oplus", "⊗": "\\otimes", "∅": "\\emptyset", "〈": "\\langle", "〉": "\\rangle",
        "⁰": "^{0}", "¹": "^{1}", "²": "^{2}", "³": "^{3}", "ⁿ": "^{n}",
        "ₓ": "_{x}", "₀": "_{0}", "₁": "_{1}", "₂": "_{2}", "₃": "_{3}", "₄": "_{4}", "₅": "_{5}",
        "₆": "_{6}", "₇": "_{7}", "₈": "_{8}", "₉": "_{9}"
    },
    "griechisch": {
        "α": "\\alpha", "β": "\\beta", "γ": "\\gamma", "δ": "\\delta", "ε": "\\epsilon",
        "ζ": "\\zeta", "η": "\\eta", "θ": "\\theta", "ι": "\\iota", "κ": "\\kappa", "λ": "\\lambda",
        "μ": "\\mu", "ν": "\\nu", "ξ": "\\xi", "ο": "o", "π": "\\pi", "ρ": "\\rho", "σ": "\\sigma",
        "τ": "\\tau", "υ": "\\upsilon", "φ": "\\phi", "χ": "\\chi", "ψ": "\\psi", "ω": "\\omega",
        "Α": "A", "Β": "B", "Γ": "\\Gamma", "Δ": "\\Delta", "Ε": "E", "Ζ": "Z", "Η": "H",
        "Θ": "\\Theta", "Ι": "I", "Κ": "K", "Λ": "\\Lambda", "Μ": "M", "Ν": "N", "Ξ": "\\Xi",
        "Ο": "O", "Π": "\\prod", "Ρ": "P", "Τ": "T", "Υ": "\\Upsilon", "Φ": "\\Phi", "Χ": "X",
        "Ψ": "\\Psi", "Ω": "\\Omega"
    },
    "hebr": {
        "א": "\\aleph", "ב": "beth", "ג": "gimel", "ד": "daleth", "ה": "he", "ו": "vav",
        "ז": "zayin", "ח": "het", "ט": "tet", "י": "yod", "כ": "kaf", "ל": "lamed", "מ": "mem",
        "נ": "nun", "ס": "samekh", "ע": "ayin", "פ": "pe", "צ": "tsade", "ק": "qof", "ר": "resh",
        "ש": "shin", "ת": "tav"
    }
};

function replace_all(s) {
    for (const key of Object.keys(latex_dict)) {
        const dict = latex_dict[key];
        for (const symbol of Object.keys(dict)) {
            s = s.split(symbol).join(dict[symbol]);
        }
    }
    return s;
}
