export function AvatarPlaceholder({username}){
    const letter = username[0].toUpperCase();
    return getAvatarV1(letter, username);
}

class Random{
    rnd(a) {
        a |= 0;
        a = a + 0x9e3779b9 | 0;
        let t = a ^ a >>> 16;
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15;
        t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }

    constructor(seed = Date.now()) {
        this.seed = seed;
    }

    next(){
        this.seed++;
        return this.rnd(this.seed);
    }

    nextInt(a,b){
        return Math.floor(this.next()*(b-a)+a);
    }
}

function getAvatarV1(letter, username) {

    let seed = 0;
    for (let i = 0; i < username.length; i++) {
        seed += username.charCodeAt(i)*Math.pow(10,i);
    }
    const random = new Random(seed);
    //const random = new Random();

    const angle = random.next()*360;
    const x1 = Math.cos(angle);
    const y1 = Math.sin(angle);
    const x2 = 1-x1;
    const y2 = 1-y1;

    const s = "50%";
    const l = "15%";

    const h1 = random.nextInt(0,360);
    const h2 = random.nextInt(0,360);

    const col1 = "hsl("+h1+","+s+","+l+")";
    const col2 = "hsl("+h2+","+s+","+l+")";


    return <svg viewBox={"0 0 16 16"} style={{height: "100%"}}>
        <defs>
            <linearGradient id="grad" x1={x1} y1={y1} x2={x2} y2={y2}>
                <stop stopColor={col1} offset="0%"/>
                <stop stopColor={col2} offset="100%"/>
            </linearGradient>
        </defs>
        <rect
            x="0"
            y="0"
            width="16"
            height="16"
            fill="url(#grad)"/>
        <text
            x={8}
            y={8}
            dy={1}
            fontSize={12}
            textAnchor={"middle"}
            dominantBaseline={"middle"}
            fill={"var(--accent)"}
            className={"logo"}>
            {letter}
        </text>
    </svg>
}