
export function text_control(elem){
    let res1='';
    let control=/[.,/#!$%^&*;:{}=\-_`'"~()\s]/g;
    let char_check=/[a-zA-Z]/g;
    let res2=elem.match(char_check);
    res1=elem.match(control);
    
    if(!elem){
        return "Devi inserire un nome identificativo";
    }
    if(res1){
        return "Puoi inserire solo lettere e numeri";

    }
    else if(!res2){
        return "Devi inserire delle lettere";
    }
    else {
        return '';
    }

    }


    export function select_control(elem){
        if(!elem){
            return '';
        }
        if(elem==="Seleziona"){
            return "Devi selezionare una comunità";
        }
        else {
            return '';
        }
    }