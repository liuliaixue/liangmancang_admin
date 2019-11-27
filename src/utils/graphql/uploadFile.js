const uploadFileToken = `mutation UploadFileToken($filename:String){
  uploadFileToken(filename: $filename) {
    key
    uploadToken
  }
}
`;

const ossUploadToken = `mutation ossUploadToken($filename: String){
  ossUploadToken(filename: $filename){
    region
    bucket
    key
    url
    accessKeyId
    accessKeySecret
    stsToken
  }
}`;
export { uploadFileToken, ossUploadToken };
