import { Context,Info,Returns,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
import { Status } from '../../utility/asset';

@Info({title:"crud for the plant ", description:"Operation of update create for the plant "})
export class UserConsumptionsOperations extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("userConsumption");
    }
@Transaction(true)
public async GenerateConsumption(ctx:Context,param:string):Promise<Object>{
    const params = JSON.parse(param);
    const consumption= {
        userConsumptionId:params.userConsumptionId,
        podId:params.podId,
        consumption:[{"time":0,"consumption":0}],
        type:'userConsumption',
        };
    return  Promise.all([
        await ctx.stub.putState(consumption.type+"-"+consumption.userConsumptionId,Buffer.from(JSON.stringify(consumption)))])
            .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }

@Transaction(true)
public async AddConsumption(ctx:Context,id:string,param:string):Promise<Object>{
    const params = JSON.parse(param);
    const pod_exist=await this.get(ctx,'pod'+'-'+params.podId);
    const exist:any=await this.get(ctx,id);
    if(exist.userConsumptionId==undefined){
        throw new Error("The user with wallet id:"+id+" does not exists");
    }
    if(!pod_exist){
        throw new Error("The pod with id:"+id+" does not exists");
    }
    const consumption= {
            userConsumptionId:id,
            podId:params.podId,
            consumption:[...exist.consumption,{"time":params.time,"consumption":params.consumption}],
            type:'userConsumption',    
        };
    return  Promise.all([await ctx.stub.putState(consumption.type+"-"+consumption.userConsumptionId,Buffer.from(JSON.stringify(consumption)))])
        .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }


}