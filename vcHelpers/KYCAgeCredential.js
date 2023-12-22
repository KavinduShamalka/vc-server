// // module.exports = {
// //   // VC type: KYCAgeCredential
// //   // https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld
// //   KYCAgeCredential: (credentialSubject) => ({
// //     id: 1,
// //     circuitId: "credentialAtomicQuerySigV2",
// //     query: {
// //       allowedIssuers: ["*"],
// //       context:
// //         "ipfs://QmaBqQ2115WZvg6AG8FeoF9sCVi6PF56ctcVEDQbLDQKKR",
// //       credentialSubject,
// //     },
// //     "type": "AppIdCredential"
// //   }),
// //   // See more off-chain examples
// //   // https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#equals-operator-1
// // };

// module.exports = {
//   // VC type: KYCAgeCredential
//   // https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld
//   KYCAgeCredential: (credentialSubject) => ({
//     circuitId: "credentialAtomicQuerySigV2",
//     id: 1703254388,
//     query: {
//       allowedIssuers: ["*"],
//       context: "ipfs://QmTsZ7rRZRksaEpBhGH9jJWbwGxzJtEQbvHVkBSuabp3RF",
//       credentialSubject,
//       type: "KYCAgeCredential"
//     }
//   }),
//   // See more off-chain examples
//   // https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#equals-operator-1
// };


// // {
// //   "circuitId": "credentialAtomicQuerySigV2",
// //   "id": 1703254388,
// //   "query": {
// //     "allowedIssuers": [
// //       "*"
// //     ],
// //     "context": "ipfs://QmTsZ7rRZRksaEpBhGH9jJWbwGxzJtEQbvHVkBSuabp3RF",
// //     "credentialSubject": {
// //       "appid": {
// //         "$eq": 19980916
// //       }
// //     },
// //     "type": "KYCAgeCredential"
// //   }
// // }

module.exports = {
  // VC type: KYCAgeCredential
  // https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld
  KYCAgeCredential: (credentialSubject) => ({
    id: 1,
    circuitId: "credentialAtomicQuerySigV2",
    query: {
      allowedIssuers: ["*"],
      type: "KYCAgeCredential",
      context:
        "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
      credentialSubject,
    },
  }),
  // See more off-chain examples
  // https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#equals-operator-1
};