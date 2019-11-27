const admin_storeList = `query Admin_storeList($skip:Int, $limit:Int){
  admin_storeList(skip: $skip, limit: $limit) {
    list {
      _id
      name
      userid
      type
      website
      wangwang
      storeScreenShotImage
      address
      contactPhone
      status
      createdAt
      updatedAt
    }
    total
  }
}
`;

const store = `query Store($_id: String!) {
  store(_id: $_id) {
    _id
    name
    userid
    type
    website
    wangwang
    storeScreenShotImage
    address
    contactPhone
    status
    createdAt
    updatedAt
  }
}
`;

const admin_updateStoreStatus = ``;
const admin_updateStoreStatusOK = `mutation Admin_updateStoreStatusOK($_id:String!) {
  admin_updateStoreStatus(_id: $_id, status: OK) {
    _id
    name
    userid
    type
    website
    wangwang
    storeScreenShotImage
    address
    contactPhone
    status
    createdAt
    updatedAt
  }
}
`;
const admin_updateStoreStatusBAD = `mutation Admin_updateStoreStatusBAD($_id:String!, $message: String) {
  admin_updateStoreStatus(_id: $_id, message: $message, status: BAD) {
    _id
    name
    userid
    type
    website
    wangwang
    storeScreenShotImage
    address
    contactPhone
    status
    message
    createdAt
    updatedAt
  }
}
`;

export {
  admin_storeList,
  store,
  admin_updateStoreStatusOK,
  admin_updateStoreStatusBAD
};
