import {useEffect, useState} from "react";
import {useMe} from "../Components/UserProvider";
import {useAuth} from "../auth";
import {repeat} from "../Utils/Repeater";
import {ReactComponent as Plus} from "../Icons/plus.svg";
import {BACKEND} from "../consts";
import {authHeader} from "../Utils/AuthHeader";


export function Receipts() {
    const [auth] = useAuth();

    const [me] = useMe();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const code = auth();

        if (!code)
            return;

        fetch(`${BACKEND}/me/event`, {...authHeader(code)}).then(x => {
            if (x.ok) {
                x.json().then(x => {
                    x.sort((a, b) => ((b.creatorId === me.id) ? 1 : 0) - ((a.creatorId === me.id) ? 1 : 0));
                    setEvents(x);
                })
            }
        })
    }, []);

    /*const rec = <><div className={"text-center desktop:text-left text-[32px] ml-5 mb-5"}>Чеки</div>
    <div className={"flex flex-row flex-wrap gap-4 mb-8"}>
        {events.map(x => <ReceiptPanel
            info={{name: x.name, usersCount: x.memberCount, id: x.id, receiptId: x.receiptId, total: x.total}}
            my={x.creatorId === me.id}/>)}
        <a href={"/receipt/create"}
           className={"button-raw w-full desktop:w-[300px] h-[200px] rounded-[16px] border-accent border-dashed border-4 p-10"}>
            <Plus className="w-full h-full fill-accent"/>
        </a>
    </div></>;*/


    return <div className={"m-5"}>
        <div className={"text-center desktop:text-left text-[32px] ml-5 mb-5"}>События</div>
        <div className={"flex flex-row flex-wrap gap-4 mb-8"}>
            {events.map(x => <EventPanel
                info={{name: x.event_name, usersCount: 1, id: x.event_id}} my={x.creatorId === me.id}/>)}
            <a href={"/event/create"}
               className={"button-raw w-full desktop:w-[300px] h-[150px] rounded-[16px] border-accent border-dashed border-4 p-5"}>
                <Plus className="w-full h-full fill-accent"/>
            </a>
        </div>
    </div>
}

function ReceiptPanel({info, my = false}) {
    return <a href={"/receipt/" + info.receiptId}
              className={"button-raw w-full desktop:w-[300px] h-[200px] panel p-5" + (my ? " border-2 border-accent" : "")}>
        <div className={"text-center text-[24px] overflow-1 mb-2"}>{info.name}</div>
        <div className={"text-center text-[24px] overflow-1 opacity-55 mb-10"}>{info.usersCount} Участников</div>
        <div className={"text-center text-[32px] overflow-1 text-accent"}>{info.total}</div>
    </a>;
}

function EventPanel({info, my = false}) {
    return <a href={"/event/" + info.id}
              className={"button-raw w-full desktop:w-[300px] h-[150px] panel p-5" + (my ? " border-2 border-accent" : "")}>
        <div className={"text-center text-[28px] overflow-1"}>{info.name}</div>
        <div className={"text-center text-[24px] mt-5 overflow-1 opacity-55"}>{info.usersCount} Участников</div>
    </a>;
}