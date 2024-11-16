import {Children, cloneElement, createRef, forwardRef, useEffect, useImperativeHandle, useRef} from 'react';

export const UberForm = forwardRef(UberFormComp)

function UberFormComp({children, onInput, saveName = null}, ref){
    const inputs = useRef([]);


    const checkValidity = () => {
        for (const input of inputs.current) {
            if(!input)
                continue;
            const isValid = input.ref.checkValidity();
            if (!isValid) {
                return false;
            }
        }
        return true;
    };

    const registerRef = (ref, key, node) => {
        if (!ref) return;
        if (!ref.checkValidity) return;
        if(!node.props) return;
        if (!node.props.name) return;

        inputs.current[key] = {ref: ref, name: node.props.name};
    };

    const finalize = (override = null) => {
        const map = new Map();
        for (const input of inputs.current) {
            if(!input)
                continue;
            if(override && override[0]===input.name){
                map.set(input.name, override[1]);
                continue;
            }
            map.set(input.name, input.ref.value);
        }
        return Object.fromEntries(map);
    };

    const changeInputValuesAsObject = (obj) =>{
        const map = new Map(Object.entries(obj))
        for (const input of inputs.current) {
            if(!input) continue;

            if(!map.has(input.name)) continue;

            const val = map.get(input.name);

            if(input.ref.setValue){
                input.ref.setValue(val);
            }
            else{
                input.ref.value = val;
            }
        }
    }

    function load(){
        if(saveName){
            const value = sessionStorage.getItem(saveName);
            if(value){
                const obj = JSON.parse(value);
                changeInputValuesAsObject(obj);
            }
        }
    }

    useEffect(() => {
        load();
    }, []);

    function save(){
        if(saveName){
            sessionStorage.setItem(saveName, JSON.stringify(finalize()));
        }
    }

    function lose(){
        if(saveName){
            sessionStorage.removeItem(saveName);
        }
    }

    useImperativeHandle(ref, () => ({
        checkValidity,
        valid: checkValidity,
        setObject: (obj)=>{
            changeInputValuesAsObject(obj);
        },
        finalize,
        save,
        lose,
        load
    }));

    return (
        <>
            {Children.map(children, (child, index) => {
                return cloneElement(child, {
                    ref: (node) => {
                        registerRef(node, index, child);
                    },
                    onInput: (e)=>{

                        if(child.props && child.props.onInput){
                            child.props.onInput(e);
                        }
                        if(child.props && child.props.name) {
                            if(onInput){
                                const val = (e.target&&e.target.value)?e.target.value:e;
                                const fin = finalize(false, [child.props.name, val]);
                                onInput(fin);
                            }
                        }
                    }
                });
            })}
        </>
    );
}