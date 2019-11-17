const admin_newNotice = `
      mutation Admin_newNotice($type: String, $title: String, $content: String) {
        admin_newNotice(type: $type, title: $title, content:$content) {
          _id
          type
          title
          content
          userid
          createdAt
          updatedAt
        }
      }`;

const noticeList = `
      query NoticeList($skip: Int, $limit: Int){
          noticeList(skip:$skip, limit:$limit){
            list{
              _id
              type
              content
              title
              createdAt
              updatedAt
          }
          total
          }
      }`;

const admin_removeNotice = `mutation Admin_removeNotice($_id:String){
      admin_removeNotice(_id: $_id) {
        _id
        type
        title
        content
        userid
        createdAt
        updatedAt
      }
    }
    `;
const notice = `query Notice($_id:String) {
  notice(_id: $_id) {
    _id
    type
    title
    content
    userid
    createdAt
    updatedAt
  }
}`;
const admin_updateNotice = `
      mutation Admin_UpdateNotice($_id:String, $type: String, $title: String, $content: String) {
        admin_updateNotice(_id: $_id,type: $type, title: $title, content:$content) {
          _id
          type
          title
          content
          userid
          createdAt
          updatedAt
        }
      }`;
export {
  admin_newNotice,
  noticeList,
  notice,
  admin_removeNotice,
  admin_updateNotice
};
