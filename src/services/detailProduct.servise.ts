import {DetailProduct} from "../entities/DetailProduct"
import { User } from "../entities/User"
import { AppDataSource } from "../database/db"
import * as utils from "./util.service"
export const getDetailsService = async ()=>{
    return await DetailProduct.find({
        relations:{
            entry:true,
            
        },
        where:{entry:{id:1}}
        
    })
}
export const getPendingDetailsProduct = async ()=>{
    const details = await DetailProduct.find({
        relations:{
            product:true,
            entry:{
                customer:true,
                details:{
                    lockers:true
                }
            }
        },
        where:{state:0},
        order:{createAt:"ASC"}
    })

    return details.map(detail => {
        const lockers = detail.entry.details
            .flatMap(serviceDetail => serviceDetail.lockers || [])
            .filter((locker, index, all) =>
                all.findIndex(item => item.id === locker.id) === index
            )

        return {
            id: detail.id,
            product: detail.product,
            cant: detail.cant,
            price: detail.price,
            state: detail.state,
            createAt: detail.createAt,
            entryId: detail.entry.id,
            customer: detail.entry.customer,
            lockers
        }
    })
}
export const findDetailProduct = async (id:number)=>{
    return await DetailProduct.findOne({
        
        where:{id}
    })
   
}
export const getProductoReport = async (date1:Date,date2:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("pr.id")
    .addSelect('sum(dp."cant")',"cant")
    .addSelect('sum(dp."cant" * dp."price")',"total")
    .addSelect('pr."name"')
    .addSelect('ca."name"',"category")
    .from("detail_product","dp")
    .from("product","pr")
    .from("category","ca")
    .where('pr.id = dp."productId"')
    .andWhere('ca.id = pr."categoryId"')
    .andWhere("dp.state = '2'")
    .andWhere('dp."updateAt" BETWEEN :date1 AND :date2',{date1,date2})
    .groupBy("pr.id")
    .addGroupBy("ca.id")
    .getRawMany() 
}
export const getDeliveredUnpaidProductsReport = async (targetDate:Date)=>{
    const {startOfDay,endOfDay} = utils.getTodayEntriesInLocalTime(targetDate)

    return await AppDataSource.createQueryBuilder()
    .select('dp.id',"id")
    .addSelect('e.id',"entryId")
    .addSelect('pr."name"',"product")
    .addSelect('cu."name"',"customer")
    .addSelect('u."name"',"user")
    .addSelect('dp.cant',"cant")
    .addSelect('dp.price',"price")
    .addSelect('dp.cant * dp.price',"total")
    .addSelect('dp."updateAt"',"deliveredAt")
    .from("detail_product","dp")
    .innerJoin("entry","e",'e.id = dp."entryId"')
    .innerJoin("product","pr",'pr.id = dp."productId"')
    .innerJoin("customer","cu",'cu.id = e."customerId"')
    .leftJoin(User,"u",'u.id = e."userId"')
    .where("dp.state = :state",{state:1})
    .andWhere('dp."updateAt" BETWEEN :startOfDay AND :endOfDay',{startOfDay,endOfDay})
    .orderBy('dp."updateAt"',"ASC")
    .addOrderBy("dp.id","ASC")
    .getRawMany()
}
export const createDetailProduct = async (data:DetailProduct)=>{
    const detailProduct = await DetailProduct.create(data)
    await detailProduct.save()
    return detailProduct
}
export const updateDetailProduct = async (id:number,data:any)=>{
    let detailProduct = await findDetailProduct(id)
    if (detailProduct){
        await DetailProduct.update({ id }, data)
        return await findDetailProduct(id)
    }else throw new Error("categoria no encontrado")
}
export const deleteDetailProduct = async (id:number)=>{
    let detailProduct = await findDetailProduct(id)
    if (detailProduct){
        await DetailProduct.delete({ id })
        return detailProduct
    }else throw new Error("categoria no encontrado")
}
