import {useMe} from "../Components/UserProvider";
import {useEffect, useState} from "react";
import {BACKEND} from "../consts";
import {useAuth} from "../auth";
import {authHeader} from "../Utils/AuthHeader";

export function Me(){
    const [me] = useMe();

    const [auth] = useAuth();

    const [duties, setDuties] = useState([]);


    useEffect(() => {

        const code = auth();

        if(!code)
            return;

        fetch(`${BACKEND}/me/duty`, {...authHeader(code)}).then(x=>{
            if(x.ok){
                x.json().then(x => {
                    setDuties(x);
                })
            }
        })
    }, []);


    if(!me)
        return null;

    return <>
        <div className={"text-center mb-20"}>
            <div className={"text-[48px]"}>{me.visible_name}</div>
            <div className={"text-[32px] opacity-50"}>{me.login}</div>
        </div>

        <div className={"p-5"}>
            <div className={"text-center desktop:text-left text-[24px] ml-5 mb-5"}>Задолженности</div>
            <div className={"flex flex-col flex-wrap gap-4"}>
                {duties.map(x=><Duty info={x}/>)}
            </div>
        </div>
    </>
}

function Duty({info}) {

    const [opened, setOpen] = useState(false);

    if(info.total === 0)
        return null;
    const col = info.total < 0 ? "#79bf49" : "#c04d39";
    return <div className={`panel p-5 ${opened?"":"button-raw"}`} onClick={()=>setOpen(true)}>
        <div className={"flex flex-row flex-nowrap justify-between gap-4"}>
            <div className={"text-[20px] desktop:text-[32px]"}>{info.visibleName}</div>
            <div className={"text-[20px] desktop:text-[32px]"} style={{color: col}}>{info.total}</div>
        </div>
        {!opened?null:
            <>
                <div className={"text-[20px] desktop:text-[24px] text-accent"}>{info.username}</div>
            </>}
    </div>;
}