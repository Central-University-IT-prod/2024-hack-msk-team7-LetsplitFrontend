import {forwardRef, useImperativeHandle, useRef} from "react";

export const ErrorNote = forwardRef(ErrorN);

function ErrorN({},ref){
    const msgRef = useRef(null);

    useImperativeHandle(ref, ()=>({
        show: (msg)=> {
            msgRef.current.classList.remove("hidden");
            msgRef.current.innerText = msg;
        },
        hide: (msg)=> {
            msgRef.current.classList.add("hidden");
        }
    }));

    return <div className={"hidden text-[24px] text-error mt-2 mb-2"} style={{textAlign: "center"}} ref={msgRef}>Test</div>
}