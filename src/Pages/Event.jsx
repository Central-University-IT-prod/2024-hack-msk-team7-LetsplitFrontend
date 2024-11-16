import {useParams} from "react-router-dom";
import {Input} from "../Components/Input";
import {UberForm} from "../Components/UberForm";
import {useEffect, useRef, useState} from "react";
import {BACKEND} from "../consts";
import {authHeader} from "../Utils/AuthHeader";
import {useAuth} from "../auth";
import {useMe} from "../Components/UserProvider";

export function Event() {
    const params = useParams();

    const [me] = useMe();

    const [auth] = useAuth();

    const [info, setInfo] = useState({});
    const [wastes, setWastes] = useState([]);

    const id = params.id;

    useEffect(() => {

        const code = auth();

        if(!code)
            return;

        fetch(`${BACKEND}/event/${id}`, {...authHeader(code)}).then(x=>{
            if(x.ok){
                x.json().then(x => {
                    const {wastes, ...rest} = x;
                    setInfo(rest);
                    setWastes(wastes);
                })
            }
        })
    }, []);

    const form = useRef(null);

    if(!id)
        return null;

    return <div className={"w-fit m-auto"}>
        <div className={"text-center mb-10"}>
            <div className={"text-[48px]"}>{info.event_name}</div>
            <div className={"text-[24px] opacity-50"}>Создан {info.visible_name_creator}</div>
        </div>

        <div className={"text-center text-[32px] mb-4"}>Пользователи</div>

        <div className={"flex flex-col flex-nowrap gap-5 w-full desktop:w-[700px] m-auto p-5"}>
            {info.members?.map(x => <div className={"text-[32px] text-center w-full bg-panel p-5 rounded-[16px]"}>{x.visibleName}</div>)}
        </div>

        <div className={"text-center text-[32px] mb-4"}>Траты</div>

        <div className={"flex flex-col flex-nowrap gap-5 w-full desktop:w-[700px] m-auto p-5"}>
            {wastes.map(x => <a href={`/receipt/${x.id}`}
                                  className={"button-raw bg-panel p-5 flex flex-col flex-nowrap justify-between rounded-[16px] gap-2"}>
                <div className={"text-[32px] text-center w-full"}>{x}</div>
                <div className={"text-[24px] text-center w-full opacity-55"}>{x.creator_visible_name}</div>
                <div className={"text-[48px] text-center w-full text-accent"}>{x.total}</div>
            </a>)}
        </div>

        <div className={"mt-10 mx-4 w-full"}>
            <div className={"text-center text-[24px] mb-4"}>Добавить трату</div>
            <UberForm ref={form}>
                <Input placeholder={"Название"} name={"name"} className={"mb-6"}/>
                <Input placeholder={"Цена"} name={"total"} className={"mb-6"} pattern={"[.0-9]+"}/>
                <div className={"button accent text-[24px] w-[80%] m-auto text-center"} onClick={()=>{
                    if(!form.current.valid())
                        return;

                    const obj = {...form.current.finalize(), username: me.login, creatorVisibleName: me.visible_name};

                    const list = [...wastes, obj];

                    const code = auth();
                    if(!code) return;

                    fetch(`${BACKEND}/event/${id}/addWaste`, {
                        method: "POST",
                        body: JSON.stringify(obj),
                        ...authHeader(code)
                    })

                    setWastes(list);
                }}>Добавить</div>
            </UberForm>
        </div>
    </div>
}