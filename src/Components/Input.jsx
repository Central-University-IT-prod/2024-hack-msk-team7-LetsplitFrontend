import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ErrorNote} from "./ErrorNote";

export const Input = forwardRef(InputC);

function InputC({value = null,placeholder = "", type="text",className, required = false, onInput, onInputVerified, name, pattern = "", errorMessage = "Некорректный ввод!", requiredMessage = "Поле необходимое!", customVerifications = [], promiseVerifications = []}, ref) {
    const i = useRef(null);
    const msg = useRef(null);

    const [vTimer, setVTimer] = useState(null);

    const [val, setVal] = useState(value);
    const [verVal, setVerVal] = useState(value);

    function inputVerify() {
        if (vTimer)
            clearTimeout(vTimer);
        setVTimer(setTimeout(() => verify(), 500))
    }

    function verify() {
        let m = "";
        let v = false;
        if (!i.current)
            return false;

        const val = i.current.value;

        if (val === "") {
            if (required) {
                v = true;
                m = requiredMessage;
            }
        } else if (pattern && pattern !== "" && !val.match("^" + pattern + "$")) {
            v = true;
            m = errorMessage;
        } else {
            for (const cv in customVerifications) {
                if (!customVerifications[cv].verify(val)) {
                    v = true;
                    m = customVerifications[cv].message;
                    break;
                }
            }
        }

        if (!v)
            msg.current.hide();
        else
            msg.current.show(m);

        if (!v) {
            for (const verification of promiseVerifications) {
                verification(i.current.value).then(result => {
                    if (result)
                        msg.current.show(result);
                })
            }
        }

        if(!v){
            setVerVal(val);
        }

        return !v;
    }

    useEffect(() => {
        if (onInputVerified)
            onInputVerified(verVal);
    }, [verVal]);

    useImperativeHandle(ref, () => ({
        checkValidity: () => verify(),
        value: val,
        setValue: (v) => setVal(v),
    }));

    return <div className={"h-fit mb-1 w-full"}>
        <input
            onInput={(e) => {
                setVal(e.target.value);
                if(onInput) {
                    onInput(e.target.value);
                }
                inputVerify();
            }}
            ref={i}
            value={val}
            required={required} placeholder={placeholder} pattern={pattern} type={type}
            className={className} style={{width: "100%"}}/>
        <ErrorNote ref={msg}/>
    </div>
}