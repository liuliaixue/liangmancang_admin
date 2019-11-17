const admin_taskList = `query {
        admin_taskList(skip: 0, limit: 10, ) {
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
              xx
              type
              buyTimes
              browseTimes
              collectTimes
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

export { admin_taskList, task, admin_updateTaskStatusChecked };
