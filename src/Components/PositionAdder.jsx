import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ErrorNote} from "./ErrorNote";
import {Input} from "./Input";
import {ReactComponent as Plus} from "../Icons/plus.svg";

export const PositionAdder = forwardRef(PositionAdderC);

function PositionAdderC({value = [],className, requiredCount = 0, onInput, name}, ref) {
    const i = useRef(null);
    const msg = useRef(null);

    const [val, setVal] = useState(value);

    useImperativeHandle(ref, () => ({
        checkValidity: () => val.length >= requiredCount,
        value: val,
        setValue: (v) => setVal(v),
    }));

    function UserTag({name, index}) {
        return <div className={"button-raw p-4 bg-panel rounded-[16px] h-fit"} onClick={()=>{
            const list = [...val];
            list.splice(index, 1);
            setVal(list);
        }}>{name}</div>;
    }


    return <div className={"h-fit w-full " + className}>
        <div className={"mb-2 flex flex-row flex-wrap gap-2 text-[24px] min-h-[100px]"}>
            {val.map((v, i) => <UserTag index={i} name={v}/>)}
        </div>
        <div className={"w-full h-fit relative"}>
            <input ref={i} className={"w-full"} placeholder={"Имя пользователя"} onKeyUp={(e)=>{
                e.preventDefault();
                if (e.keyCode === 13) {
                    if(!e.target?.value || e.target.value === "")
                        return;
                    const list = [...val, e.target.value];
                    e.target.value = "";
                    setVal(list);
                }
            }}/>
            <div className={"absolute right-0 top-0 bottom-0 aspect-square p-2"}>
                <Plus className={"button-raw w-full h-full bg-accent fill-background p-2 rounded-[24px]"} onClick={()=>
                {
                    if(!i.current.value || i.current.value === "")
                        return;
                    const list = [...val, i.current.value];
                    i.current.value = "";
                    setVal(list);
                }}/>
            </div>
        </div>
        <ErrorNote ref={msg}/>
    </div>
}