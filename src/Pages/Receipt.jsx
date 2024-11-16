import {useParams} from "react-router-dom";
import {Input} from "../Components/Input";
import {UberForm} from "../Components/UberForm";

export function Receipt() {
    const params = useParams();
    
    return <div className={"w-fit m-auto"}>
        <div className={"text-center mb-10"}>
            <div className={"text-[48px]"}>Счет в ресторане</div>
            <div className={"text-[24px] opacity-50"}>Создан Кирилл Филонов</div>
        </div>
        <div className={"flex flex-col flex-nowrap gap-5 w-full desktop:w-[700px] m-auto p-5"}>
            <div className={"button-raw bg-panel p-5 flex flex-col flex-nowrap justify-between rounded-[16px] gap-2"}>
                <div className={"text-[32px] text-center w-full"}>Pasta la beeeeeeeeeeeer</div>
                <div className={"text-[24px] text-center w-full opacity-55"}>Филонов Кирилл</div>
                <div className={"text-[48px] text-center w-full text-accent"}>99999$</div>
            </div>
        </div>

        <div className={"mt-10 mx-4 w-full"}>
            <div className={"text-center text-[24px] mb-4"}>Добавление траты</div>
            <UberForm>
                <Input placeholder={"Название"} name={"name"} className={"mb-6"}/>
                <Input placeholder={"Цена"} name={"price"} className={"mb-6"} pattern={"[.\d]+"}/>
                <div className={"button accent text-[24px] w-[80%] m-auto text-center"}>Войти</div>
            </UberForm>
        </div>
    </div>
}