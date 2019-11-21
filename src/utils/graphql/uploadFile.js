const uploadFileToken = `mutation UploadFileToken($filename:String){
  uploadFileToken(filename: $filename) {
    key
    uploadToken
  }
}
`;
export { uploadFileToken };
