const admin_taskList = `query Admin_taskList($skip: Int!, $limit:Int! ){
        admin_taskList(skip: $skip, limit: $limit ) {
          list {
            _id
            platform
            type

            goodsName
            goodsLink
            goodsImage
            goodsPrice
            goodsTotal
            goodsPriceShowed
            goodsSpecification
            isFreeShipping

            search_sort
            search_ReceiverNum
            search_price_from
            search_price_to
            search_where
            search_keyword

            orders {
              type
              buyTimes
              browseTimes
              collectTimes
              collectGoods
              collectStore
              addToCart
              searchKeyword
              goodsSpecification
              comment
              pictures
              remark
            }
            startTime
            endTime
            commission
            platformServiceFee
            platformCommission
            extraCommission
            extraImages
            status
            storeid
            userid
            createdAt
            updatedAt
          }
          total
        }
      }`;

const task = `query Task($_id:String!){
  task(_id: $_id) {
    _id
    platform
    type
    goodsName
    goodsLink
    goodsImage
    goodsPrice
    goodsTotal
    goodsPriceShowed
    goodsSpecification
    isFreeShipping
    search_sort
    search_ReceiverNum
    search_price_from
    search_price_to
    search_where
    search_keyword
    orders{
      type
      buyTimes
      browseTimes
      collectTimes
      collectGoods
      collectStore
      addToCart
      searchKeyword
      goodsSpecification
      comment
      pictures
      remark
    }
    orderQuantity
    startTime
    endTime
    commission
    platformServiceFee
    platformCommission
    extraCommission
    extraImages
    status
    storeid
    userid
    createdAt
    updatedAt
  }
}
`;

const admin_updateTaskStatusChecked = `
      mutation Admin_updateTaskStatusChecked($_id: String!){
        admin_updateTaskStatus(_id: $_id, status: CHECKED) {
          _id
          platform
          type

          goodsName
          goodsLink
          goodsImage
          goodsPrice
          goodsTotal
          goodsPriceShowed
          goodsSpecification
          isFreeShipping

          search_sort
          search_ReceiverNum
          search_price_from
          search_price_to
          search_where
          search_keyword

          orders {
            type
            buyTimes
            browseTimes
            collectTimes
            collectGoods
            collectStore
            addToCart
            searchKeyword
            goodsSpecification
            comment
            pictures
            remark
          }
          startTime
          endTime
          commission
          platformServiceFee
          platformCommission
          extraCommission
          extraImages
          status
          storeid
          userid
          createdAt
          updatedAt
        }
      }`;

const admin_updateTaskStatusBAD = `
      mutation Admin_updateTaskStatusBAD($_id: String!, $message: String){
        admin_updateTaskStatus(_id: $_id, message: $message, status: BAD) {
          _id
          platform
          type

          goodsName
          goodsLink
          goodsImage
          goodsPrice
          goodsTotal
          goodsPriceShowed
          goodsSpecification
          isFreeShipping

          search_sort
          search_ReceiverNum
          search_price_from
          search_price_to
          search_where
          search_keyword

          orders {
            type
            buyTimes
            browseTimes
            collectTimes
            collectGoods
            collectStore
            addToCart
            searchKeyword
            goodsSpecification
            comment
            pictures
            remark
          }
          startTime
          endTime
          commission
          platformServiceFee
          platformCommission
          extraCommission
          extraImages
          status
          message
          storeid
          userid
          createdAt
          updatedAt
        }
      }`;
export {
  admin_taskList,
  task,
  admin_updateTaskStatusChecked,
  admin_updateTaskStatusBAD
};
