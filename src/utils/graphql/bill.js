const admin_billList = `query Admin_billList($skip: Int!, $limit:Int!, $status: BillStatus){
      admin_billList(skip:$skip,limit:$limit, status:$status){
        list{
            _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser
            status
            userid
            updatedBy
            createdAt
            updatedAt
          }
        total
      }
    }`;

const admin_checkBill = `mutation Admin_checkBill($_id:String!){
      admin_checkBill(_id: $_id){
            _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser
            status
            userid
            updatedBy
            createdAt
            updatedAt
      }
    }`;

export { admin_billList, admin_checkBill };
