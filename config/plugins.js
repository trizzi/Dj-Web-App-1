module.exports = {
  upload: {
    config: {
      provider:
        'strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        bucketName: '#bucketName#',
        publicFiles: false,
        uniform: false,
        basePath: '',
      },
    },
  },
  //...
};
