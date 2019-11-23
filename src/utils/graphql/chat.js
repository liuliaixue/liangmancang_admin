const admin_chatList = `query admin_chatList($skip:Int, $limit:Int){
      admin_chatList(skip: $skip, limit: $limit) {
        list {
          list {
            _id
            content
            taskid
            chatroom
            image
            phone
            userid
            type

            createdAt
            updatedAt
          }
          total
        }
        total
      }
    }
    `;
const chat = `query Chat($chatroom:String){
  chat(skip: 0, limit: 100, chatroom: $chatroom) {
    list{
      _id
      content
      taskid
      userid
      chatroom
      image
      phone
      type
      createdAt
      updatedAt
    }
    total
  }
}
`;

const admin_messageFeedback = `mutation Admin_newMessage($content:String!,$chatroom:String){
  newMessage(
    content: $content
    type: DEFAULT
    chatroom:$chatroom
  ) {
    _id
    content
    taskid
    userid
    type
    createdAt
    updatedAt
  }
}
`;

export { admin_chatList, admin_messageFeedback, chat };
