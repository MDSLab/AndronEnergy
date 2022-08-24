
import axios from "./axios";


export async function get_pods(){
    const headers = { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"} 
    const call=await fetch('http://localhost:8060/pod',headers);
    const body=await call.json();
    if(body.status!==200){
        throw Error(body.message)
    }
    return body;
}

export async function get_pod(id){
    const call=fetch('http://localhost:8060/pod/'+id);
    const body=await call.json();

    if(call.status!==200){
        throw Error(body.message)
    }
    return body;
}

export async function delete_pod(id){
    const headers = { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"} 
    const call=await fetch('http://localhost:8060/podOp/Delete/'+id,headers);
    const body=await call.json();
    if(call.status!==200){
        throw Error("Something went wrong")
    }
    return body;
    
}


export async function updatePodPlant(obj){
    try{
        await axios.post('podOp/updatePodPlant',JSON.stringify(obj),
        {
            headers: {'Content-Type': 'application/json' },
            withCredentials: true
        });
        //console.log(res);
        }

    catch (err) {
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }
}


export async function removePlantfromPods(obj){
    try{
        await axios.post('podOp/removePlantfromPods',obj,
        {
            headers: {'Content-Type': 'application/json' },
            withCredentials: true
        });
        //console.log(res);
        }

    catch (err) {
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }
}

export async function add_pod(pod_obj){
    const request={
        method:'POST',
        headers: { 'Content-Type': 'application/json'},
        body:JSON.stringify(pod_obj)
        };
    const call=fetch('http:://localhost:8060/podOp/Add',request);
    const body=call.json();
    if(call.status!==200){
        throw Error(body.message)
        }
    return body;

}

